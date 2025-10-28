export const MapHelpers = {
  //verificar disponibilidad de react-native-maps
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

  //crear region del mapa
  createMapRegion: (latitude, longitude, zoom = 0.015) => ({
    latitude,
    longitude,
    latitudeDelta: zoom,
    longitudeDelta: zoom,
  }),

  //crear region que incluya multiples puntos
  createRegionFromPoints: (points, padding = 0.01) => {
    if (!points || points.length === 0) return null;

    let minLat = points[0].latitude;
    let maxLat = points[0].latitude;
    let minLng = points[0].longitude;
    let maxLng = points[0].longitude;

    points.forEach(point => {
      minLat = Math.min(minLat, point.latitude);
      maxLat = Math.max(maxLat, point.latitude);
      minLng = Math.min(minLng, point.longitude);
      maxLng = Math.max(maxLng, point.longitude);
    });

    return {
      latitude: (minLat + maxLat) / 2,
      longitude: (minLng + maxLng) / 2,
      latitudeDelta: (maxLat - minLat) + padding,
      longitudeDelta: (maxLng - minLng) + padding,
    };
  },

  //filtrar puntos intermedios para waypoints
  getWaypoints: (coordinates, interval = 80) => {
    return coordinates.filter((_, index) => index % interval === 0 && index > 0);
  },

  //configurar propiedades del mapa
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

  //configurar propiedades de polyline
  getPolylineProps: (coordinates, provider) => ({
    coordinates,
    strokeColor: "#007AFF",
    strokeWidth: 5,
    strokePattern: provider === 'Estimado' ? [10, 5] : undefined,
    lineCap: "round",
    lineJoin: "round",
  }),
};