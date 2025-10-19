import React from 'react';
import { View, Text } from 'react-native';

export default function TermsCard({ styles }) {
  return (
    <View style={styles.termsCard}>
      <Text style={styles.termsTitle}>Términos y Condiciones</Text>
      <Text style={styles.termsText}>
        • El precio puede variar según la distancia real del servicio{'\n'}
        • El tiempo de llegada estimado es de 15-30 minutos{'\n'}
        • Se requiere pago en efectivo o tarjeta al conductor{'\n'}
        • El servicio incluye seguro básico de transporte
      </Text>
    </View>
  );
}