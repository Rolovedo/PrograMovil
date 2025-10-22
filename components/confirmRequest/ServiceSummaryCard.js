import React from 'react';
import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ServiceSummaryCard({ 
  formData, 
  serviceType, 
  urgency, 
  getUrgencyName, 
  styles 
}) {
  return (
    <View style={styles.serviceCard}>
      <Text style={styles.cardTitle}>Resumen del Servicio</Text>
      
      <View style={styles.serviceInfo}>
        <View style={styles.infoRow}>
          <MaterialCommunityIcons name="truck" size={20} color="#007AFF" />
          <Text style={styles.infoLabel}>Servicio:</Text>
          <Text style={styles.infoValue}>{serviceType || 'Servicio de Grúa'}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <MaterialCommunityIcons name="map-marker" size={20} color="#007AFF" />
          <Text style={styles.infoLabel}>Origen:</Text>
          <Text style={styles.infoValue}>{formData.origen}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <MaterialCommunityIcons name="flag-checkered" size={20} color="#007AFF" />
          <Text style={styles.infoLabel}>Destino:</Text>
          <Text style={styles.infoValue}>{formData.destino}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <MaterialCommunityIcons name="phone" size={20} color="#007AFF" />
          <Text style={styles.infoLabel}>Teléfono:</Text>
          <Text style={styles.infoValue}>{formData.telefono || 'No disponible'}</Text>
        </View>
        
        {formData.distance && (
          <View style={styles.infoRow}>
            <MaterialCommunityIcons name="map-marker-distance" size={20} color="#007AFF" />
            <Text style={styles.infoLabel}>Distancia:</Text>
            <Text style={styles.infoValue}>{formData.distance} km</Text>
          </View>
        )}

        {formData.estimatedDuration && formData.estimatedDuration > 0 && (
          <View style={styles.infoRow}>
            <MaterialCommunityIcons name="clock-outline" size={20} color="#007AFF" />
            <Text style={styles.infoLabel}>Tiempo est:</Text>
            <Text style={styles.infoValue}>{Math.round(formData.estimatedDuration)} min</Text>
          </View>
        )}

        <View style={styles.infoRow}>
          <MaterialCommunityIcons name="clock-alert" size={20} color="#007AFF" />
          <Text style={styles.infoLabel}>Urgencia:</Text>
          <Text style={styles.infoValue}>{getUrgencyName(urgency)}</Text>
        </View>

        {formData.observaciones && (
          <View style={styles.infoRow}>
            <MaterialCommunityIcons name="note-text" size={20} color="#666" />
            <Text style={styles.infoLabel}>Observaciones:</Text>
            <Text style={styles.infoValue}>{formData.observaciones}</Text>
          </View>
        )}
      </View>
    </View>
  );
}