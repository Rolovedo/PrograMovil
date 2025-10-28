import React from 'react';
import {
  ScrollView,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { towDetailsScreenStyles as styles } from '../styles/towDetailsScreenStyle';

//componentes modulares
import TowDetailsHeader from '../components/towDetails/TowDetailsHeader';
import ServiceSummaryCard from '../components/towDetails/ServiceSummaryCard';
import UrgencySelector from '../components/towDetails/UrgencySelector';
import PriceCard from '../components/towDetails/PriceCard';
import ContinueButton from '../components/towDetails/ContinueButton';

//hook personalizado
import { useTowDetailsActions } from '../hooks/useTowDetailsActions';

export default function TowDetailsScreen({ navigation, route }) {
  const {
    formData,
    serviceType,
    selectedUrgency,
    setSelectedUrgency,
    urgencyOptions,
    calculatePrice,
    handleContinue,
    handleGoBack,
    basePrice,
  } = useTowDetailsActions(navigation, route);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      
      <TowDetailsHeader 
        onGoBack={handleGoBack}
        styles={styles}
      />

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        
        {/*muestra el telefono del usuario */}
        <ServiceSummaryCard 
          formData={formData}
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

        {/*boton siempre habilitado */}
        <ContinueButton 
          onPress={handleContinue}
          disabled={false}
          styles={styles}
        />

      </ScrollView>
    </SafeAreaView>
  );
}

