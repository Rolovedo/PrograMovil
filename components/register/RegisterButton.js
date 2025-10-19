import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function RegisterButton({ onRegister, isLoading, styles }) {
  return (
    <TouchableOpacity 
      style={[styles.registerButton, isLoading && styles.disabledButton]}
      onPress={onRegister}
      disabled={isLoading}
    >
      <MaterialCommunityIcons 
        name={isLoading ? "loading" : "account-plus"} 
        size={20} 
        color="white" 
      />
      <Text style={styles.registerButtonText}>
        {isLoading ? 'Creando...' : 'Crear Cuenta'}
      </Text>
    </TouchableOpacity>
  );
}