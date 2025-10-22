import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

export default function ContinueButton({ onContinue, styles }) {
  return (
    <TouchableOpacity
      style={styles.continueButton}
      onPress={onContinue}
      activeOpacity={0.8}
    >
      <Text style={styles.continueButtonText}>
        Aceptar
      </Text>
    </TouchableOpacity>
  );
}