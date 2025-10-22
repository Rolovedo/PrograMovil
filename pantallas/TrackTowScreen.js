import React from 'react';
import {
  ScrollView,
  StatusBar,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { trackTowScreenStyles as styles } from '../styles/trackTowScreenStyle';

// Importar componentes modulares
import TrackTowHeader from '../components/trackTow/TrackTowHeader';
import MapView from '../components/trackTow/MapView';
import StatusCard from '../components/trackTow/StatusCard';
import DriverCard from '../components/trackTow/DriverCard';
import ServiceInfoCard from '../components/trackTow/ServiceInfoCard';
import ActionButtons from '../components/trackTow/ActionButtons';

// Importar hook personalizado
import { useTrackTowActions } from '../hooks/useTrackTowActions';

export default function TrackTowScreen({ navigation, route }) {
  const {
    formData,
    serviceType,
    towType,
    urgency,
    price,
    driverStatus,
    estimatedTime,
    driverInfo,
    getStatusInfo,
    handleCallDriver,
    handleCancelService,
    handleCompleteService,
    handleGoBack,
  } = useTrackTowActions(navigation, route);

  const statusInfo = getStatusInfo();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      
      <TrackTowHeader 
        onGoBack={handleGoBack}
        onCallDriver={handleCallDriver}
        driverInfo={driverInfo}
        styles={styles}
      />

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        
        <MapView 
          driverStatus={driverStatus}
          styles={styles}
        />

        <View style={styles.statusContainer}>
          
          <StatusCard 
            statusInfo={statusInfo}
            styles={styles}
          />

          <DriverCard 
            driverInfo={driverInfo}
            onCallDriver={handleCallDriver}
            styles={styles}
          />

          <ServiceInfoCard 
            formData={formData}
            price={price}
            towType={towType}
            styles={styles}
          />

          <ActionButtons 
            driverStatus={driverStatus}
            onCompleteService={handleCompleteService}
            onCancelService={handleCancelService}
            styles={styles}
          />

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
