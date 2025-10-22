import React from 'react';
import { View } from 'react-native';
import { serviciosScreenStyles as styles } from '../styles/serviciosScreenStyle';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getAllServicios } from '../utils/serviciosData';

// Importar componentes modulares
import ServicesHeader from '../components/service/ServicesHeader';
import ServicesList from '../components/service/ServicesList';
import BottomOrderPanel from '../components/service/BottomOrderPanel';

// Importar hook personalizado
import useServiciosActions from '../hooks/useServiciosActions.js';

export default function ServiciosScreen() {
  // Obtener los datos desde utils
  const DATA = getAllServicios();

  // Obtener todas las funciones del hook
  const { handleServicePress, handleOrderPress } = useServiciosActions();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <ServicesHeader styles={styles} />

        <ServicesList data={DATA} onServicePress={handleServicePress} styles={styles} />

        <BottomOrderPanel data={DATA} onOrderPress={handleOrderPress} styles={styles} />
      </View>
    </SafeAreaView>
  );
}
