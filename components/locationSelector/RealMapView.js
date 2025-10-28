import React, { useState, useEffect, useRef } from 'react';
import { View } from 'react-native';

//importar utilidades
import { RouteCalculator } from '../../utils/routeCalculator';
import { MapHelpers } from '../../utils/mapHelpers';
import { LocationUtils } from '../../utils/locationUtils';

//importar componentes modulares
import OriginMarker from './markers/OriginMarker';
import DestinationMarker from './markers/DestinationMarker';
import RouteInfo from './RouteInfo';
import MapInstructions from './MapInstructions';
import MapControls from './MapControls';
import MapLoadingState from '../loading/MapLoadingState';

export default function RealMapView({ 
  mapRegion, 
  currentLocation, 
  destinationLocation, 
  onMapPress, 
  loading,
  onRouteCalculated
}) {
  const [mapReady, setMapReady] = useState(false);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [calculatingRoute, setCalculatingRoute] = useState(false);
  const [routeInfo, setRouteInfo] = useState(null);

  //referencia al mapview para controlar la camara
  const mapRef = useRef(null);

  //componentes de mapa
  const mapComponents = MapHelpers.getMapComponents();
  const { MapView, Marker, Polyline, PROVIDER_GOOGLE, available } = mapComponents;

  //funcion principal para calcular ruta
  const calculateRoute = async (origin, destination) => {
    setCalculatingRoute(true);
    
    try {
      const routeData = await RouteCalculator.calculateRoute(origin, destination);
      processRouteResult(routeData);
    } catch (error) {
      console.error('Error en cálculo de ruta:', error);
      const fallbackData = RouteCalculator.calculateEstimatedRoute(origin, destination);
      processRouteResult(fallbackData);
    }
  };

  //procesar resultado de ruta
  const processRouteResult = (routeData) => {
    console.log(`Ruta calculada con ${routeData.provider}:`, {
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

  //efecto para calcular ruta automaticamente
  useEffect(() => {
    if (currentLocation && destinationLocation) {
      calculateRoute(currentLocation, destinationLocation);
    } else {
      setRouteCoordinates([]);
      setRouteInfo(null);
    }
  }, [currentLocation, destinationLocation]);

  //funcion para centrar en ubicacion actual
  const handleCenterLocation = () => {
    if (!currentLocation || !mapRef.current) {
      console.log('No hay ubicacion actual o referencia al mapa');
      return;
    }

    console.log('Centrando en ubicación actual:', currentLocation);

    //usar LocationUtils para crear region
    const region = LocationUtils.createMapRegion(
      currentLocation.latitude, 
      currentLocation.longitude, 
      0.01
    );

    //animar hacia la ubicación actual
    mapRef.current.animateToRegion(region, 1000); //duracion 1000ms
  };

  //funcion para ajustar vista a toda la ruta
  const handleFitToRoute = () => {
    if (!mapRef.current || routeCoordinates.length < 2) {
      console.log('No hay ruta para ajustar vista');
      return;
    }

    console.log('Ajustando vista a la ruta completa');

    //usar fitToCoordinates para mostrar toda la ruta
    mapRef.current.fitToCoordinates(routeCoordinates, {
      edgePadding: {
        top: 100,
        right: 50,
        bottom: 200,
        left: 50,
      },
      animated: true,
    });
  };

  const handleMapReady = () => {
    setMapReady(true);
    console.log('Mapa cargado y listo');
  };

  //carga previa al mapa
  if (loading || !mapRegion || !currentLocation) {
    return (
      <MapLoadingState 
        message="Obteniendo ubicación..."
        iconName="crosshairs-gps"
        iconSize={50}
      />
    );
  }

  //mapa disponible
  if (available && MapView) {
    const mapProps = MapHelpers.getMapProps(mapRegion, onMapPress, handleMapReady);
    const polylineProps = MapHelpers.getPolylineProps(routeCoordinates, routeInfo?.provider);
    const waypoints = MapHelpers.getWaypoints(routeCoordinates);

    return (
      <View style={{ flex: 1, backgroundColor: '#1a1a1a' }}>
        <MapView 
          {...mapProps} 
          provider={PROVIDER_GOOGLE}
          ref={mapRef}
        >
          {/*marcadores nativos con keys estaticas */}
          {currentLocation && (
            <OriginMarker 
              key="origin-marker-static"
              Marker={Marker} 
              coordinate={currentLocation} 
            />
          )}
          
          {destinationLocation && (
            <DestinationMarker 
              key="destination-marker-static"
              Marker={Marker} 
              coordinate={destinationLocation} 
            />
          )}

          {/*polyline de ruta */}
          {routeCoordinates.length > 0 && (
            <Polyline {...polylineProps} />
          )}

          {/*puntos intermedios mas estables */}
          {waypoints.map((coord, index) => (
            <Marker
              key={`waypoint-${coord.latitude.toFixed(6)}-${coord.longitude.toFixed(6)}`}
              coordinate={coord}
              anchor={{ x: 0.5, y: 0.5 }}
              flat={true}
              tracksViewChanges={false}
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
          ))}
        </MapView>

        {/*componentes de UI */}
        <MapInstructions destinationLocation={destinationLocation} />
        <RouteInfo 
          destinationLocation={destinationLocation}
          calculatingRoute={calculatingRoute}
          routeInfo={routeInfo} 
        />
        <MapControls 
          currentLocation={currentLocation}
          routeCoordinates={routeCoordinates}
          onCenterLocation={handleCenterLocation}
          onFitToRoute={handleFitToRoute}
          disabled={!mapReady}
        />

        {/*inicialización del mapa */}
        {!mapReady && (
          <View style={{
            position: 'absolute', 
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(26, 26, 26, 0.8)', 
            zIndex: 1000,
          }}>
            <MapLoadingState 
              message="Inicializando mapa..."
              iconName="map-search"
              backgroundColor="transparent"
            />
          </View>
        )}
      </View>
    );
  }

  //mapa no disponible
  return (
    <MapLoadingState 
      message="Mapa no disponible&#10;Configurando dependencias..."
      iconName="google-maps"
      iconSize={80}
      showIcon={true}
    />
  );
}