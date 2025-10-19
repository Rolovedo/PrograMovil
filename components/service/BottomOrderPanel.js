import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useAppContext } from '../../context/AppContext';

export default function BottomOrderPanel({ data, onOrderPress, styles }) {
  const { user, selectedService } = useAppContext();

  return (
    <View style={styles.bottomPanel}>
      <View style={styles.bottomRow}>
        <Text style={styles.bottomText}>Convencional</Text>
        <Text style={styles.bottomText}>{data[0].precio}</Text>
      </View>
      
      {/* Mostrar información del usuario y servicio seleccionado */}
      {user.isAuthenticated && (
        <Text style={styles.userInfo}>
          Usuario: {user.name} | Rating: {user.rating} ⭐
        </Text>
      )}
      
      {selectedService && (
        <Text style={styles.selectedServiceInfo}>
          Último servicio: {selectedService.name}
        </Text>
      )}
      
      <TouchableOpacity 
        style={styles.orderButton}
        onPress={onOrderPress}
        activeOpacity={0.8}
      >
        <Text style={styles.orderButtonText}>
          {user.isAuthenticated 
            ? `${user.name}, Pedir Grua Convencional`
            : 'Pedir Grua Convencional'
          }
        </Text>
      </TouchableOpacity>
    </View>
  );
}