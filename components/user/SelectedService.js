import React from 'react';
import { View, Text } from 'react-native';
import { useAppContext } from '../../context/AppContext';

export default function SelectedService({ styles }) {
  const { selectedService } = useAppContext();

  if (!selectedService) return null;

  return (
    <View style={styles.promoSection}>
      <Text style={styles.promoTitle}>Último servicio seleccionado:</Text>
      <Text style={styles.promoSubtitle}>{selectedService.name}</Text>
    </View>
  );
}