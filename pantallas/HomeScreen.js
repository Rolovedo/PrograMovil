import React from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  StatusBar,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { homeScreenStyles as styles } from '../styles/homeScreenStyle';

// Importar componentes modulares
import HomeHeader from '../components/home/HomeHeader';
import RequestTowCarousel from '../components/home/RequestTowCarousel';
import SuggestionsSection from '../components/home/SuggestionsSection';
import PromotionsSection from '../components/home/PromotionsSection';

// Importar hook personalizado
import { useHomeActions } from '../hooks/useHomeActions';

export default function HomeScreen({ navigation }) {  // ✅ Recibir navigation
  // ✅ Pasar navigation al hook
  const {
    handleProfilePress,
    handleMainCardPress,
    handleSuggestionPress,
    handlePromotionsPress,
    handleKnowMorePress,
  } = useHomeActions(navigation);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      
      {/* Header */}
      <HomeHeader 
        onProfilePress={handleProfilePress}
        styles={styles}
      />

      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Main Service Card */}
        <RequestTowCarousel 
          onMainCardPress={handleMainCardPress}
          styles={styles}
        />

        {/* Suggestions Section */}
        <SuggestionsSection 
          onSuggestionPress={handleSuggestionPress}
          styles={styles}
        />

        {/* Promotions Section */}
        <PromotionsSection 
          onPromotionsPress={handlePromotionsPress}
          onKnowMorePress={handleKnowMorePress}
          styles={styles}
        />
      </ScrollView>
    </SafeAreaView>
  );
}