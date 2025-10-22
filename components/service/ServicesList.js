import React from 'react';
import { FlatList, TouchableOpacity, Image, Text } from 'react-native';
import { useAppContext } from '../../context/AppContext';

export default function ServicesList({ data, onServicePress, styles }) {
  const { selectedService } = useAppContext();

  const renderServiceItem = ({ item }) => (
    <TouchableOpacity 
      style={[
        styles.serviceCard,
        // Resaltar si este servicio está seleccionado
        selectedService && selectedService.name === item.titulo && {
          borderWidth: 2,
          borderColor: '#4CAF50'
        }
      ]}
      onPress={() => onServicePress(item.titulo)}
      activeOpacity={0.8}
    >
      <Image 
        source={item.image} 
        style={styles.serviceImage}
        resizeMode="contain"
      />
      <Text style={styles.serviceTitle}>{item.titulo}</Text>
      {item.promo ? <Text style={styles.promoText}>Promo</Text> : null}
      
      {/* Indicador de servicio seleccionado */}
      {selectedService && selectedService.name === item.titulo && (
        <Text style={styles.selectedIndicator}>✓ Seleccionado</Text>
      )}
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.flatListContainer}
      renderItem={renderServiceItem}
      showsVerticalScrollIndicator={false}
    />
  );
}