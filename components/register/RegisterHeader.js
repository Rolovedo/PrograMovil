import React from 'react';
import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function RegisterHeader({ styles }) {
  return (
    <View style={styles.header}>
      <MaterialCommunityIcons name="account-plus" size={60} color="#FF6B35" />
      <Text style={styles.title}>Crear Cuenta</Text>
      <Text style={styles.subtitle}>Regístrate para comenzar</Text>
    </View>
  );
}