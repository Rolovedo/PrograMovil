import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppContext } from '../../context/AppContext';

export default function PromotionsSection({ onPromotionsPress, onKnowMorePress, styles }) {
  const { user } = useAppContext();

  return (
    <TouchableOpacity 
      style={styles.promotionsCard}
      onPress={onPromotionsPress}
      activeOpacity={0.8}
    >
      <View style={styles.promotionsContent}>
        <View style={styles.promotionsText}>
          <Text style={styles.promotionsTitle}>
            {user.isAuthenticated 
              ? `¡Hola ${user.name}! Aprovecha\nNuestras\nPromociones`
              : `Aprovecha\nNuestras\nPromociones`
            }
          </Text>
          
          {/* ✅ Restaurar el botón "Conoce más" */}
          <TouchableOpacity 
            style={styles.knowMoreButton}
            onPress={onKnowMorePress}
            activeOpacity={0.7}
          >
            <Text style={styles.knowMoreText}>Conoce más</Text>
            <MaterialCommunityIcons name="chevron-right" size={20} color="white" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.promotionsIcon}>
          <Image 
            source={require('../../assets/twoSale.png')} 
            style={{ width: 150, height: 150, resizeMode: 'contain' }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}