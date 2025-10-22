import React from 'react';
import { View, Text } from 'react-native';
import { useAppContext } from '../../context/AppContext';

export default function ActivityHeader({ styles }) {
  const { user } = useAppContext();

  return (
    <View style={styles.header}>
      <Text style={styles.title}>
        {user.isAuthenticated ? `Actividad` : 'Actividad'}
      </Text>
      {user.isAuthenticated && (
        <View>
          {/* Mostrar nombre completo si está disponible */}
          {user.fullName && (
            <Text style={styles.fullName}>
              {user.fullName}
            </Text>
          )}
        </View>
      )}
    </View>
  );
}