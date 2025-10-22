import React from 'react';
import { View, Text } from 'react-native';

export default function StatusBar({ status, styles }) {
  return (
    <View style={styles.statusBar}>
      <Text style={styles.statusText}>{status}</Text>
    </View>
  );
}