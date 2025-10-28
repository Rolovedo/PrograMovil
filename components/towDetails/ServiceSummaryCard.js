import React from 'react';
import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ServiceSummaryCard({ formData, styles }) {
  return (
    <View style={styles.summaryCard}>
      <Text style={styles.cardTitle}>Resumen del Servicio</Text>
      
      {/*origen */}
      <View style={styles.summaryRow}>
        <MaterialCommunityIcons name="map-marker" size={20} color="#007AFF" />
        <Text style={styles.summaryLabel}>Origen:</Text>
        <Text style={styles.summaryValue}>{formData.origen}</Text>
      </View>
      
      {/*destino*/}
      <View style={styles.summaryRow}>
        <MaterialCommunityIcons name="flag-checkered" size={20} color="#007AFF" />
        <Text style={styles.summaryLabel}>Destino:</Text>
        <Text style={styles.summaryValue}>{formData.destino}</Text>
      </View>

      {/*telefono del usuario logueado*/}
      <View style={styles.summaryRow}>
        <MaterialCommunityIcons name="phone" size={20} color="#007AFF" />
        <Text style={styles.summaryLabel}>Teléfono:</Text>
        <Text style={styles.summaryValue}>{formData.telefono || 'No disponible'}</Text>
      </View>

      {/*informacion adicional si está disponible*/}
      {formData.distance && (
        <View style={styles.summaryRow}>
          <MaterialCommunityIcons name="map-marker-distance" size={20} color="#007AFF" />
          <Text style={styles.summaryLabel}>Distancia:</Text>
          <Text style={styles.summaryValue}>{formData.distance} km</Text>
        </View>
      )}

      {formData.estimatedDuration && formData.estimatedDuration > 0 && (
        <View style={styles.summaryRow}>
          <MaterialCommunityIcons name="clock-outline" size={20} color="#007AFF" />
          <Text style={styles.summaryLabel}>Tiempo est:</Text>
          <Text style={styles.summaryValue}>{Math.round(formData.estimatedDuration)} min</Text>
        </View>
      )}
    </View>
  );
}