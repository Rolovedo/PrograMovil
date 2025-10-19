import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function LoginButton({ onLogin, isLoading, styles }) {
  return (
    <TouchableOpacity 
      style={[styles.loginButton, isLoading && styles.disabledButton]}
      onPress={onLogin}
      disabled={isLoading}
    >
      <MaterialCommunityIcons 
        name={isLoading ? "loading" : "login"} 
        size={20} 
        color="white" 
      />
      <Text style={styles.loginButtonText}>
        {isLoading ? 'Iniciando...' : 'Iniciar Sesión'}
      </Text>
    </TouchableOpacity>
  );
}