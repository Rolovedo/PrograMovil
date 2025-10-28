import React from 'react';
import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function MapInstructions({ destinationLocation }) {
  if (destinationLocation) return null;

  return (
    <View style={{
      position: 'absolute', top: 20, left: 20, right: 20,
      backgroundColor: 'rgba(0, 0, 0, 0.9)', padding: 15, borderRadius: 12,
      borderWidth: 1, borderColor: '#333', zIndex: 10,
    }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <MaterialCommunityIcons name="map-marker-plus" size={20} color="#007AFF" />
        <Text style={{
          color: 'white', fontSize: 14, marginLeft: 10, flex: 1, fontWeight: '500'
        }}>
          Toca en el mapa para seleccionar el destino del servicio
        </Text>
      </View>
    </View>
  );
}