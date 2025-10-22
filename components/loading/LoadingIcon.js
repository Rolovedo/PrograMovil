import React from 'react';
import { View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function LoadingIcon({ styles }) {
  return (
    <View style={styles.icon}>
      <MaterialCommunityIcons name="car-tow" size={80} color="#FF6B35" />
    </View>
  );
}