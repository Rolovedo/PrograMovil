import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppContext } from '../../context/AppContext';

export default function HomeHeader({ onProfilePress, styles }) {
  const { user } = useAppContext();

  return (
    <View style={styles.header}>
      <Text style={styles.brandName}>TOWX</Text>
      <TouchableOpacity 
        style={styles.profileButton}
        onPress={onProfilePress}
      >
        <MaterialCommunityIcons 
          name={user.isAuthenticated ? "account" : "account"} 
          size={30} 
          color={user.isAuthenticated ? "#ffffffff" : "#fff"} 
        />
      </TouchableOpacity>
    </View>
  );
}