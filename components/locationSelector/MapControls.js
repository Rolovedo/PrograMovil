import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function MapControls({ 
  routeCoordinates, 
  onCenterLocation, 
  onFitToRoute 
}) {
  return (
    <View style={{
      position: 'absolute', bottom: 120, right: 20,
      flexDirection: 'column',
    }}>
      {/*boton para centrar la ubicacion*/}
      <TouchableOpacity
        style={{
          backgroundColor: 'white', padding: 12, borderRadius: 25, 
          elevation: 5, marginBottom: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
        }}
        onPress={onCenterLocation}
      >
        <MaterialCommunityIcons name="crosshairs-gps" size={24} color="#007AFF" />
      </TouchableOpacity>

      {/*boton para ajustar a ruta*/}
      {routeCoordinates.length > 1 && (
        <TouchableOpacity
          style={{
            backgroundColor: 'white', padding: 12, borderRadius: 25, elevation: 5,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
          }}
          onPress={onFitToRoute}
        >
          <MaterialCommunityIcons name="fit-to-page-outline" size={24} color="#007AFF" />
        </TouchableOpacity>
      )}
    </View>
  );
}