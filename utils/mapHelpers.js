// utils/mapHelpers.js
export const MapHelpers = {
  // Verificar disponibilidad de react-native-maps
  getMapComponents: () => {
    let MapView, Marker, Polyline, PROVIDER_GOOGLE;
    try {
      const Maps = require('react-native-maps');
      MapView = Maps.default || Maps.MapView;
      Marker = Maps.Marker;
      Polyline = Maps.Polyline;
      PROVIDER_GOOGLE = Maps.PROVIDER_GOOGLE;
      return { MapView, Marker, Polyline, PROVIDER_GOOGLE, available: true };
    } catch (error) {
      console.log('react-native-maps no disponible');
      return { available: false };
    }
  },

  // Filtrar puntos intermedios para waypoints
  getWaypoints: (coordinates, interval = 80) => {
    return coordinates.filter((_, index) => index % interval === 0 && index > 0);
  },

  // Configurar propiedades del mapa
  getMapProps: (mapRegion, onMapPress, onMapReady) => ({
    style: { flex: 1 },
    region: mapRegion,
    onPress: onMapPress,
    showsUserLocation: false,
    showsMyLocationButton: false,
    showsCompass: true,
    showsBuildings: true,
    showsTraffic: false,
    mapType: "standard",
    onMapReady,
  }),

  // Configurar propiedades de Polyline
  getPolylineProps: (coordinates, provider) => ({
    coordinates,
    strokeColor: "#007AFF",
    strokeWidth: 5,
    strokePattern: provider === 'Estimado' ? [10, 5] : undefined,
    lineCap: "round",
    lineJoin: "round",
  }),
};