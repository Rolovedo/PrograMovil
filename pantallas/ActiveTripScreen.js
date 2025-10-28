import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { activeTripScreenStyles as styles } from '../styles/activeTripScreenStyle';

export default function ActiveTripScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Servicio Activo</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.serviceInfoCard}>
          <Text style={styles.serviceInfoTitle}>Información del Servicio</Text>
          
          <View style={styles.serviceInfoRow}>
            <Text style={styles.serviceInfoLabel}>Estado:</Text>
            <Text style={styles.serviceInfoValue}>En progreso</Text>
          </View>
          
          <View style={styles.serviceInfoRow}>
            <Text style={styles.serviceInfoLabel}>Tipo:</Text>
            <Text style={styles.serviceInfoValue}>Servicio de Grúa</Text>
          </View>
          
          <View style={styles.serviceInfoRow}>
            <Text style={styles.serviceInfoLabel}>Tiempo estimado:</Text>
            <Text style={styles.serviceInfoValue}>15 min</Text>
          </View>
        </View>

        <View style={styles.actionButtonsContainer}>
          <View style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Ver en Mapa</Text>
          </View>
          
          <View style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Contactar Conductor</Text>
          </View>
          
          <View style={styles.dangerButton}>
            <Text style={styles.dangerButtonText}>Cancelar Servicio</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
