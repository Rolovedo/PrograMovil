import React from 'react';
import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function LoginHeader({ styles }) {
  return (
    <View style={styles.header}>
      <MaterialCommunityIcons name="car-tow" size={60} color="#FF6B35" />
      <Text style={styles.title}>Bienvenido</Text>
      <Text style={styles.subtitle}>Inicia sesión en tu cuenta</Text>
    </View>
  );
}