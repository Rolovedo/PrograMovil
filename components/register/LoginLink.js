import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function LoginLink({ onLogin, styles }) {
  return (
    <View style={styles.loginContainer}>
      <Text style={styles.loginText}>¿Ya tienes cuenta? </Text>
      <TouchableOpacity onPress={onLogin}>
        <Text style={styles.loginLink}>Inicia sesión aquí</Text>
      </TouchableOpacity>
    </View>
  );
}