import React from 'react';
import { View, Text } from 'react-native';
import { useAppContext } from '../../context/AppContext';

export default function ServicesHeader({ styles }) {
  const { user } = useAppContext();

  return (
    <View style={styles.header}>
      <Text style={styles.title}>Servicios de Grúa</Text>
      <Text style={styles.subtitle}>
        {user.isAuthenticated 
          ? `A tiempo, sin contratiempo para ${user.name}`
          : 'A tiempo, sin contratiempo'
        }
      </Text>
    </View>
  );
}