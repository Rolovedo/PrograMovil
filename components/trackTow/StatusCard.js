import React from 'react';
import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function StatusCard({ statusInfo, styles }) {
  return (
    <View style={[styles.statusCard, { borderLeftColor: statusInfo.color }]}>
      <View style={styles.statusHeader}>
        <MaterialCommunityIcons 
          name={statusInfo.icon} 
          size={24} 
          color={statusInfo.color} 
        />
        <Text style={styles.statusTitle}>{statusInfo.title}</Text>
      </View>
      <Text style={styles.statusSubtitle}>{statusInfo.subtitle}</Text>
    </View>
  );
}