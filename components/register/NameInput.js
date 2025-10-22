import React from 'react';
import { View, TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function NameInput({ value, onChangeText, styles }) {
  return (
    <View style={styles.inputContainer}>
      <MaterialCommunityIcons name="account" size={20} color="#666" style={styles.inputIcon} />
      <TextInput
        style={styles.input}
        placeholder="Nombre completo"
        placeholderTextColor="#999"
        value={value}
        onChangeText={onChangeText}
        autoCapitalize="words"
        autoCorrect={false}
      />
    </View>
  );
}