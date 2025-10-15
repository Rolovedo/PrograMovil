import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
  Alert,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { towDetailsScreenStyles as styles } from '../styles/towDetailsScreenStyle';

export default function TowDetailsScreen({ navigation, route }) {
  const { formData, serviceType } = route.params;
  const [selectedTowType, setSelectedTowType] = useState(null);
  const [selectedUrgency, setSelectedUrgency] = useState('normal');

  const towTypes = [
    { id: 'convencional', name: 'Convencional', price: 54950, icon: 'truck' },
    { id: 'xl', name: 'XL', price: 75000, icon: 'truck-trailer' },
    { id: 'moto', name: 'Moto', price: 35000, icon: 'motorbike' },
    { id: 'taller', name: 'Taller', price: 65000, icon: 'wrench' },
  ];

  const urgencyOptions = [
    { id: 'normal', name: 'Normal', multiplier: 1, color: '#34C759' },
    { id: 'urgent', name: 'Urgente', multiplier: 1.5, color: '#FF9500' },
    { id: 'emergency', name: 'Emergencia', multiplier: 2, color: '#FF3B30' },
  ];

  const calculatePrice = () => {
    if (!selectedTowType) return 0;
    const basePrice = towTypes.find(t => t.id === selectedTowType)?.price || 0;
    const urgencyMultiplier = urgencyOptions.find(u => u.id === selectedUrgency)?.multiplier || 1;
    return Math.round(basePrice * urgencyMultiplier);
  };

  const handleContinue = () => {
    if (!selectedTowType) {
      Alert.alert('Error', 'Por favor selecciona un tipo de grúa');
      return;
    }

    navigation.navigate('ConfirmRequestScreen', {
      formData,
      serviceType,
      towType: selectedTowType,
      urgency: selectedUrgency,
      price: calculatePrice()
    });
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
        <Text style={styles.headerTitle}>Detalles del Servicio</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Resumen del servicio */}
        <View style={styles.summaryCard}>
          <Text style={styles.cardTitle}>Resumen del Servicio</Text>
          <View style={styles.summaryRow}>
            <MaterialCommunityIcons name="map-marker" size={20} color="#007AFF" />
            <Text style={styles.summaryLabel}>Origen:</Text>
            <Text style={styles.summaryValue}>{formData.origen}</Text>
          </View>
          <View style={styles.summaryRow}>
            <MaterialCommunityIcons name="flag" size={20} color="#007AFF" />
            <Text style={styles.summaryLabel}>Destino:</Text>
            <Text style={styles.summaryValue}>{formData.destino}</Text>
          </View>
          <View style={styles.summaryRow}>
            <MaterialCommunityIcons name="phone" size={20} color="#007AFF" />
            <Text style={styles.summaryLabel}>Teléfono:</Text>
            <Text style={styles.summaryValue}>{formData.telefono}</Text>
          </View>
        </View>

        {/* Selección de tipo de grúa */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Tipo de Grúa *</Text>
          <View style={styles.optionsGrid}>
            {towTypes.map((type) => (
              <TouchableOpacity
                key={type.id}
                style={[
                  styles.optionCard,
                  selectedTowType === type.id && styles.selectedOption
                ]}
                onPress={() => setSelectedTowType(type.id)}
                activeOpacity={0.8}
              >
                <MaterialCommunityIcons 
                  name={type.icon} 
                  size={32} 
                  color={selectedTowType === type.id ? '#007AFF' : '#666'} 
                />
                <Text style={[
                  styles.optionText,
                  selectedTowType === type.id && styles.selectedOptionText
                ]}>
                  {type.name}
                </Text>
                <Text style={[
                  styles.optionPrice,
                  selectedTowType === type.id && styles.selectedOptionPrice
                ]}>
                  ${type.price.toLocaleString()}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Selección de urgencia */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Nivel de Urgencia</Text>
          <View style={styles.urgencyContainer}>
            {urgencyOptions.map((urgency) => (
              <TouchableOpacity
                key={urgency.id}
                style={[
                  styles.urgencyOption,
                  selectedUrgency === urgency.id && styles.selectedUrgency,
                  { borderColor: urgency.color }
                ]}
                onPress={() => setSelectedUrgency(urgency.id)}
                activeOpacity={0.8}
              >
                <View style={[styles.urgencyIndicator, { backgroundColor: urgency.color }]} />
                <Text style={[
                  styles.urgencyText,
                  selectedUrgency === urgency.id && styles.selectedUrgencyText
                ]}>
                  {urgency.name}
                </Text>
                <Text style={[
                  styles.urgencyMultiplier,
                  selectedUrgency === urgency.id && styles.selectedUrgencyMultiplier
                ]}>
                  x{urgency.multiplier}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Precio estimado */}
        {selectedTowType && (
          <View style={styles.priceCard}>
            <Text style={styles.priceLabel}>Precio Estimado</Text>
            <Text style={styles.priceValue}>${calculatePrice().toLocaleString()}</Text>
            <Text style={styles.priceNote}>
              * Precio incluye IVA. Precio final puede variar según distancia.
            </Text>
          </View>
        )}

        {/* Botón Continuar */}
        <TouchableOpacity 
          style={[
            styles.continueButton,
            !selectedTowType && styles.disabledButton
          ]}
          onPress={handleContinue}
          activeOpacity={selectedTowType ? 0.8 : 1}
          disabled={!selectedTowType}
        >
          <Text style={styles.continueButtonText}>Continuar</Text>
          <MaterialCommunityIcons name="chevron-right" size={24} color="white" />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

