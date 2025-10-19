import { useState, useEffect, useCallback } from 'react';
import { Alert } from 'react-native';

export function useTrackTowActions(navigation, route) {
  const { formData, serviceType, towType, urgency, price } = route.params;
  const [driverStatus, setDriverStatus] = useState('searching'); // searching, found, arriving, arrived, completed
  const [estimatedTime, setEstimatedTime] = useState(15);
  const [driverInfo, setDriverInfo] = useState(null);

  useEffect(() => {
    // Simular búsqueda de conductor
    const timer1 = setTimeout(() => {
      setDriverStatus('found');
      setDriverInfo({
        name: 'Juan Pérez',
        rating: 4.8,
        vehicle: 'Toyota Hilux',
        plate: 'ABC123',
        phone: '+56 9 1234 5678'
      });
    }, 3000);

    // Simular conductor en camino
    const timer2 = setTimeout(() => {
      setDriverStatus('arriving');
    }, 8000);

    // Simular conductor llegando
    const timer3 = setTimeout(() => {
      setDriverStatus('arrived');
    }, 15000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const getStatusInfo = useCallback(() => {
    switch (driverStatus) {
      case 'searching':
        return {
          title: 'Buscando conductor',
          subtitle: 'Estamos buscando el conductor más cercano',
          icon: 'magnify',
          color: '#FF9500',
        };
      case 'found':
        return {
          title: 'Conductor encontrado',
          subtitle: `${driverInfo?.name} está en camino`,
          icon: 'check-circle',
          color: '#34C759',
        };
      case 'arriving':
        return {
          title: 'Conductor en camino',
          subtitle: `Llegará en aproximadamente ${estimatedTime} minutos`,
          icon: 'truck-delivery',
          color: '#007AFF',
        };
      case 'arrived':
        return {
          title: 'Conductor llegó',
          subtitle: 'El conductor está en tu ubicación',
          icon: 'map-marker-check',
          color: '#34C759',
        };
      default:
        return {
          title: 'Buscando conductor',
          subtitle: 'Estamos buscando el conductor más cercano',
          icon: 'magnify',
          color: '#FF9500',
        };
    }
  }, [driverStatus, driverInfo, estimatedTime]);

  const handleCallDriver = useCallback(() => {
    Alert.alert(
      'Llamar al conductor',
      `¿Deseas llamar a ${driverInfo?.name}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Llamar', onPress: () => console.log('Llamando al conductor...') }
      ]
    );
  }, [driverInfo]);

  const handleCancelService = useCallback(() => {
    Alert.alert(
      'Cancelar servicio',
      '¿Estás seguro de que quieres cancelar este servicio?',
      [
        { text: 'No', style: 'cancel' },
        { 
          text: 'Sí', 
          onPress: () => navigation.navigate('HomeMain')
        }
      ]
    );
  }, [navigation]);

  const handleCompleteService = useCallback(() => {
    navigation.navigate('TowCompletedScreen', {
      formData,
      serviceType,
      towType,
      urgency,
      price,
      driverInfo
    });
  }, [navigation, formData, serviceType, towType, urgency, price, driverInfo]);

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return {
    formData,
    serviceType,
    towType,
    urgency,
    price,
    driverStatus,
    estimatedTime,
    driverInfo,
    getStatusInfo,
    handleCallDriver,
    handleCancelService,
    handleCompleteService,
    handleGoBack,
  };
}