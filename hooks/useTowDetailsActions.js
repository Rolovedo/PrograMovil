import { useState, useCallback } from 'react';
import { Alert } from 'react-native';

export function useTowDetailsActions(navigation, route) {
  const { formData, serviceType } = route.params;
  const [selectedUrgency, setSelectedUrgency] = useState('normal');

  const urgencyOptions = [
    { id: 'normal', name: 'Normal', multiplier: 1, color: '#34C759' },
    { id: 'urgent', name: 'Urgente', multiplier: 1.5, color: '#FF9500' },
    { id: 'emergency', name: 'Emergencia', multiplier: 2, color: '#FF3B30' },
  ];

  const basePrice = parseFloat(formData.estimatedPrice) || 50000;

  const calculatePrice = useCallback(() => {
    const urgencyMultiplier = urgencyOptions.find(u => u.id === selectedUrgency)?.multiplier || 1;
    return Math.round(basePrice * urgencyMultiplier);
  }, [selectedUrgency, basePrice]);

  const handleContinue = useCallback(() => {
    navigation.navigate('ConfirmRequestScreen', {
      formData,
      serviceType,
      urgency: selectedUrgency,
      price: calculatePrice()
    });
  }, [formData, serviceType, selectedUrgency, calculatePrice, navigation]);

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return {
    formData,
    serviceType,
    selectedUrgency,
    setSelectedUrgency,
    urgencyOptions,
    calculatePrice,
    handleContinue,
    handleGoBack,
    basePrice,
  };
}