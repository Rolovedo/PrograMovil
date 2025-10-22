import React from 'react';
import { StatusBar, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { confirmRequestScreenStyles as styles } from '../styles/confirmRequestScreenStyle';
import { useTowService } from '../hooks/useTowService';

// Importar componentes modulares
import ConfirmHeader from '../components/confirmRequest/ConfirmHeader';
import ServiceSummaryCard from '../components/confirmRequest/ServiceSummaryCard';
import PriceCard from '../components/confirmRequest/PriceCard';
import TermsCard from '../components/confirmRequest/TermsCard';
import ActionButtons from '../components/confirmRequest/ActionButtons';

// Importar hook personalizado
import { useConfirmRequestActions } from '../hooks/useConfirmRequestActions';

export default function ConfirmRequestScreen({ navigation, route }) {
  const { formData, serviceType, urgency, price } = route.params;
  const { createRequest, loading, error } = useTowService();
  
  const {
    isCreating,
    getUrgencyName,
    handleConfirmar,
    handleCancelar,
    handleEditar,
    handleGoBack,
  } = useConfirmRequestActions(navigation, createRequest);

  const onConfirm = () => handleConfirmar(formData, serviceType, urgency, price);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      
      <ConfirmHeader 
        onGoBack={handleGoBack}
        onEditar={handleEditar}
        styles={styles}
      />

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        
        <ServiceSummaryCard 
          formData={formData}
          serviceType={serviceType}
          urgency={urgency}
          getUrgencyName={getUrgencyName}
          styles={styles}
        />

        <PriceCard 
          price={price}
          styles={styles}
        />

        <TermsCard styles={styles} />

        <ActionButtons 
          onCancelar={handleCancelar}
          onConfirmar={onConfirm}
          isCreating={isCreating}
          styles={styles}
        />
        
      </ScrollView>
    </SafeAreaView>
  );
}
