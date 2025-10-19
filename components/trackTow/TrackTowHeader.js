import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function TrackTowHeader({ onGoBack, onCallDriver, driverInfo, styles }) {
  return (
    <View style={styles.header}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={onGoBack}
      >
        <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Seguimiento</Text>
      <TouchableOpacity 
        style={styles.menuButton}
        onPress={onCallDriver}
        disabled={!driverInfo}
      >
        <MaterialCommunityIcons 
          name="phone" 
          size={24} 
          color={driverInfo ? "white" : "#333"} 
        />
      </TouchableOpacity>
    </View>
  );
}