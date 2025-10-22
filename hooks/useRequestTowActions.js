import { useState, useCallback } from 'react';
import { Alert } from 'react-native';

export function useRequestTowActions(navigation, route) {
  const { serviceType = 'Servicio de Grúa' } = route.params || {};

  const [formData, setFormData] = useState({
    origen: '',
    destino: '',
    telefono: '',
    tipoVehiculo: '',
    observaciones: '',
  });

  const handleInputChange = useCallback((field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  const handleContinue = useCallback(() => {
    if (!formData.origen || !formData.destino || !formData.telefono) {
      Alert.alert('Error', 'Por favor completa todos los campos obligatorios');
      return;
    }

    navigation.navigate('TowDetailsScreen', {
      formData,
      serviceType,
    });
  }, [formData, navigation, serviceType]);

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return {
    serviceType,
    formData,
    handleInputChange,
    handleContinue,
    handleGoBack,
  };
}