import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppContext } from '../../context/AppContext';

export default function ServiceHistoryCard({ 
  onRate, 
  onRecharge, 
  onServiceDetails, 
  styles 
}) {
  const { user, selectedService, setSelectedService } = useAppContext();

  // Datos mock del servicio (en producción vendrían como props)
  const serviceData = {
    id: '1',
    location: 'Poblado 2 Mz 10 casa 5',
    date: '12Nov',
    time: '11:36AM',
    price: '$70.000',
    serviceName: 'Grúa Convencional',
    rating: null, // null = no calificado, número = ya calificado
  };

  const handleRechargePress = (e) => {
    e.stopPropagation();
    
    // Actualizar el servicio seleccionado en el contexto
    setSelectedService({
      id: serviceData.id,
      name: serviceData.serviceName,
      price: serviceData.price
    });
    
    console.log(`${user.name} está recargando servicio: ${serviceData.serviceName}`);
    onRecharge();
  };

  const handleRatePress = (e) => {
    e.stopPropagation();
    console.log(`${user.name} va a calificar servicio: ${serviceData.serviceName}`);
    onRate();
  };

  return (
    <TouchableOpacity 
      style={styles.serviceCard}
      onPress={() => onServiceDetails(serviceData.id)}
      activeOpacity={0.8}
    >
      {/* Map placeholder */}
      <View style={styles.mapContainer}>
        <Image 
          source={require('../../assets/map.png')} 
          style={styles.mapImage}
        />
      </View>

      {/* Service info */}
      <View style={styles.serviceInfo}>
        <Text style={styles.serviceLocation}>{serviceData.location}</Text>
        <Text style={styles.serviceDateTime}>
          {serviceData.date} | {serviceData.time}
        </Text>
        <Text style={styles.servicePrice}>{serviceData.price}</Text>
        
        {/* Mostrar información del usuario desde el contexto */}
        <Text style={styles.serviceUser}>
          Usuario: {user.name} | Rating: {user.rating} ⭐
        </Text>
        
        {/* Mostrar si este servicio está seleccionado */}
        {selectedService && selectedService.id === serviceData.id && (
          <Text style={styles.selectedServiceIndicator}>
            ✓ Servicio seleccionado para recargar
          </Text>
        )}
      </View>

      {/* Action buttons */}
      <View style={styles.serviceActions}>
        <TouchableOpacity 
          style={[
            styles.rateButton,
            { backgroundColor: serviceData.rating ? '#4CAF50' : '#666' }
          ]}
          onPress={handleRatePress}
          activeOpacity={0.8}
        >
          <MaterialCommunityIcons 
            name={serviceData.rating ? "star" : "star-outline"} 
            size={20} 
            color="#fff" 
          />
          <Text style={styles.actionButtonText}>
            {serviceData.rating ? 'Calificado' : 'Puntúa'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[
            styles.rechargeButton,
            { 
              backgroundColor: selectedService && selectedService.id === serviceData.id 
                ? '#1a4c96' 
                : '#333' 
            }
          ]}
          onPress={handleRechargePress}
          activeOpacity={0.8}
        >
          <MaterialCommunityIcons name="refresh" size={20} color="#fff" />
          <Text style={styles.actionButtonText}>Recargar</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}