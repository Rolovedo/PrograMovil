import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppContext } from '../../context/AppContext';

export default function SuggestionsSection({ onSuggestionPress, styles }) {
  const { user } = useAppContext();

  return (
    <View style={styles.suggestionsSection}>
      <Text style={styles.sectionTitle}>
        {user.isAuthenticated ? `Sugerencias` : 'Sugerencias'}
      </Text>
      
      <View style={styles.suggestionsGrid}>
        <TouchableOpacity 
          style={styles.suggestionCard}
          onPress={() => onSuggestionPress('Remolque ligero')}
          activeOpacity={0.8}
        >
          <Image source={require('../../assets/gruamoto.png')} style={styles.logo} resizeMode="contain" />
            <Text style={styles.suggestionText}>Remolque{'\n'}ligero</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.suggestionCard}
          onPress={() => onSuggestionPress('Transporte vehículo')}
          activeOpacity={0.8}
        >
          <Image source={require('../../assets/gruacarro.png')} style={styles.logo} resizeMode="contain" />
          <Text style={styles.suggestionText}>Transporte{'\n'}vehículo</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.suggestionCard}
          onPress={() => onSuggestionPress('Traslado ciudad')}
          activeOpacity={0.8}
        >
          <Image source={require('../../assets/gruaxl.png')} style={styles.logo} resizeMode="contain" />
          <Text style={styles.suggestionText}>Traslado{'\n'}ciudad</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.suggestionCard}
          onPress={() => onSuggestionPress('Asistencia rápida')}
          activeOpacity={0.8}
        >
          <Image source={require('../../assets/gruataller.png')} style={styles.logo} resizeMode="contain" />
          <Text style={styles.suggestionText}>Asistencia{'\n'}rápida</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}