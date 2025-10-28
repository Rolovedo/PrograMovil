import React from 'react';
import { View, Text } from 'react-native';

export default function LocationInfoCard({ locationData, formatPrice, styles }) {
  //evita el undefined
  if (!locationData) {
    return null; //no renderizar nada si no hay datos
  }

  return (
    <View style={styles.infoCard}>
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>📍 Origen:</Text>
        <Text style={styles.infoValue}>{locationData.origen || 'Cargando...'}</Text>
      </View>
      
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>🚩 Destino:</Text>
        <Text style={styles.infoValue}>{locationData.destino || 'Cargando...'}</Text>
      </View>
      
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>💰 Precio estimado:</Text>
        <Text style={styles.priceValue}>
          {formatPrice && locationData.estimatedPrice ? 
            formatPrice(locationData.estimatedPrice) : 
            'Calculando...'
          }
        </Text>
      </View>
    </View>
  );
}