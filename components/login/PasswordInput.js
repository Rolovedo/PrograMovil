import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function PasswordInput({ 
  password, 
  onPasswordChange, 
  showPassword, 
  onTogglePassword, 
  styles 
}) {
  return (
    <View style={styles.inputContainer}>
      <MaterialCommunityIcons name="lock" size={20} color="#666" style={styles.inputIcon} />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#999"
        value={password}
        onChangeText={onPasswordChange}
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