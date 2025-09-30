import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { serviciosScreenStyles as styles } from '../styles/serviciosScreenStyle';

const DATA = [
  { id: '1', image: require('../assets/gruacarro.png'), titulo: 'Convencional', promo: true },
  { id: '2', image: require('../assets/gruaxl.png'), titulo: 'XL' },
  { id: '3', image: require('../assets/gruamoto.png'), titulo: 'Moto', promo: true },
  { id: '4', image: require('../assets/gruacarro.png'), titulo: 'Taller' },
];

export default function ServiciosScreen() {
  const handleServicePress = (serviceName) => {
    console.log(`Servicio ${serviceName} presionado`);
    // Navegacion a detalles del servicio
  };

  const handleOrderPress = () => {
    console.log('Pedir Grua Convencional presionado');
    // Navegacion para pedir grua
  };

  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Servicios de Grua</Text>
        <Text style={styles.subtitle}>A tiempo, sin contratiempo</Text>
      </View>

      <FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.flatListContainer}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.serviceCard}
            onPress={() => handleServicePress(item.titulo)}
            activeOpacity={0.8}
          >
            <Image 
              source={item.image} 
              style={styles.serviceImage}
              resizeMode="contain"
            />
            <Text style={styles.serviceTitle}>{item.titulo}</Text>
            {item.promo ? <Text style={styles.promoText}>Promo</Text> : null}
          </TouchableOpacity>
        )}
      />

      <View style={styles.bottomPanel}>
        <View style={styles.bottomRow}>
          <Text style={styles.bottomText}>Convencional</Text>
          <Text style={styles.bottomText}>$54.950</Text>
        </View>
        <TouchableOpacity 
          style={styles.orderButton}
          onPress={handleOrderPress}
          activeOpacity={0.8}
        >
          <Text style={styles.orderButtonText}>Pedir Grua Convencional</Text>
        </TouchableOpacity>
      </View>
    </View>
  </SafeAreaView>
  );
}


