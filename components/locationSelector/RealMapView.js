// components/locationSelector/RealMapView.js
import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Importar utilidades
import { RouteCalculator } from '../../utils/routeCalculator';
import { MapHelpers } from '../../utils/mapHelpers';

// Importar componentes modulares
import OriginMarker from './markers/OriginMarker';
import DestinationMarker from './markers/DestinationMarker';
import RouteInfo from './RouteInfo';
import MapInstructions from './MapInstructions';
import MapControls from './MapControls';

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

  // Obtener componentes de mapa
  const mapComponents = MapHelpers.getMapComponents();
  const { MapView, Marker, Polyline, PROVIDER_GOOGLE, available } = mapComponents;

  // ✅ Función principal para calcular ruta
  const calculateRoute = async (origin, destination) => {
    setCalculatingRoute(true);
    
    try {
      const routeData = await RouteCalculator.calculateRoute(origin, destination);
      processRouteResult(routeData);
    } catch (error) {
      console.error('❌ Error en cálculo de ruta:', error);
      const fallbackData = RouteCalculator.calculateEstimatedRoute(origin, destination);
      processRouteResult(fallbackData);
    }
  };

  // ✅ Procesar resultado de ruta
  const processRouteResult = (routeData) => {
    console.log(`✅ Ruta calculada con ${routeData.provider}:`, {
      distance: routeData.distance.toFixed(2),
      duration: Math.round(routeData.duration),
      points: routeData.coordinates.length
    });

    setRouteCoordinates(routeData.coordinates);
    setRouteInfo(routeData);
    setCalculatingRoute(false);
    
    if (onRouteCalculated) {
      onRouteCalculated({
        distance: routeData.distance,
        duration: routeData.duration,
        coordinates: routeData.coordinates,
        provider: routeData.provider
      });
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

  // ✅ Handlers para controles
  const handleCenterLocation = () => {
    console.log('🎯 Centrar en ubicación actual');
  };

  const handleFitToRoute = () => {
    console.log('🎯 Ajustando vista a la ruta completa');
  };

  const handleMapReady = () => {
    setMapReady(true);
    console.log('🗺️ Mapa cargado y listo');
  };

  // Loading state
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

  // Mapa disponible
  if (available && MapView) {
    const mapProps = MapHelpers.getMapProps(mapRegion, onMapPress, handleMapReady);
    const polylineProps = MapHelpers.getPolylineProps(routeCoordinates, routeInfo?.provider);
    const waypoints = MapHelpers.getWaypoints(routeCoordinates);

    return (
      <View style={{ flex: 1, backgroundColor: '#1a1a1a' }}>
        <MapView {...mapProps} provider={PROVIDER_GOOGLE}>
          {/* Marcadores */}
          <OriginMarker Marker={Marker} coordinate={currentLocation} />
          <DestinationMarker Marker={Marker} coordinate={destinationLocation} />

          {/* Polyline de ruta */}
          {routeCoordinates.length > 0 && (
            <Polyline {...polylineProps} />
          )}

          {/* Puntos intermedios */}
          {waypoints.map((coord, index) => (
            <Marker
              key={`waypoint-${index}`}
              coordinate={coord}
              anchor={{ x: 0.5, y: 0.5 }}
            >
              <View style={{
                width: 6, height: 6, backgroundColor: '#007AFF',
                borderRadius: 3, borderWidth: 1, borderColor: 'white', opacity: 0.8,
              }} />
            </Marker>
          ))}
        </MapView>

        {/* Componentes de UI */}
        <MapInstructions destinationLocation={destinationLocation} />
        <RouteInfo 
          destinationLocation={destinationLocation}
          calculatingRoute={calculatingRoute}
          routeInfo={routeInfo} 
        />
        <MapControls 
          routeCoordinates={routeCoordinates}
          onCenterLocation={handleCenterLocation}
          onFitToRoute={handleFitToRoute}
        />

        {/* Indicador de carga */}
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