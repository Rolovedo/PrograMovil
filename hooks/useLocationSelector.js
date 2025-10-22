// hooks/useLocationSelector.js
import { useState, useEffect, useCallback } from 'react';
import { Alert } from 'react-native';
import * as Location from 'expo-location';

export function useLocationSelector(navigation, route) {
  const { serviceType } = route?.params || {};
  
  const [currentLocation, setCurrentLocation] = useState(null);
  const [destinationLocation, setDestinationLocation] = useState(null);
  const [currentAddress, setCurrentAddress] = useState('Obteniendo ubicación...');
  const [destinationAddress, setDestinationAddress] = useState('');
  const [distance, setDistance] = useState(0);
  const [estimatedPrice, setEstimatedPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [mapRegion, setMapRegion] = useState(null);
  
  // ✅ Nuevos estados para ruta
  const [routeInfo, setRouteInfo] = useState(null);
  const [realDistance, setRealDistance] = useState(0);
  const [estimatedDuration, setEstimatedDuration] = useState(0);

  // Configuración de precios
  const priceConfig = {
    basePrice: 50000,
    pricePerKm: 2000,
  };

  // ✅ Solicitar permisos con expo-location
  const requestLocationPermission = useCallback(async () => {
    try {
      console.log('🔐 Solicitando permisos de ubicación...');
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      console.log('📋 Estado de permisos:', status);
      
      if (status !== 'granted') {
        Alert.alert('Error', 'Se requieren permisos de ubicación para usar esta función');
        return false;
      }
      return true;
    } catch (error) {
      console.error('❌ Error solicitando permisos:', error);
      return false;
    }
  }, []);

  // ✅ Geocodificación con expo-location
  const getAddressFromLocation = useCallback(async (latitude, longitude) => {
    try {
      console.log('🌍 Obteniendo dirección para:', { latitude, longitude });
      
      const result = await Location.reverseGeocodeAsync({ latitude, longitude });
      
      if (result && result.length > 0) {
        const address = result[0];
        let formattedAddress = '';
        
        if (address.name) formattedAddress += address.name;
        if (address.street) formattedAddress += `, ${address.street}`;
        if (address.city) formattedAddress += `, ${address.city}`;
        if (address.region) formattedAddress += `, ${address.region}`;
        
        console.log('📍 Dirección obtenida:', formattedAddress);
        return formattedAddress || `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
      }
      return `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
    } catch (error) {
      console.error('❌ Error geocodificación:', error);
      return `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
    }
  }, []);

  // ✅ Obtener ubicación con expo-location
  const getCurrentLocation = useCallback(async () => {
    try {
      console.log('📍 Iniciando obtención de ubicación...');
      
      const hasPermission = await requestLocationPermission();
      if (!hasPermission) {
        setLoading(false);
        return;
      }

      console.log('🔄 Obteniendo ubicación actual...');
      
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
        timeout: 20000,
      });

      const { latitude, longitude } = location.coords;
      console.log('✅ Ubicación obtenida:', { latitude, longitude });
      
      const currentLoc = { latitude, longitude };
      setCurrentLocation(currentLoc);
      
      // ✅ Configurar región del mapa con mejor zoom
      const region = {
        latitude,
        longitude,
        latitudeDelta: 0.015, // Zoom más amplio para ver más área
        longitudeDelta: 0.015,
      };
      setMapRegion(region);
      console.log('🗺️ Región del mapa configurada:', region);
      
      // Obtener dirección legible
      const address = await getAddressFromLocation(latitude, longitude);
      setCurrentAddress(address);
      
      setLoading(false);
      console.log('🎉 Configuración de ubicación completada');
      
    } catch (error) {
      console.error('❌ Error obteniendo ubicación:', error);
      Alert.alert('Error', 'No se pudo obtener tu ubicación actual. Verifica que el GPS esté habilitado.');
      setLoading(false);
    }
  }, [requestLocationPermission, getAddressFromLocation]);

  // Calcular distancia usando fórmula Haversine
  const calculateDistance = useCallback((lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radio de la Tierra en km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }, []);

  // Calcular precio basado en distancia
  const calculatePrice = useCallback((distanceKm) => {
    const basePrice = priceConfig.basePrice;
    const distancePrice = distanceKm * priceConfig.pricePerKm;
    return Math.round(basePrice + distancePrice);
  }, []);

  // Formatear precio
  const formatPrice = useCallback((price) => {
    if (!price) return '$0';
    return `$${Math.round(price).toLocaleString('es-CO')}`;
  }, []);

  // ✅ Nueva función para manejar datos de ruta calculada
  const handleRouteCalculated = useCallback((routeData) => {
    console.log('🛣️ Datos de ruta recibidos:', routeData);
    
    setRouteInfo(routeData);
    setRealDistance(routeData.distance);
    setEstimatedDuration(routeData.duration);
    
    // Recalcular precio con distancia real
    const realPrice = calculatePrice(routeData.distance);
    setEstimatedPrice(realPrice);
    
    console.log('💰 Precio actualizado con ruta real:', {
      distanceReal: routeData.distance,
      durationMinutes: routeData.duration,
      newPrice: realPrice
    });
  }, [calculatePrice]);

  // Manejar selección de destino en el mapa
  const handleMapPress = useCallback(async (event) => {
    if (!currentLocation) {
      Alert.alert('Error', 'Esperando ubicación actual...');
      return;
    }
    
    const { latitude, longitude } = event.nativeEvent.coordinate;
    const destination = { latitude, longitude };
    
    console.log('🎯 Destino seleccionado:', destination);
    setDestinationLocation(destination);
    
    // Obtener dirección del destino
    const address = await getAddressFromLocation(latitude, longitude);
    setDestinationAddress(address);
    
    // Calcular distancia en línea recta (se actualizará con la ruta real)
    const dist = calculateDistance(
      currentLocation.latitude,
      currentLocation.longitude,
      latitude,
      longitude
    );
    setDistance(dist);
    
    // Precio inicial (se actualizará con la ruta real)
    const price = calculatePrice(dist);
    setEstimatedPrice(price);
    
    console.log('📊 Cálculos iniciales (línea recta):', { distance: dist, price });
    // La ruta real se calculará automáticamente y actualizará estos valores
  }, [currentLocation, getAddressFromLocation, calculateDistance, calculatePrice]);

  // Continuar a TowDetailsScreen
  const handleContinue = useCallback(() => {
    if (!currentLocation || !destinationLocation) {
      Alert.alert('Error', 'Por favor selecciona un destino en el mapa');
      return;
    }

    navigation.navigate('TowDetailsScreen', {
      formData: {
        origen: currentAddress,
        destino: destinationAddress,
        telefono: '',
        tipoVehiculo: '',
        observaciones: '',
        currentLocation,
        destinationLocation,
        distance: realDistance > 0 ? realDistance.toFixed(2) : distance.toFixed(2), // Usar distancia real si está disponible
        estimatedPrice,
        // ✅ Datos adicionales de ruta
        routeInfo: routeInfo,
        estimatedDuration: estimatedDuration,
        realDistance: realDistance,
      },
      serviceType: serviceType || 'Servicio de Grúa',
    });
  }, [navigation, currentLocation, destinationLocation, currentAddress, destinationAddress, distance, realDistance, estimatedPrice, serviceType, routeInfo, estimatedDuration]);

  // Volver atrás
  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  // Obtener ubicación al montar componente
  useEffect(() => {
    getCurrentLocation();
  }, [getCurrentLocation]);

  // Preparar datos para LocationInfoCard con información de ruta
  const locationData = {
    origen: currentAddress,
    destino: destinationAddress || 'Selecciona destino en el mapa',
    estimatedPrice,
    distance: realDistance > 0 ? realDistance.toFixed(2) : distance.toFixed(2),
    duration: estimatedDuration > 0 ? `${Math.round(estimatedDuration)} min` : 'Calculando...',
  };

  return {
    serviceType: serviceType || 'Servicio de Grúa',
    locationData,
    currentLocation,
    destinationLocation,
    mapRegion,
    loading,
    handleMapPress,
    handleGoBack,
    handleContinue,
    handleRouteCalculated, // ✅ Nueva función
    formatPrice,
    canContinue: !!(currentLocation && destinationLocation),
    routeInfo, // ✅ Datos de ruta
    realDistance,
    estimatedDuration,
  };
}