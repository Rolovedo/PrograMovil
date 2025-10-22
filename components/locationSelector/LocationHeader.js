import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function LocationHeader({ onGoBack, styles }) {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={onGoBack} style={styles.backButton}>
        <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Seleccionar Ubicación</Text>
      <View style={styles.placeholder} />
    </View>
  );
}