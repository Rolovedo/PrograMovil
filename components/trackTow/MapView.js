import React from 'react';
import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function MapView({ driverStatus, styles }) {
  return (
    <View style={styles.mapContainer}>
      <View style={styles.mapPlaceholder}>
        <MaterialCommunityIcons name="map" size={80} color="#333" />
        <Text style={styles.mapText}>Mapa en tiempo real</Text>
        <Text style={styles.mapSubtext}>Ubicación del conductor</Text>
      </View>
      
      {/* Puntos en el mapa */}
      <View style={styles.originPoint}>
        <MaterialCommunityIcons name="map-marker" size={30} color="#34C759" />
      </View>
      
      <View style={styles.destinationPoint}>
        <MaterialCommunityIcons name="flag" size={30} color="#FF3B30" />
      </View>
      
      {driverStatus !== 'searching' && (
        <View style={styles.driverPoint}>
          <MaterialCommunityIcons name="truck" size={30} color="#007AFF" />
        </View>
      )}
    </View>
  );
}