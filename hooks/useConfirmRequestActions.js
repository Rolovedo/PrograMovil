import { useState, useCallback } from 'react';
import { Alert } from 'react-native';

export function useConfirmRequestActions(navigation, createRequest) {
  const [isCreating, setIsCreating] = useState(false);

  const getUrgencyName = useCallback((urgency) => {
    const urgencies = {
      'normal': 'Normal',
      'urgent': 'Urgente',
      'emergency': 'Emergencia'
    };
    return urgencies[urgency] || urgency;
  }, []);

  const handleConfirmar = useCallback(async (formData, serviceType, urgency, price) => {
    setIsCreating(true);
    
    try {
      // Crear la solicitud en Supabase
      const requestResult = await createRequest(formData, serviceType, urgency, price);
      
      // Navegar a TrackTowScreen con el ID de la solicitud
      navigation.navigate('TrackTowScreen', {
        formData,
        serviceType,
        urgency,
        price,
        requestId: requestResult.id
      });
    } catch (err) {
      Alert.alert(
        'Error',
        'No se pudo crear la solicitud. Por favor, inténtalo de nuevo.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsCreating(false);
    }
  }, [navigation, createRequest]);

  const handleCancelar = useCallback(() => {
    Alert.alert(
      'Cancelar Servicio',
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

  const handleEditar = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return {
    isCreating,
    getUrgencyName,
    handleConfirmar,
    handleCancelar,
    handleEditar,
    handleGoBack,
  };
}