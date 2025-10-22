// components/locationSelector/RouteInfo.js
import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function RouteInfo({ 
  destinationLocation, 
  calculatingRoute, 
  routeInfo 
}) {
  if (!destinationLocation) return null;

  return (
    <View style={{
      position: 'absolute', top: 20, left: 20, right: 20,
      backgroundColor: 'rgba(0, 0, 0, 0.95)', padding: 15, borderRadius: 12,
      borderWidth: 1, borderColor: calculatingRoute ? '#FFA500' : '#34C759', zIndex: 10,
    }}>
      {calculatingRoute ? (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <ActivityIndicator size="small" color="#FFA500" />
          <Text style={{
            color: '#FFA500', fontSize: 14, marginLeft: 10, fontWeight: '500'
          }}>
            Calculando mejor ruta...
          </Text>
        </View>
      ) : (
        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
            <MaterialCommunityIcons name="map-marker-path" size={18} color="#34C759" />
            <Text style={{
              color: '#34C759', fontSize: 14, marginLeft: 8, fontWeight: 'bold'
            }}>
              Ruta {routeInfo?.provider} ✅
            </Text>
          </View>
          
          {routeInfo && (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ flex: 1 }}>
                <Text style={{ color: '#888', fontSize: 11 }}>Distancia</Text>
                <Text style={{ color: 'white', fontSize: 13, fontWeight: '600' }}>
                  📏 {routeInfo.distance.toFixed(1)} km
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ color: '#888', fontSize: 11 }}>Tiempo est.</Text>
                <Text style={{ color: 'white', fontSize: 13, fontWeight: '600' }}>
                  ⏱️ {Math.round(routeInfo.duration)} min
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ color: '#888', fontSize: 11 }}>Precisión</Text>
                <Text style={{ color: 'white', fontSize: 13, fontWeight: '600' }}>
                  {routeInfo.provider === 'Estimado' ? '📐 Aprox.' : '🎯 Real'}
                </Text>
              </View>
            </View>
          )}
        </View>
      )}
    </View>
  );
}