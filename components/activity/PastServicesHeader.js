import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function PastServicesHeader({ onFilter, styles }) {
  return (
    <View style={styles.pastHeader}>
      <Text style={styles.sectionTitle}>Ultimos servicios</Text>
      <TouchableOpacity 
        style={styles.filterButton}
        onPress={onFilter}
        activeOpacity={0.7}
      >
        <MaterialCommunityIcons name="tune" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}