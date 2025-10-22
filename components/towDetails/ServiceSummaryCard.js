import React from 'react';
import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ServiceSummaryCard({ formData, styles }) {
  return (
    <View style={styles.summaryCard}>
      <Text style={styles.cardTitle}>Resumen del Servicio</Text>
      <View style={styles.summaryRow}>
        <MaterialCommunityIcons name="map-marker" size={20} color="#007AFF" />
        <Text style={styles.summaryLabel}>Origen:</Text>
        <Text style={styles.summaryValue}>{formData.origen}</Text>
      </View>
      <View style={styles.summaryRow}>
        <MaterialCommunityIcons name="flag" size={20} color="#007AFF" />
        <Text style={styles.summaryLabel}>Destino:</Text>
        <Text style={styles.summaryValue}>{formData.destino}</Text>
      </View>
      <View style={styles.summaryRow}>
        <MaterialCommunityIcons name="phone" size={20} color="#007AFF" />
        <Text style={styles.summaryLabel}>Teléfono:</Text>
        <Text style={styles.summaryValue}>{formData.telefono}</Text>
      </View>
    </View>
  );
}