import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';

const DATA = [
  { id: '1', image: require('../assets/gruacarro.png'), titulo: 'Convencional', promo: true },
  { id: '2', image: require('../assets/gruaxl.png'), titulo: 'XL' },
  { id: '3', image: require('../assets/gruamoto.png'), titulo: 'Moto', promo: true },
  { id: '4', image: require('../assets/gruacarro.png'), titulo: 'Taller' },
];

export default function ServiciosScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: '#0f0f10' }}>
      <View style={{ padding: 16 }}>
        <Text style={{ color: 'white', fontSize: 22, fontWeight: 'bold' }}>Servicios de Grua</Text>
        <Text style={{ color: '#a0a0a5', marginTop: 4 }}>A tiempo, sin contratiempo</Text>
      </View>

      <FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 120 }}
        renderItem={({ item }) => (
          <TouchableOpacity style={{ backgroundColor: '#1a1b1e', padding: 16, borderRadius: 12, marginBottom: 12 }}>
            <Image 
            source={item.image} 
            style={{ display: 'flex', width: 80, height: 80, marginBottom: 8 }}
            resizeMode="contain"
            />
            <Text style={{ color: 'white', fontSize: 16 }}>{item.titulo}</Text>
            {item.promo ? <Text style={{ color: '#6ee7b7', marginTop: 4 }}>Promo</Text> : null}
          </TouchableOpacity>
        )}
      />

      <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: '#111315', padding: 16, borderTopWidth: 1, borderTopColor: '#2a2b2f' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
          <Text style={{ color: 'white' }}>Convencional</Text>
          <Text style={{ color: 'white' }}>$54.950</Text>
        </View>
        <TouchableOpacity style={{ backgroundColor: '#18a558', padding: 14, borderRadius: 10, alignItems: 'center' }}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Pedir Grua Convencional</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


