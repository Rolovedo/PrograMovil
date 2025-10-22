import React from 'react';
import { View, Text } from 'react-native';

export default function PriceCard({ price, styles }) {
  return (
    <View style={styles.priceCard}>
      <Text style={styles.priceLabel}>Precio Total</Text>
      <Text style={styles.priceValue}>${price.toLocaleString()}</Text>
      <Text style={styles.priceNote}>* Precio incluye IVA</Text>
    </View>
  );
}