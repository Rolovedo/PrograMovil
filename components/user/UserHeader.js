import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppContext } from '../../context/AppContext';

export default function UserHeader({ onBackPress, onAvatarPress, styles }) {
  const { user } = useAppContext();

  return (
    <View style={styles.header}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={onBackPress}
        activeOpacity={0.7}
      >
        <MaterialCommunityIcons name="chevron-left" size={24} color="#fff" />
      </TouchableOpacity>
      
      <View style={styles.userInfo}>
        <Text style={styles.title}>{user.name}</Text>
        <View style={styles.rating}>
          <MaterialCommunityIcons name="star" size={16} color="#FFD700" />
          <Text style={styles.ratingText}>{user.rating}</Text>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.avatar}
        onPress={onAvatarPress}
        activeOpacity={0.8}
      >
        <MaterialCommunityIcons 
          name={user.isAuthenticated ? "account-check" : "account"} 
          size={30} 
          color={user.isAuthenticated ? "#4CAF50" : "#666"} 
        />
      </TouchableOpacity>
    </View>
  );
}