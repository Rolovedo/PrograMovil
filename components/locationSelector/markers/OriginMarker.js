// components/locationSelector/markers/OriginMarker.js
import React from 'react';
import { View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function OriginMarker({ Marker, coordinate }) {
  if (!Marker || !coordinate) return null;

  return (
    <Marker
      coordinate={coordinate}
      title="Punto de recogida"
      description="Tu ubicación actual"
      identifier="origin"
      anchor={{ x: 0.5, y: 0.5 }}
    >
      {/*marcador de origen renderizado*/}
      <MaterialCommunityIcons 
        name="account-circle" 
        size={40} 
        color="#007AFF" 
        style={{
          textShadowColor: 'rgba(0,0,0,0.5)',
          textShadowOffset: { width: 1, height: 1 },
          textShadowRadius: 2,
        }}
      />
    </Marker>
  );
}