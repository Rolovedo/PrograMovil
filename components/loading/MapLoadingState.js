import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function MapLoadingState({ 
  message = 'Cargando mapa...',
  showIcon = true,
  backgroundColor = '#1a1a1a',
  iconColor = '#007AFF',
  textColor = 'white',
  iconName = 'map-outline',
  iconSize = 40
}) {
  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: backgroundColor
    }}>
      {showIcon && (
        <MaterialCommunityIcons 
          name={iconName} 
          size={iconSize} 
          color={iconColor}
          style={{ marginBottom: 15 }}
        />
      )}
      
      <ActivityIndicator 
        size="large" 
        color={iconColor} 
        style={{ marginBottom: 10 }}
      />
      
      <Text style={{ 
        color: textColor, 
        marginTop: 10,
        fontSize: 16,
        textAlign: 'center'
      }}>
        {message}
      </Text>
    </View>
  );
}