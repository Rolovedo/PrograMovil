import React from 'react';
import { View, Text, Image } from 'react-native';
import { useAppContext } from '../../context/AppContext';

export default function PromoSection({ styles }) {
  const { user } = useAppContext();

  return (
    <View style={styles.promoSection}>
      <Text style={styles.promoTitle}>
        {user.isAuthenticated 
          ? `¡Hola ${user.name}! Aprovecha nuestras Promos`
          : 'Aprovecha nuestras Promos'
        }
      </Text>
      <View style={styles.promoContentRow}>
        <View style={styles.promoTextContainer}>
          <Text style={styles.promoSubtitle}>
            Por cada servicio tienes más{'\n'}probabilidades de{'\n'}recibirlas
          </Text>
        </View>
        <View style={styles.promotionsIcon}>
          <Image
            source={require('../../assets/twoSale.png')}
            style={styles.promotionImage}
          />
        </View>
      </View>
    </View>
  );
}