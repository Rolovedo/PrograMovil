import React from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { actividadScreenStyles as styles } from '../styles/actividadScreenStyle';

//componentes modulares
import ActivityHeader from '../components/activity/ActivityHeader';
import UpcomingServices from '../components/activity/UpcomingServices';
import PastServicesHeader from '../components/activity/PastServicesHeader';
import ServiceHistoryCard from '../components/activity/ServiceHistoryCard';

//hook personalizado
import { useActivityActions } from '../hooks/useActivityActions';

export default function ActividadScreen({navigation}) {
  //obtener todas las funciones del hook
  const {
    handleRequestTow,
    handleRate,
    handleRecharge,
    handleFilter,
    handleServiceDetails,
  } = useActivityActions(navigation);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        
        <ActivityHeader styles={styles} />

        <UpcomingServices 
          onRequestTow={handleRequestTow}
          styles={styles}
        />

        {/*pasado section */}
        <View style={styles.section}>
          <PastServicesHeader 
            onFilter={handleFilter}
            styles={styles}
          />

          <ServiceHistoryCard 
            onRate={handleRate}
            onRecharge={handleRecharge}
            onServiceDetails={handleServiceDetails}
            styles={styles}
          />
        </View>
        
      </ScrollView>
    </SafeAreaView>
  );
}


