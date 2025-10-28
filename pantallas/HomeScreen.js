import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StatusBar } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { homeScreenStyles as styles } from '../styles/homeScreenStyle';
import HomeHeader from '../components/home/HomeHeader';
import WelcomeMessage from '../components/home/WelcomeMessage';
import SuggestionsSection from '../components/home/SuggestionsSection';
import PromotionsSection from '../components/home/PromotionsSection';
import { useHomeActions } from '../hooks/useHomeActions';

export default function HomeScreen({ navigation }) {

  const {
    handleProfilePress,
    handleSuggestionPress,
    handlePromotionsPress,
    handleKnowMorePress,
  } = useHomeActions(navigation);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      {/*header*/}
      <HomeHeader onProfilePress={handleProfilePress} styles={styles} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/*carta de bienvenida*/}
        <WelcomeMessage styles={styles} />

        {/*sugerencias*/}
        <SuggestionsSection onSuggestionPress={handleSuggestionPress} styles={styles} />

        {/*promociones*/}
        <PromotionsSection
          onPromotionsPress={handlePromotionsPress}
          onKnowMorePress={handleKnowMorePress}
          styles={styles}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
