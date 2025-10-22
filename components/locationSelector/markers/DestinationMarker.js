// components/locationSelector/markers/DestinationMarker.js
import React from 'react';
import { View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function DestinationMarker({ Marker, coordinate }) {
  if (!Marker || !coordinate) return null;

  return (
    <Marker
      coordinate={coordinate}
      title="Destino del servicio"
      description="Punto de entrega"
      identifier="destination"
      anchor={{ x: 0.5, y: 1 }}
    >
      <MaterialCommunityIcons 
        name="map-marker" 
        size={45} 
        color="#FF3B30" 
        style={{
          textShadowColor: 'rgba(0,0,0,0.5)',
          textShadowOffset: { width: 1, height: 1 },
          textShadowRadius: 2,
        }}
      />
    </Marker>
  );
}