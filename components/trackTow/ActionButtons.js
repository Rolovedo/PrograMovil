import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ActionButtons({ 
  driverStatus, 
  onCompleteService, 
  onCancelService, 
  styles 
}) {
  return (
    <View style={styles.actionButtons}>
      {driverStatus === 'arrived' && (
        <TouchableOpacity 
          style={styles.completeButton}
          onPress={onCompleteService}
          activeOpacity={0.8}
        >
          <MaterialCommunityIcons name="check" size={20} color="white" />
          <Text style={styles.completeButtonText}>Servicio Completado</Text>
        </TouchableOpacity>
      )}
      
      <TouchableOpacity 
        style={styles.cancelButton}
        onPress={onCancelService}
        activeOpacity={0.8}
      >
        <MaterialCommunityIcons name="close" size={20} color="white" />
        <Text style={styles.cancelButtonText}>Cancelar Servicio</Text>
      </TouchableOpacity>
    </View>
  );
}