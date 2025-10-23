import React from 'react';
import { View, Text, Image } from 'react-native';

export default function LoginHeader({ styles }) {
  return (
    <View style={styles.header}>
      <Image source={require('../../assets/logo2.png')} style={styles.logo} resizeMode="contain" />
      <Text style={styles.title}>Bienvenido</Text>
      <Text style={styles.subtitle}>Inicia sesión en tu cuenta</Text>
    </View>
  );
}