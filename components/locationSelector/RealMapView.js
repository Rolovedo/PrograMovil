// components/locationSelector/RealMapView.js
import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, Text, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

let MapView, Marker, Polyline, PROVIDER_GOOGLE;
try {
  const Maps = require('react-native-maps');
  MapView = Maps.default || Maps.MapView;
  Marker = Maps.Marker;
  Polyline = Maps.Polyline;
  PROVIDER_GOOGLE = Maps.PROVIDER_GOOGLE;
} catch (error) {
  console.log('react-native-maps no disponible');
}

const { width, height } = Dimensions.get('window');

export default function RealMapView({ 
  mapRegion, 
  currentLocation, 
  destinationLocation, 
  onMapPress, 
  loading,
  styles,
  onRouteCalculated
}) {
  const [mapReady, setMapReady] = useState(false);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [calculatingRoute, setCalculatingRoute] = useState(false);
  const [routeInfo, setRouteInfo] = useState(null);

  // ✅ Función principal para calcular ruta (similar a route_handler.js)
  const calculateRoute = async (origin, destination) => {
    setCalculatingRoute(true);
    console.log('🛣️ Iniciando cálculo de ruta:', { origin, destination });

    try {
      // Intentar primero con OpenRouteService
      const openRouteResult = await calculateWithOpenRoute(origin, destination);
      if (openRouteResult.success) {
        processRouteResult(openRouteResult.data);
        return;
      }

      // Fallback: Usar OSRM (OpenStreetMap Routing Machine)
      const osrmResult = await calculateWithOSRM(origin, destination);
      if (osrmResult.success) {
        processRouteResult(osrmResult.data);
        return;
      }

      // Último fallback: Cálculo manual estimado
      calculateEstimatedRoute(origin, destination);

    } catch (error) {
      console.error('❌ Error en cálculo de ruta:', error);
      calculateEstimatedRoute(origin, destination);
    }
  };

  // ✅ OpenRouteService API (2000 llamadas gratuitas/día)
  const calculateWithOpenRoute = async (origin, destination) => {
    try {
      console.log('🔄 Intentando OpenRouteService...');
      
      const API_KEY = '5b3ce3597851110001cf6248a4c7b7bf7a4d4d3b8ae8c0e0a8d7e7b7';
      const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${API_KEY}&start=${origin.longitude},${origin.latitude}&end=${destination.longitude},${destination.latitude}&format=geojson&geometry_format=geojson&instructions=true`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/geo+json'
        }
      });

      if (!response.ok) {
        throw new Error(`OpenRoute HTTP ${response.status}`);
      }

      const data = await response.json();
      
      if (data.features && data.features[0]) {
        const route = data.features[0];
        const coordinates = route.geometry.coordinates.map(coord => ({
          latitude: coord[1],
          longitude: coord[0]
        }));
        
        const distance = route.properties.summary.distance / 1000; // km
        const duration = route.properties.summary.duration / 60; // minutos

        return {
          success: true,
          data: {
            coordinates,
            distance,
            duration,
            provider: 'OpenRouteService'
          }
        };
      }

      return { success: false };
    } catch (error) {
      console.log('⚠️ OpenRouteService falló:', error.message);
      return { success: false };
    }
  };

  // ✅ OSRM Fallback (Completamente gratuito)
  const calculateWithOSRM = async (origin, destination) => {
    try {
      console.log('🔄 Intentando OSRM...');
      
      const url = `https://router.project-osrm.org/route/v1/driving/${origin.longitude},${origin.latitude};${destination.longitude},${destination.latitude}?overview=full&geometries=geojson`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`OSRM HTTP ${response.status}`);
      }

      const data = await response.json();
      
      if (data.routes && data.routes[0]) {
        const route = data.routes[0];
        const coordinates = route.geometry.coordinates.map(coord => ({
          latitude: coord[1],
          longitude: coord[0]
        }));
        
        const distance = route.distance / 1000; // km
        const duration = route.duration / 60; // minutos

        return {
          success: true,
          data: {
            coordinates,
            distance,
            duration,
            provider: 'OSRM'
          }
        };
      }

      return { success: false };
    } catch (error) {
      console.log('⚠️ OSRM falló:', error.message);
      return { success: false };
    }
  };

  // ✅ Procesar resultado de ruta exitosa
  const processRouteResult = (routeData) => {
    console.log(`✅ Ruta calculada con ${routeData.provider}:`, {
      distance: routeData.distance.toFixed(2),
      duration: Math.round(routeData.duration),
      points: routeData.coordinates.length
    });

    setRouteCoordinates(routeData.coordinates);
    setRouteInfo(routeData);
    setCalculatingRoute(false);
    
    // Notificar al componente padre
    if (onRouteCalculated) {
      onRouteCalculated({
        distance: routeData.distance,
        duration: routeData.duration,
        coordinates: routeData.coordinates,
        provider: routeData.provider
      });
    }
  };

  // ✅ Cálculo estimado (similar a price_calculator.js)
  const calculateEstimatedRoute = (origin, destination) => {
    console.log('📏 Usando cálculo estimado...');
    
    const straightCoordinates = [origin, destination];
    setRouteCoordinates(straightCoordinates);
    
    // Fórmula Haversine para distancia
    const R = 6371; // Radio terrestre en km
    const dLat = (destination.latitude - origin.latitude) * Math.PI / 180;
    const dLon = (destination.longitude - origin.longitude) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(origin.latitude * Math.PI / 180) * Math.cos(destination.latitude * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const straightDistance = R * c;
    
    // Factor de corrección para calles reales (basado en tu lógica web)
    const cityFactor = 1.4; // Factor urbano típico
    const distance = straightDistance * cityFactor;
    
    // Estimación de tiempo (velocidad promedio urbana 25 km/h)
    const duration = distance / 25 * 60;
    
    const estimatedData = {
      coordinates: straightCoordinates,
      distance,
      duration,
      provider: 'Estimado'
    };

    setRouteInfo(estimatedData);
    setCalculatingRoute(false);
    
    if (onRouteCalculated) {
      onRouteCalculated(estimatedData);
    }
  };

  // ✅ Efecto para calcular ruta automáticamente
  useEffect(() => {
    if (currentLocation && destinationLocation) {
      calculateRoute(currentLocation, destinationLocation);
    } else {
      setRouteCoordinates([]);
      setRouteInfo(null);
    }
  }, [currentLocation, destinationLocation]);

  // ✅ Función para recentrar mapa en la ruta
  const fitRouteToView = () => {
    if (routeCoordinates.length > 1) {
      // Esta lógica se implementaría con MapView.fitToCoordinates
      console.log('🎯 Ajustando vista a la ruta completa');
    }
  };

  if (loading || !mapRegion || !currentLocation) {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1a1a1a'
      }}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={{ color: 'white', marginTop: 10 }}>Cargando mapa...</Text>
      </View>
    );
  }

  if (MapView) {
    return (
      <View style={{ flex: 1, backgroundColor: '#1a1a1a' }}>
        <MapView
          style={{ flex: 1 }}
          region={mapRegion}
          onPress={onMapPress}
          showsUserLocation={false} // ✅ Desactivado para usar marcador personalizado
          showsMyLocationButton={false}
          showsCompass={true}
          showsBuildings={true}
          showsTraffic={false}
          mapType="standard"
          provider={PROVIDER_GOOGLE}
          onMapReady={() => {
            setMapReady(true);
            console.log('🗺️ Mapa cargado y listo');
          }}
        >
          {/* 🔵 Marcador de origen - SIN fondo, solo icono */}
          {currentLocation && (
            <Marker
              coordinate={currentLocation}
              title="Punto de recogida"
              description="Tu ubicación actual"
              identifier="origin"
              anchor={{ x: 0.5, y: 0.5 }}
            >
              {/* ✅ Solo el icono azul, sin fondo */}
              <MaterialCommunityIcons 
                name="account-circle" 
                size={40} 
                color="#007AFF" 
                style={{
                  textShadowColor: 'rgba(0,0,0,0.5)',
                  textShadowOffset: { width: 1, height: 1 },
                  textShadowRadius: 2,
                }}
              />
            </Marker>
          )}
          
          {/* 🔴 Marcador de destino - SIN fondo, solo icono */}
          {destinationLocation && (
            <Marker
              coordinate={destinationLocation}
              title="Destino del servicio"
              description="Punto de entrega"
              identifier="destination"
              anchor={{ x: 0.5, y: 1 }} // Anclado en la parte inferior del pin
            >
              {/* ✅ Solo el icono rojo de ubicación */}
              <MaterialCommunityIcons 
                name="map-marker" 
                size={45} 
                color="#FF3B30" 
                style={{
                  textShadowColor: 'rgba(0,0,0,0.5)',
                  textShadowOffset: { width: 1, height: 1 },
                  textShadowRadius: 2,
                }}
              />
            </Marker>
          )}

          {/* 🛣️ Polyline de la ruta */}
          {routeCoordinates.length > 0 && (
            <Polyline
              coordinates={routeCoordinates}
              strokeColor="#007AFF"
              strokeWidth={5}
              strokePattern={routeInfo?.provider === 'Estimado' ? [10, 5] : undefined}
              lineCap="round"
              lineJoin="round"
            />
          )}

          {/* 📍 Puntos intermedios (si es ruta real) - Más pequeños y sutiles */}
          {routeCoordinates.length > 2 && routeInfo?.provider !== 'Estimado' && 
            routeCoordinates.filter((_, index) => index % 80 === 0 && index > 0).map((coord, index) => (
              <Marker
                key={`waypoint-${index}`}
                coordinate={coord}
                anchor={{ x: 0.5, y: 0.5 }}
              >
                <View style={{
                  width: 6,
                  height: 6,
                  backgroundColor: '#007AFF',
                  borderRadius: 3,
                  borderWidth: 1,
                  borderColor: 'white',
                  opacity: 0.8,
                }} />
              </Marker>
            ))
          }
        </MapView>

        {/* 💬 Instrucciones de uso */}
        {!destinationLocation && (
          <View style={{
            position: 'absolute', top: 20, left: 20, right: 20,
            backgroundColor: 'rgba(0, 0, 0, 0.9)', padding: 15, borderRadius: 12,
            borderWidth: 1, borderColor: '#333', zIndex: 10,
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialCommunityIcons name="map-marker-plus" size={20} color="#007AFF" />
              <Text style={{
                color: 'white', fontSize: 14, marginLeft: 10, flex: 1, fontWeight: '500'
              }}>
                Toca en el mapa para seleccionar el destino del servicio
              </Text>
            </View>
          </View>
        )}

        {/* 📊 Información de la ruta */}
        {destinationLocation && (
          <View style={{
            position: 'absolute', top: 20, left: 20, right: 20,
            backgroundColor: 'rgba(0, 0, 0, 0.95)', padding: 15, borderRadius: 12,
            borderWidth: 1, borderColor: calculatingRoute ? '#FFA500' : '#34C759', zIndex: 10,
          }}>
            {calculatingRoute ? (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <ActivityIndicator size="small" color="#FFA500" />
                <Text style={{
                  color: '#FFA500', fontSize: 14, marginLeft: 10, fontWeight: '500'
                }}>
                  Calculando mejor ruta...
                </Text>
              </View>
            ) : (
              <View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                  {/* ✅ Icono corregido */}
                  <MaterialCommunityIcons name="map-marker-path" size={18} color="#34C759" />
                  <Text style={{
                    color: '#34C759', fontSize: 14, marginLeft: 8, fontWeight: 'bold'
                  }}>
                    Ruta {routeInfo?.provider} ✅
                  </Text>
                </View>
                
                {routeInfo && (
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flex: 1 }}>
                      <Text style={{ color: '#888', fontSize: 11 }}>Distancia</Text>
                      <Text style={{ color: 'white', fontSize: 13, fontWeight: '600' }}>
                        📏 {routeInfo.distance.toFixed(1)} km
                      </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={{ color: '#888', fontSize: 11 }}>Tiempo est.</Text>
                      <Text style={{ color: 'white', fontSize: 13, fontWeight: '600' }}>
                        ⏱️ {Math.round(routeInfo.duration)} min
                      </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={{ color: '#888', fontSize: 11 }}>Precisión</Text>
                      <Text style={{ color: 'white', fontSize: 13, fontWeight: '600' }}>
                        {routeInfo.provider === 'Estimado' ? '📐 Aprox.' : '🎯 Real'}
                      </Text>
                    </View>
                  </View>
                )}
              </View>
            )}
          </View>
        )}

        {/* 🎯 Controles del mapa */}
        <View style={{
          position: 'absolute', bottom: 120, right: 20,
          flexDirection: 'column',
        }}>
          {/* Botón centrar ubicación */}
          <TouchableOpacity
            style={{
              backgroundColor: 'white', padding: 12, borderRadius: 25, 
              elevation: 5, marginBottom: 10,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
            }}
            onPress={() => console.log('🎯 Centrar en ubicación actual')}
          >
            <MaterialCommunityIcons name="crosshairs-gps" size={24} color="#007AFF" />
          </TouchableOpacity>

          {/* Botón ajustar a ruta */}
          {routeCoordinates.length > 1 && (
            <TouchableOpacity
              style={{
                backgroundColor: 'white', padding: 12, borderRadius: 25, elevation: 5,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
              }}
              onPress={fitRouteToView}
            >
              <MaterialCommunityIcons name="fit-to-page-outline" size={24} color="#007AFF" />
            </TouchableOpacity>
          )}
        </View>

        {/* ⏳ Indicador de carga del mapa */}
        {!mapReady && (
          <View style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(26, 26, 26, 0.8)', justifyContent: 'center', alignItems: 'center',
            zIndex: 1000,
          }}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={{ color: 'white', marginTop: 10 }}>
              Inicializando mapa...
            </Text>
          </View>
        )}
      </View>
    );
  }

  // Fallback: Mapa no disponible
  return (
    <View style={{ flex: 1, backgroundColor: '#1a1a1a', justifyContent: 'center', alignItems: 'center' }}>
      <MaterialCommunityIcons name="google-maps" size={80} color="#007AFF" />
      <Text style={{ color: 'white', fontSize: 18, marginTop: 20, textAlign: 'center' }}>
        Mapa no disponible{'\n'}Configurando dependencias...
      </Text>
    </View>
  );
}