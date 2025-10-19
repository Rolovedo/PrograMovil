import React from 'react';
import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ServiceSummaryCard({ 
  formData, 
  towType, 
  urgency, 
  getTowTypeName, 
  getUrgencyName, 
  styles 
}) {
  return (
    <View style={styles.serviceCard}>
      <Text style={styles.cardTitle}>Resumen del Servicio</Text>
      
      <View style={styles.serviceInfo}>
        <View style={styles.infoRow}>
          <MaterialCommunityIcons name="truck" size={20} color="#007AFF" />
          <Text style={styles.infoLabel}>Tipo:</Text>
          <Text style={styles.infoValue}>{getTowTypeName(towType)}</Text>
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
          <MaterialCommunityIcons name="phone" size={20} color="#007AFF" />
          <Text style={styles.infoLabel}>Teléfono:</Text>
          <Text style={styles.infoValue}>{formData.telefono}</Text>
        </View>
        
        {formData.tipoVehiculo && (
          <View style={styles.infoRow}>
            <MaterialCommunityIcons name="car" size={20} color="#007AFF" />
            <Text style={styles.infoLabel}>Vehículo:</Text>
            <Text style={styles.infoValue}>{formData.tipoVehiculo}</Text>
          </View>
        )}

        <View style={styles.infoRow}>
          <MaterialCommunityIcons name="clock-alert" size={20} color="#007AFF" />
          <Text style={styles.infoLabel}>Urgencia:</Text>
          <Text style={styles.infoValue}>{getUrgencyName(urgency)}</Text>
        </View>

        {formData.observaciones && (
          <View style={styles.infoRow}>
            <MaterialCommunityIcons name="note-text" size={20} color="#007AFF" />
            <Text style={styles.infoLabel}>Observaciones:</Text>
            <Text style={styles.infoValue}>{formData.observaciones}</Text>
          </View>
        )}
      </View>
    </View>
  );
}