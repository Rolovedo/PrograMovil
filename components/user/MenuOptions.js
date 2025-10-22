import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppContext } from '../../context/AppContext';

export default function MenuOptions({ 
  onConfigPress, 
  onMessagesPress, 
  onDriverPress, 
  onHubPress, 
  styles 
}) {
  const { isLoading } = useAppContext();

  return (
    <View style={styles.menuSection}>
      <TouchableOpacity 
        style={styles.menuItem}
        onPress={onConfigPress}
        activeOpacity={0.6}
        disabled={isLoading}
      >
        <MaterialCommunityIcons 
          name={isLoading ? "loading" : "cog-outline"} 
          size={24} 
          color={isLoading ? "#FFD700" : "#fff"} 
        />
        <Text style={styles.menuText}>
          {isLoading ? 'Cargando configuración...' : 'Configuración'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.menuItem}
        onPress={onMessagesPress}
        activeOpacity={0.6}
      >
        <View style={styles.messageContainer}>
          <MaterialCommunityIcons name="message-outline" size={24} color="#fff" />
          <View style={styles.messageBadge} />
        </View>
        <Text style={styles.menuText}>Mensajes</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.menuItem}
        onPress={onDriverPress}
        activeOpacity={0.6}
      >
        <MaterialCommunityIcons name="tow-truck" size={24} color="#fff" />
        <Text style={styles.menuText}>Gana siendo conductor de Grúa</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.menuItem}
        onPress={onHubPress}
        activeOpacity={0.6}
      >
        <MaterialCommunityIcons name="office-building-outline" size={24} color="#fff" />
        <Text style={styles.menuText}>HUB de negocios</Text>
      </TouchableOpacity>
    </View>
  );
}