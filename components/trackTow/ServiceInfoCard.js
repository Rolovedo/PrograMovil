import React from 'react';
import { View, Text } from 'react-native';

export default function ServiceInfoCard({ formData, price, towType, styles }) {
  return (
    <View style={styles.serviceInfoCard}>
      <Text style={styles.serviceInfoTitle}>Detalles del Servicio</Text>
      <View style={styles.serviceDetails}>
        <Text style={styles.serviceDetailText}>Origen: {formData.origen}</Text>
        <Text style={styles.serviceDetailText}>Destino: {formData.destino}</Text>
        <Text style={styles.serviceDetailText}>Precio: ${price.toLocaleString()}</Text>
        <Text style={styles.serviceDetailText}>Tipo: {towType}</Text>
      </View>
    </View>
  );
}