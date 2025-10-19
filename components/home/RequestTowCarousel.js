import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppContext } from '../../context/AppContext';

export default function RequestTowCarousel({ onMainCardPress, styles }) {
  const { user } = useAppContext();

  return (
    <View style={styles.mainCard}>
      <Text style={styles.mainTitle}>
        {user.isAuthenticated 
          ? `${user.name}, solicita tu próxima grúa`
          : 'Solicita tu próxima grúa'
        }
      </Text>
      
      <View style={styles.illustrationContainer}>
        <View style={styles.phoneFrame}>
          <View style={styles.phoneScreen}>
            <View style={styles.illustrationContent}>
              <Image 
                source={require('../../assets/rentalCar.png')} 
                style={{ width: 150, height: 100, resizeMode: 'contain' }} 
              />
            </View>
          </View>
          <View style={styles.phoneButton} />
        </View>
        
        <TouchableOpacity 
          style={styles.arrowButton}
          onPress={onMainCardPress}
          activeOpacity={0.8}
        >
          <MaterialCommunityIcons name="chevron-right" size={24} color="#666" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.pagination}>
        <View style={[styles.dot, styles.activeDot]} />
        <View style={styles.dot} />
      </View>
    </View>
  );
}