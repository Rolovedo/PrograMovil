import React from 'react';
import { TouchableOpacity, Text, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from '../../contexts/AuthContext';

export default function LogoutButton({ styles }) {
  const { signOut, user } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro de que quieres cerrar sesión?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Cerrar Sesión',
          style: 'destructive',
          onPress: async () => {
            try {
              await signOut();
              console.log('✅ Sesión cerrada exitosamente');
            } catch (error) {
              console.error('❌ Error cerrando sesión:', error);
              Alert.alert('Error', 'No se pudo cerrar la sesión');
            }
          },
        },
      ]
    );
  };

  return (
    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
      <MaterialCommunityIcons name="logout" size={20} color="#FF6B35" />
      <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
    </TouchableOpacity>
  );
}
