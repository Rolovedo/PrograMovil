import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ConfirmPasswordInput({ 
  value, 
  onChangeText, 
  showPassword, 
  onTogglePassword, 
  styles 
}) {
  return (
    <View style={styles.inputContainer}>
      <MaterialCommunityIcons name="lock-check" size={20} color="#666" style={styles.inputIcon} />
      <TextInput
        style={styles.input}
        placeholder="Confirmar contraseña"
        placeholderTextColor="#999"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={!showPassword}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TouchableOpacity
        style={styles.eyeIcon}
        onPress={onTogglePassword}
      >
        <MaterialCommunityIcons 
          name={showPassword ? "eye-off" : "eye"} 
          size={20} 
          color="#666" 
        />
      </TouchableOpacity>
    </View>
  );
}