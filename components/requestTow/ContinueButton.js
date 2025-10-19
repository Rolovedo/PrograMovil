import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ContinueButton({ onPress, styles }) {
  return (
    <TouchableOpacity
      style={styles.continueButton}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles.continueButtonText}>Continuar</Text>
      <MaterialCommunityIcons name="chevron-right" size={24} color="white" />
    </TouchableOpacity>
  );
}