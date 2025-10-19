import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function RegisterLink({ onRegister, styles }) {
  return (
    <View style={styles.registerContainer}>
      <Text style={styles.registerText}>¿No tienes cuenta? </Text>
      <TouchableOpacity onPress={onRegister}>
        <Text style={styles.registerLink}>Regístrate aquí</Text>
      </TouchableOpacity>
    </View>
  );
}