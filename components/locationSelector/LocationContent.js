import React from 'react';
import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function LocationContent({ serviceType, styles }) {
  return (
    <View style={styles.content}>
      <View style={styles.mapIcon}>
        <MaterialCommunityIcons name="map-marker" size={100} color="#007AFF" />
      </View>
      
      <Text style={styles.title}>Selector de Ubicación</Text>
      
      <Text style={styles.serviceLabel}>Servicio solicitado:</Text>
      
      <Text style={styles.serviceType}>{serviceType}</Text>
    </View>
  );
}