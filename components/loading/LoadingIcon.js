import React from 'react';
import { View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function LoadingIcon({ styles }) {
  return (
    <View style={styles.icon}>
      <MaterialCommunityIcons name="tow-truck" size={80} color="#ffffffff" />
    </View>
  );
}