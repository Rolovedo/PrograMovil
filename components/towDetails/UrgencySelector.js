import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function UrgencySelector({ 
  urgencyOptions, 
  selectedUrgency, 
  onSelectUrgency, 
  styles 
}) {
  return (
    <View style={styles.sectionCard}>
      <Text style={styles.sectionTitle}>Nivel de Urgencia</Text>
      <View style={styles.urgencyContainer}>
        {urgencyOptions.map((urgency) => (
          <TouchableOpacity
            key={urgency.id}
            style={[
              styles.urgencyOption,
              selectedUrgency === urgency.id && styles.selectedUrgency,
              { borderColor: urgency.color }
            ]}
            onPress={() => onSelectUrgency(urgency.id)}
            activeOpacity={0.8}
          >
            <View style={[styles.urgencyIndicator, { backgroundColor: urgency.color }]} />
            <Text style={[
              styles.urgencyText,
              selectedUrgency === urgency.id && styles.selectedUrgencyText
            ]}>
              {urgency.name}
            </Text>
            <Text style={[
              styles.urgencyMultiplier,
              selectedUrgency === urgency.id && styles.selectedUrgencyMultiplier
            ]}>
              x{urgency.multiplier}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}