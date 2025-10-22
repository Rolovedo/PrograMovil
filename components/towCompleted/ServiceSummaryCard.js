import React from 'react';
import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ServiceSummaryCard({ formData, towType, price, styles }) {
  return (
    <View style={styles.summaryCard}>
      <Text style={styles.cardTitle}>Resumen del Servicio</Text>
      
      <View style={styles.summaryInfo}>
        <View style={styles.infoRow}>
          <MaterialCommunityIcons name="truck" size={20} color="#007AFF" />
          <Text style={styles.infoLabel}>Tipo:</Text>
          <Text style={styles.infoValue}>{towType}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <MaterialCommunityIcons name="map-marker" size={20} color="#007AFF" />
          <Text style={styles.infoLabel}>Origen:</Text>
          <Text style={styles.infoValue}>{formData.origen}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <MaterialCommunityIcons name="flag" size={20} color="#007AFF" />
          <Text style={styles.infoLabel}>Destino:</Text>
          <Text style={styles.infoValue}>{formData.destino}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <MaterialCommunityIcons name="currency-usd" size={20} color="#007AFF" />
          <Text style={styles.infoLabel}>Precio:</Text>
          <Text style={styles.infoValue}>${price.toLocaleString()}</Text>
        </View>
      </View>
    </View>
  );
}