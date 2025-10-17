import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
  ScrollView,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTowService } from '../hooks/useTowService';

export default function ConfirmRequestScreen({ navigation, route }) {
  const { formData, serviceType, towType, urgency, price } = route.params;
  const { createRequest, loading, error } = useTowService();
  const [isCreating, setIsCreating] = useState(false);
  
  const getTowTypeName = (type) => {
    const types = {
      'convencional': 'Convencional',
      'xl': 'XL',
      'moto': 'Moto',
      'taller': 'Taller'
    };
    return types[type] || type;
  };

  const getUrgencyName = (urgency) => {
    const urgencies = {
      'normal': 'Normal',
      'urgent': 'Urgente',
      'emergency': 'Emergencia'
    };
    return urgencies[urgency] || urgency;
  };

  const handleConfirmar = async () => {
    setIsCreating(true);
    
    try {
      // Crear la solicitud en Supabase
      const requestResult = await createRequest(formData, serviceType, towType, urgency, price);
      
      // Navegar a TrackTowScreen con el ID de la solicitud
      navigation.navigate('TrackTowScreen', {
        formData,
        serviceType,
        towType,
        urgency,
        price,
        requestId: requestResult.id
      });
    } catch (err) {
      Alert.alert(
        'Error',
        'No se pudo crear la solicitud. Por favor, inténtalo de nuevo.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsCreating(false);
    }
  };

  const handleCancelar = () => {
    Alert.alert(
      'Cancelar Servicio',
      '¿Estás seguro de que quieres cancelar este servicio?',
      [
        { text: 'No', style: 'cancel' },
        { 
          text: 'Sí', 
          onPress: () => navigation.navigate('HomeMain')
        }
      ]
    );
  };

  const handleEditar = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Confirmar Servicio</Text>
        <TouchableOpacity 
          style={styles.editButton}
          onPress={handleEditar}
        >
          <MaterialCommunityIcons name="pencil" size={20} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Resumen del Servicio */}
        <View style={styles.serviceCard}>
          <Text style={styles.cardTitle}>Resumen del Servicio</Text>
          
          <View style={styles.serviceInfo}>
            <View style={styles.infoRow}>
              <MaterialCommunityIcons name="truck" size={20} color="#007AFF" />
              <Text style={styles.infoLabel}>Tipo:</Text>
              <Text style={styles.infoValue}>{getTowTypeName(towType)}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <MaterialCommunityIcons name="map-marker" size={20} color="#007AFF" />
              <Text style={styles.infoLabel}>Origen:</Text>
              <Text style={styles.infoValue}>{formData.origen}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <MaterialCommunityIcons name="flag" size={20} color="#007AFF" />
              <Text style={styles.infoLabel}>Destino:</Text>
              <Text style={styles.infoValue}>{formData.destino}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <MaterialCommunityIcons name="phone" size={20} color="#007AFF" />
              <Text style={styles.infoLabel}>Teléfono:</Text>
              <Text style={styles.infoValue}>{formData.telefono}</Text>
            </View>
            
            {formData.tipoVehiculo && (
              <View style={styles.infoRow}>
                <MaterialCommunityIcons name="car" size={20} color="#007AFF" />
                <Text style={styles.infoLabel}>Vehículo:</Text>
                <Text style={styles.infoValue}>{formData.tipoVehiculo}</Text>
              </View>
            )}

            <View style={styles.infoRow}>
              <MaterialCommunityIcons name="clock-alert" size={20} color="#007AFF" />
              <Text style={styles.infoLabel}>Urgencia:</Text>
              <Text style={styles.infoValue}>{getUrgencyName(urgency)}</Text>
            </View>

            {formData.observaciones && (
              <View style={styles.infoRow}>
                <MaterialCommunityIcons name="note-text" size={20} color="#007AFF" />
                <Text style={styles.infoLabel}>Observaciones:</Text>
                <Text style={styles.infoValue}>{formData.observaciones}</Text>
              </View>
            )}
          </View>
        </View>

        {/* Precio */}
        <View style={styles.priceCard}>
          <Text style={styles.priceLabel}>Precio Total</Text>
          <Text style={styles.priceValue}>${price.toLocaleString()}</Text>
          <Text style={styles.priceNote}>* Precio incluye IVA</Text>
        </View>

        {/* Términos y condiciones */}
        <View style={styles.termsCard}>
          <Text style={styles.termsTitle}>Términos y Condiciones</Text>
          <Text style={styles.termsText}>
            • El precio puede variar según la distancia real del servicio{'\n'}
            • El tiempo de llegada estimado es de 15-30 minutos{'\n'}
            • Se requiere pago en efectivo o tarjeta al conductor{'\n'}
            • El servicio incluye seguro básico de transporte
          </Text>
        </View>

        {/* Botones de Acción */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.cancelButton}
            onPress={handleCancelar}
            activeOpacity={0.8}
          >
            <MaterialCommunityIcons name="close" size={20} color="white" />
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.confirmButton, isCreating && styles.disabledButton]}
            onPress={handleConfirmar}
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
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  editButton: {
    padding: 5,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  serviceCard: {
    backgroundColor: '#111',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  cardTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  serviceInfo: {
    gap: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  infoLabel: {
    color: '#888',
    fontSize: 14,
    minWidth: 80,
  },
  infoValue: {
    color: 'white',
    fontSize: 14,
    flex: 1,
  },
  priceCard: {
    backgroundColor: '#007AFF',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  priceLabel: {
    color: 'white',
    fontSize: 16,
    marginBottom: 5,
  },
  priceValue: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
  },
  priceNote: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    marginTop: 5,
  },
  termsCard: {
    backgroundColor: '#111',
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
  },
  termsTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  termsText: {
    color: '#888',
    fontSize: 14,
    lineHeight: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 15,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#FF3B30',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    gap: 8,
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  confirmButton: {
    flex: 1,
    backgroundColor: '#34C759',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    gap: 8,
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#666',
    opacity: 0.6,
  },
});
