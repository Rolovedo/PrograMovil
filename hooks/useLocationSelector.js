import { useState, useEffect, useCallback } from 'react';
import { Alert } from 'react-native';
import { useAppContext } from '../context/AppContext';

//utils
import { LocationUtils } from '../utils/locationUtils';
import { PriceUtils } from '../utils/priceUtils';
import { DistanceUtils } from '../utils/distanceUtils';
import { MapHelpers } from '../utils/mapHelpers';

export function useLocationSelector(navigation, route) {
  const { serviceType } = route?.params || {};
  
  //obtiene datos del usuario desde AppContext
  const { user } = useAppContext();
  
  const [currentLocation, setCurrentLocation] = useState(null);
  const [destinationLocation, setDestinationLocation] = useState(null);
  const [currentAddress, setCurrentAddress] = useState('Obteniendo ubicación...');
  const [destinationAddress, setDestinationAddress] = useState('');
  const [distance, setDistance] = useState(0);
  const [estimatedPrice, setEstimatedPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [mapRegion, setMapRegion] = useState(null);
  
  //nuevos estados para ruta
  const [routeInfo, setRouteInfo] = useState(null);
  const [realDistance, setRealDistance] = useState(0);
  const [estimatedDuration, setEstimatedDuration] = useState(0);

  //obtener ubicacion usando LocationUtils
  const getCurrentLocation = useCallback(async () => {
    try {
      console.log('Iniciando obtención de ubicación...');
      
      const hasPermission = await LocationUtils.requestLocationPermission();
      if (!hasPermission) {
        setLoading(false);
        return;
      }

      const currentLoc = await LocationUtils.getCurrentPosition();
      setCurrentLocation(currentLoc);
      
      //obtener direccion usando LocationUtils
      const address = await LocationUtils.getAddressFromLocation(
        currentLoc.latitude, 
        currentLoc.longitude
      );
      setCurrentAddress(address);
      
      //crear region usando LocationUtils
      const region = LocationUtils.createMapRegion(
        currentLoc.latitude, 
        currentLoc.longitude, 
        0.015
      );
      setMapRegion(region);

      setLoading(false);
      
    } catch (error) {
      console.error('Error obteniendo ubicación:', error);
      Alert.alert('Error', 'No se pudo obtener tu ubicación actual. Verifica que el GPS esté habilitado.');
      setLoading(false);
    }
  }, []);

  //manejar datos de ruta calculada usando PriceUtils
  const handleRouteCalculated = useCallback((routeData) => {
    console.log('🛣️ Datos de ruta recibidos:', routeData);
    
    setRouteInfo(routeData);
    setRealDistance(routeData.distance);
    setEstimatedDuration(routeData.duration);
    
    //recalcular precio con distancia real usando PriceUtils
    const realPrice = PriceUtils.calculatePrice(routeData.distance);
    setEstimatedPrice(realPrice);
  }, []);

  //manejar selección de destino usando todos los utils
  const handleMapPress = useCallback(async (event) => {
    if (!currentLocation) {
      Alert.alert('Error', 'Esperando ubicación actual...');
      return;
    }
    
    const { latitude, longitude } = event.nativeEvent.coordinate;
    const destination = { latitude, longitude };
    
    console.log('Destino seleccionado:', destination);
    setDestinationLocation(destination);

    //obtener direccion usando LocationUtils
    const address = await LocationUtils.getAddressFromLocation(latitude, longitude);
    setDestinationAddress(address);

    //calcular distancia usando DistanceUtils
    const dist = DistanceUtils.calculateDistanceBetweenPoints(currentLocation, destination);
    setDistance(dist);

    //calcular precio usando PriceUtils
    const price = PriceUtils.calculatePrice(dist);
    setEstimatedPrice(price);
    
    console.log('Cálculos iniciales (línea recta):', { 
      distance: DistanceUtils.formatDistance(dist), 
      price: PriceUtils.formatPrice(price) 
    });
  }, [currentLocation]);

  //continuar a TowDetailsScreen con teléfono desde AppContext
  const handleContinue = useCallback(() => {
    if (!currentLocation || !destinationLocation) {
      Alert.alert('Error', 'Por favor selecciona un destino en el mapa');
      return;
    }

    const userPhone = user?.phone || '';
    
    if (!userPhone) {
      Alert.alert('Error', 'No se encontró número de teléfono. Verifica tu perfil.');
      return;
    }
    console.log('Telefono obtenido:', userPhone);

    navigation.navigate('TowDetailsScreen', {
      formData: {
        origen: currentAddress,
        destino: destinationAddress,
        telefono: userPhone,
        currentLocation,
        destinationLocation,
        distance: realDistance > 0 ? realDistance.toFixed(2) : distance.toFixed(2),
        estimatedPrice,
        //datos adicionales de ruta
        routeInfo: routeInfo,
        estimatedDuration: estimatedDuration,
        realDistance: realDistance,
        //datos del usuario desde AppContext
        userId: user?.id,
        userEmail: user?.email,
        userName: user?.name || user?.fullName,
      },
      serviceType: serviceType || 'Servicio de Grúa',
    });
  }, [navigation, currentLocation, destinationLocation, currentAddress, destinationAddress, distance, realDistance, estimatedPrice, serviceType, routeInfo, estimatedDuration, user]);

  //regresar
  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  //obtener ubicacion al montar componente
  useEffect(() => {
    getCurrentLocation();  //funcion o accion
  }, [getCurrentLocation]); //valor inicial

  //preparar datos para LocationInfoCard con informacion de ruta
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
    handleRouteCalculated,
    formatPrice: PriceUtils.formatPrice, //usar util
    canContinue: !!(currentLocation && destinationLocation),
    routeInfo,
    realDistance,
    estimatedDuration,
    //simplificar datos del usuario
    user,
    userPhone: user?.phone || '',
  };
}