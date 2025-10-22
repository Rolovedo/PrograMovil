import React from 'react';
import { View, TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function PhoneInput({ value, onChangeText, styles }) {
  return (
    <View style={styles.inputContainer}>
      <MaterialCommunityIcons name="phone" size={20} color="#666" style={styles.inputIcon} />
      <TextInput
        style={styles.input}
        placeholder="Teléfono"
        placeholderTextColor="#999"
        value={value}
        onChangeText={onChangeText}
        keyboardType="phone-pad"
        autoCorrect={false}
      />
    </View>
  );
}