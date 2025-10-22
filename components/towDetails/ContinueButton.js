import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ContinueButton({ onPress, disabled, styles }) {
  return (
    <TouchableOpacity 
      style={[
        styles.continueButton,
        disabled && styles.disabledButton
      ]}
      onPress={onPress}
      activeOpacity={disabled ? 1 : 0.8}
      disabled={disabled}
    >
      <Text style={styles.continueButtonText}>Continuar</Text>
      <MaterialCommunityIcons name="chevron-right" size={24} color="white" />
    </TouchableOpacity>
  );
}