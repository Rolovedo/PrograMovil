import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function BottomPanel({ 
  currentAddress, 
  destinationAddress, 
  distance, 
  estimatedPrice, 
  formatPrice, 
  onContinue, 
  canContinue,
  styles 
}) {
  return (
    <View style={styles.bottomPanel}>
      <View style={styles.locationInfo}>
        <Text style={styles.locationLabel}>Origen:</Text>
        <Text style={styles.locationText}>{currentAddress}</Text>
        
        {destinationAddress && (
          <>
            <Text style={styles.locationLabel}>Destino:</Text>
            <Text style={styles.locationText}>{destinationAddress}</Text>
          </>
        )}
      </View>

      {distance > 0 && (
        <View style={styles.routeInfo}>
          <View style={styles.routeInfoItem}>
            <Text style={styles.routeInfoLabel}>Distancia</Text>
            <Text style={styles.routeInfoValue}>{distance.toFixed(2)} km</Text>
          </View>
          <View style={styles.routeInfoItem}>
            <Text style={styles.routeInfoLabel}>Precio Estimado</Text>
            <Text style={[styles.routeInfoValue, styles.priceValue]}>
              {formatPrice(estimatedPrice)}
            </Text>
          </View>
        </View>
      )}

      <TouchableOpacity
        style={[
          styles.continueButton,
          !canContinue && styles.continueButtonDisabled
        ]}
        onPress={onContinue}
        disabled={!canContinue}
        activeOpacity={0.8}
      >
        <Text style={styles.continueButtonText}>
          Continuar {distance > 0 && `• ${formatPrice(estimatedPrice)}`}
        </Text>
      </TouchableOpacity>
    </View>
  );
}