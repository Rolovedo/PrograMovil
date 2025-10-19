import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function TowTypeSelector({ 
  towTypes, 
  selectedTowType, 
  onSelectTowType, 
  styles 
}) {
  return (
    <View style={styles.sectionCard}>
      <Text style={styles.sectionTitle}>Tipo de Grúa *</Text>
      <View style={styles.optionsGrid}>
        {towTypes.map((type) => (
          <TouchableOpacity
            key={type.id}
            style={[
              styles.optionCard,
              selectedTowType === type.id && styles.selectedOption
            ]}
            onPress={() => onSelectTowType(type.id)}
            activeOpacity={0.8}
          >
            <MaterialCommunityIcons 
              name={type.icon} 
              size={32} 
              color={selectedTowType === type.id ? '#007AFF' : '#666'} 
            />
            <Text style={[
              styles.optionText,
              selectedTowType === type.id && styles.selectedOptionText
            ]}>
              {type.name}
            </Text>
            <Text style={[
              styles.optionPrice,
              selectedTowType === type.id && styles.selectedOptionPrice
            ]}>
              ${type.price.toLocaleString()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}