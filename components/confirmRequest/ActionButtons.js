import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ActionButtons({ 
  onCancelar, 
  onConfirmar, 
  isCreating, 
  styles 
}) {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity 
        style={styles.cancelButton}
        onPress={onCancelar}
        activeOpacity={0.8}
      >
        <MaterialCommunityIcons name="close" size={20} color="white" />
        <Text style={styles.cancelButtonText}>Cancelar</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.confirmButton, isCreating && styles.disabledButton]}
        onPress={onConfirmar}
        activeOpacity={0.8}
        disabled={isCreating}
      >
        <MaterialCommunityIcons 
          name={isCreating ? "loading" : "check"} 
          size={20} 
          color="white" 
        />
        <Text style={styles.confirmButtonText}>
          {isCreating ? 'Creando...' : 'Confirmar'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}