import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ActionButtons({ onHelpPress, onActivityPress, styles }) {
  return (
    <View style={styles.actionButtons}>
      <TouchableOpacity 
        style={styles.actionButton}
        onPress={onHelpPress}
        activeOpacity={0.8}
      >
        <View style={styles.actionButtonContent}>
          <MaterialCommunityIcons name="help-circle-outline" size={32} color="#666" />
        </View>
        <Text style={styles.actionButtonText}>Ayuda</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.actionButton}
        onPress={onActivityPress}
        activeOpacity={0.8}
      >
        <View style={styles.actionButtonContent}>
          <MaterialCommunityIcons name="history" size={32} color="#666" />
        </View>
        <Text style={styles.actionButtonText}>Actividad</Text>
      </TouchableOpacity>
    </View>
  );
}