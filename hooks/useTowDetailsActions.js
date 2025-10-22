import { useState, useCallback } from 'react';
import { Alert } from 'react-native';

export function useTowDetailsActions(navigation, route) {
  const { formData, serviceType } = route.params;
  const [selectedTowType, setSelectedTowType] = useState(null);
  const [selectedUrgency, setSelectedUrgency] = useState('normal');

  const towTypes = [
    { id: 'convencional', name: 'Convencional', price: 54950, icon: 'truck' },
    { id: 'xl', name: 'XL', price: 75000, icon: 'truck-trailer' },
    { id: 'moto', name: 'Moto', price: 35000, icon: 'motorbike' },
    { id: 'taller', name: 'Taller', price: 65000, icon: 'wrench' },
  ];

  const urgencyOptions = [
    { id: 'normal', name: 'Normal', multiplier: 1, color: '#34C759' },
    { id: 'urgent', name: 'Urgente', multiplier: 1.5, color: '#FF9500' },
    { id: 'emergency', name: 'Emergencia', multiplier: 2, color: '#FF3B30' },
  ];

  const calculatePrice = useCallback(() => {
    if (!selectedTowType) return 0;
    const basePrice = towTypes.find(t => t.id === selectedTowType)?.price || 0;
    const urgencyMultiplier = urgencyOptions.find(u => u.id === selectedUrgency)?.multiplier || 1;
    return Math.round(basePrice * urgencyMultiplier);
  }, [selectedTowType, selectedUrgency]);

  const handleContinue = useCallback(() => {
    if (!selectedTowType) {
      Alert.alert('Error', 'Por favor selecciona un tipo de grúa');
      return;
    }

    navigation.navigate('ConfirmRequestScreen', {
      formData,
      serviceType,
      towType: selectedTowType,
      urgency: selectedUrgency,
      price: calculatePrice()
    });
  }, [selectedTowType, formData, serviceType, selectedUrgency, calculatePrice, navigation]);

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return {
    formData,
    serviceType,
    selectedTowType,
    setSelectedTowType,
    selectedUrgency,
    setSelectedUrgency,
    towTypes,
    urgencyOptions,
    calculatePrice,
    handleContinue,
    handleGoBack,
  };
}