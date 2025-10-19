import React from 'react';
import {
  ScrollView,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { requestTowScreenStyles as styles } from '../styles/requestTowScreenStyle';

// Importar componentes modulares
import RequestTowHeader from '../components/requestTow/RequestTowHeader';
import RequestTowForm from '../components/requestTow/RequestTowForm';

// Importar hook personalizado
import { useRequestTowActions } from '../hooks/useRequestTowActions';

export default function RequestTowScreen({ navigation, route }) {
  const {
    serviceType,
    formData,
    handleInputChange,
    handleContinue,
    handleGoBack,
  } = useRequestTowActions(navigation, route);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      <RequestTowHeader 
        title={serviceType}
        onGoBack={handleGoBack}
        styles={styles}
      />

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <RequestTowForm 
          formData={formData}
          onInputChange={handleInputChange}
          onContinue={handleContinue}
          styles={styles}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
