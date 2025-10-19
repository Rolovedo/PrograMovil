import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ConfirmHeader({ onGoBack, onEditar, styles }) {
  return (
    <View style={styles.header}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={onGoBack}
      >
        <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Confirmar Servicio</Text>
      <TouchableOpacity 
        style={styles.editButton}
        onPress={onEditar}
      >
        <MaterialCommunityIcons name="pencil" size={20} color="#007AFF" />
      </TouchableOpacity>
    </View>
  );
}