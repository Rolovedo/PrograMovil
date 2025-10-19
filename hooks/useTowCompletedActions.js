import { useCallback } from 'react';
import { Alert } from 'react-native';

export function useTowCompletedActions(navigation, route) {
  const { formData, serviceType, towType, urgency, price, driverInfo } = route.params;

  const handleRateService = useCallback(() => {
    Alert.alert(
      'Calificar Servicio',
      '¿Cómo calificarías el servicio?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: '😭 Muy malo', onPress: () => console.log('Calificación: 1 estrella') },
        { text: '😪😪 Regulinguis', onPress: () => console.log('Calificación: 2 estrellas') },
        { text: '😒😒😒 Meh', onPress: () => console.log('Calificación: 3 estrellas') },
        { text: '😊😊😊😊 Tabien', onPress: () => console.log('Calificación: 4 estrellas') },
        { text: '⭐⭐⭐⭐⭐ La Cabra', onPress: () => console.log('Calificación: 5 estrellas') },
      ]
    );
  }, []);

  const handleNewService = useCallback(() => {
    navigation.navigate('HomeMain');
  }, [navigation]);

  const handleViewHistory = useCallback(() => {
    navigation.navigate('Actividad');
  }, [navigation]);

  const handleGoHome = useCallback(() => {
    navigation.navigate('HomeMain');
  }, [navigation]);

  return {
    formData,
    serviceType,
    towType,
    urgency,
    price,
    driverInfo,
    handleRateService,
    handleNewService,
    handleViewHistory,
    handleGoHome,
  };
}