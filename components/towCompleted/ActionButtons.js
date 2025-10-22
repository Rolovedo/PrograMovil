import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ActionButtons({ 
  onRateService, 
  onViewHistory, 
  onNewService, 
  styles 
}) {
  return (
    <View style={styles.actionButtons}>
      <TouchableOpacity 
        style={styles.rateButton}
        onPress={onRateService}
        activeOpacity={0.8}
      >
        <MaterialCommunityIcons name="star" size={20} color="white" />
        <Text style={styles.rateButtonText}>Calificar Servicio</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.historyButton}
        onPress={onViewHistory}
        activeOpacity={0.8}
      >
        <MaterialCommunityIcons name="history" size={20} color="white" />
        <Text style={styles.historyButtonText}>Ver Historial</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.newServiceButton}
        onPress={onNewService}
        activeOpacity={0.8}
      >
        <MaterialCommunityIcons name="plus" size={20} color="white" />
        <Text style={styles.newServiceButtonText}>Nuevo Servicio</Text>
      </TouchableOpacity>
    </View>
  );
}