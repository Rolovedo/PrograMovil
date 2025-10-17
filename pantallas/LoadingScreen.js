import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function LoadingScreen() {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="car-tow" size={80} color="#FF6B35" />
      <Text style={styles.title}>Cargando...</Text>
      <ActivityIndicator size="large" color="#FF6B35" style={styles.loader} />
      <Text style={styles.subtitle}>Verificando tu sesión</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 20,
    marginBottom: 20,
  },
  loader: {
    marginVertical: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#CCCCCC',
    textAlign: 'center',
  },
});
