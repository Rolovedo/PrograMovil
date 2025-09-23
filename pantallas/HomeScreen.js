import React from 'react';
import { View, Text, TextInput, ScrollView } from 'react-native';

export default function HomeScreen() {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#0f0f10' }} contentContainerStyle={{ padding: 16 }}>
      <View style={{ backgroundColor: '#1a1b1e', padding: 12, borderRadius: 12 }}>
        <TextInput
          placeholder="Ingresa tu ubicación"
          placeholderTextColor="#8e8e93"
          style={{ backgroundColor: '#2a2b2f', color: 'white', padding: 12, borderRadius: 10 }}
        />
      </View>

      <View style={{ marginTop: 16, backgroundColor: '#1a1b1e', borderRadius: 12, padding: 16, alignItems: 'center' }}>
        <Text style={{ color: 'white', fontWeight: 'bold', marginBottom: 8 }}>Solicita tu próxima grúa</Text>
        <Text style={{ color: '#a0a0a5' }}>Vista ilustrativa (base)</Text>
      </View>

      <View style={{ marginTop: 16 }}>
        <Text style={{ color: 'white', marginBottom: 8 }}>Suggestions</Text>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <View style={{ backgroundColor: '#1a1b1e', borderRadius: 20, paddingVertical: 10, paddingHorizontal: 14 }}>
            <Text style={{ color: 'white' }}>Remolque ligero</Text>
          </View>
          <View style={{ backgroundColor: '#1a1b1e', borderRadius: 20, paddingVertical: 10, paddingHorizontal: 14 }}>
            <Text style={{ color: 'white' }}>Transporte vehículo</Text>
          </View>
          <View style={{ backgroundColor: '#1a1b1e', borderRadius: 20, paddingVertical: 10, paddingHorizontal: 14 }}>
            <Text style={{ color: 'white' }}>Asistencia</Text>
          </View>
        </View>
      </View>

      <View style={{ marginTop: 16, backgroundColor: '#1a1b1e', borderRadius: 12, padding: 16 }}>
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Aprovecha Nuestras Promociones</Text>
        <Text style={{ color: '#a0a0a5', marginTop: 4 }}>Contenido placeholder</Text>
      </View>
    </ScrollView>
  );
}


