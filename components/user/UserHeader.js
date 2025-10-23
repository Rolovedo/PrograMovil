import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppContext } from '../../context/AppContext';
import { useAuth } from '../../contexts/AuthContext';

export default function UserHeader({ onBackPress, styles }) {
  const { user } = useAppContext();
  const { logout } = useAuth();

  return (
    <View style={styles.header}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={onBackPress}
        activeOpacity={0.7}
      >
        <MaterialCommunityIcons name="chevron-left" size={24} color="#fff" />
      </TouchableOpacity>
      
      <View style={styles.userInfo}>
        {/* ✅ Usar el primer nombre del usuario autenticado */}
        <Text style={styles.title}>{user.name}</Text>
        <View style={styles.rating}>
          <MaterialCommunityIcons name="star" size={16} color="#FFD700" />
          <Text style={styles.ratingText}>{user.rating}</Text>
        </View>
        {/* Mostrar email si está disponible */}
        {user.email && (
          <Text style={styles.email}>{user.email}</Text>
        )}
      </View>

      <TouchableOpacity 
        style={styles.avatar}
        activeOpacity={0.8}
      >
        <MaterialCommunityIcons 
          name={user.isAuthenticated ? "account-check" : "account"} 
          size={30} 
          color={user.isAuthenticated ? "#4CAF50" : "#666"} 
        />
      </TouchableOpacity>
    </View>
  );
}