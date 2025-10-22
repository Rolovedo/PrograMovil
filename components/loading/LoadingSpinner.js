import React from 'react';
import { ActivityIndicator } from 'react-native';

export default function LoadingSpinner({ styles }) {
  return (
    <ActivityIndicator 
      size="large" 
      color="#FF6B35" 
      style={styles.loader} 
    />
  );
}