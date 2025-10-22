import React from 'react';
import { View, TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function EmailInput({ email, onEmailChange, styles }) {
  return (
    <View style={styles.inputContainer}>
      <MaterialCommunityIcons name="email" size={20} color="#666" style={styles.inputIcon} />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#999"
        value={email}
        onChangeText={onEmailChange}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
    </View>
  );
}