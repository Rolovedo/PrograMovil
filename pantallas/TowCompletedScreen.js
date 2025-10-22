import React from 'react';
import {
  ScrollView,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { towCompletedScreenStyles as styles } from '../styles/towCompletedScreenStyle';

// Importar componentes modulares
import TowCompletedHeader from '../components/towCompleted/TowCompletedHeader';
import SuccessSection from '../components/towCompleted/SuccessSection';
import ServiceSummaryCard from '../components/towCompleted/ServiceSummaryCard';
import DriverCard from '../components/towCompleted/DriverCard';
import ActionButtons from '../components/towCompleted/ActionButtons';
import ThanksCard from '../components/towCompleted/ThanksCard';

// Importar hook personalizado
import { useTowCompletedActions } from '../hooks/useTowCompletedActions';

export default function TowCompletedScreen({ navigation, route }) {
  const {
    formData,
    serviceType,
    towType,
    urgency,
    price,
    driverInfo,
    handleRateService,
    handleNewService,
    handleViewHistory,
    handleGoHome,
  } = useTowCompletedActions(navigation, route);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      
      <TowCompletedHeader 
        onGoHome={handleGoHome}
        styles={styles}
      />

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        
        <SuccessSection styles={styles} />

        <ServiceSummaryCard 
          formData={formData}
          towType={towType}
          price={price}
          styles={styles}
        />

        <DriverCard 
          driverInfo={driverInfo}
          styles={styles}
        />

        <ActionButtons 
          onRateService={handleRateService}
          onViewHistory={handleViewHistory}
          onNewService={handleNewService}
          styles={styles}
        />

        <ThanksCard styles={styles} />

      </ScrollView>
    </SafeAreaView>
  );
}
