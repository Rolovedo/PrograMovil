import React from 'react';
import { View, Text } from 'react-native';

export default function PriceCard({ price, styles }) {
  if (!price || price === 0) return null;

  return (
    <View style={styles.priceCard}>
      <Text style={styles.priceLabel}>Precio Estimado</Text>
      <Text style={styles.priceValue}>${price.toLocaleString()}</Text>
      <Text style={styles.priceNote}>
        * Precio incluye IVA. Precio final puede variar según distancia.
      </Text>
    </View>
  );
}