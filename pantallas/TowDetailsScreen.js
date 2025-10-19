import React from 'react';
import {
  ScrollView,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { towDetailsScreenStyles as styles } from '../styles/towDetailsScreenStyle';

// Importar componentes modulares
import TowDetailsHeader from '../components/towDetails/TowDetailsHeader';
import ServiceSummaryCard from '../components/towDetails/ServiceSummaryCard';
import TowTypeSelector from '../components/towDetails/TowTypeSelector';
import UrgencySelector from '../components/towDetails/UrgencySelector';
import PriceCard from '../components/towDetails/PriceCard';
import ContinueButton from '../components/towDetails/ContinueButton';

// Importar hook personalizado
import { useTowDetailsActions } from '../hooks/useTowDetailsActions';

export default function TowDetailsScreen({ navigation, route }) {
  const {
    formData,
    serviceType,
    selectedTowType,
    setSelectedTowType,
    selectedUrgency,
    setSelectedUrgency,
    towTypes,
    urgencyOptions,
    calculatePrice,
    handleContinue,
    handleGoBack,
  } = useTowDetailsActions(navigation, route);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      
      <TowDetailsHeader 
        onGoBack={handleGoBack}
        styles={styles}
      />

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        
        <ServiceSummaryCard 
          formData={formData}
          styles={styles}
        />

        <TowTypeSelector 
          towTypes={towTypes}
          selectedTowType={selectedTowType}
          onSelectTowType={setSelectedTowType}
          styles={styles}
        />

        <UrgencySelector 
          urgencyOptions={urgencyOptions}
          selectedUrgency={selectedUrgency}
          onSelectUrgency={setSelectedUrgency}
          styles={styles}
        />

        <PriceCard 
          price={calculatePrice()}
          styles={styles}
        />

        <ContinueButton 
          onPress={handleContinue}
          disabled={!selectedTowType}
          styles={styles}
        />

      </ScrollView>
    </SafeAreaView>
  );
}

