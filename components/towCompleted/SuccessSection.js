import React from 'react';
import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function SuccessSection({ styles }) {
  return (
    <>
      <View style={styles.successIcon}>
        <MaterialCommunityIcons name="check-circle" size={80} color="#34C759" />
      </View>

      <Text style={styles.successTitle}>¡Servicio Completado!</Text>
      <Text style={styles.successSubtitle}>
        Tu servicio de grúa ha sido completado exitosamente
      </Text>
    </>
  );
}