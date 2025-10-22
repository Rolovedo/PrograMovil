import React from 'react';
import { View, Text } from 'react-native';

export default function ThanksCard({ styles }) {
  return (
    <View style={styles.thanksCard}>
      <Text style={styles.thanksText}>
        ¡Gracias por usar nuestros servicios!{'\n'}
        Esperamos verte pronto.
      </Text>
    </View>
  );
}