import React from 'react';
import { Text } from 'react-native';

export default function LoadingText({ title, subtitle, styles }) {
  return (
    <>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </>
  );
}