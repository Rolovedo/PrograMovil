import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView,
  Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { actividadScreenStyles as styles } from '../styles/actividadScreenStyle';

export default function ActividadScreen() {
  const handleRequestTow = () => {
    console.log('Pide tu grúa ya presionado');
    // Navegación para pedir grúa
  };

  const handleRate = () => {
    console.log('Puntúa presionado');
    // Navegación para puntuar
  };

  const handleRecharge = () => {
    console.log('Recargar presionado');
    // Navegación para recargar
  };

  const handleFilter = () => {
    console.log('Filtro presionado');
    // Funcionalidad de filtro
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Actividad</Text>
        </View>

        {/* Próximos servicios section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Próximos servicios de grúa</Text>
          
          <View style={styles.noServicesCard}>
              <TouchableOpacity 
                style={styles.requestButton}
                onPress={handleRequestTow}
                activeOpacity={0.8}
              >
                <View style={styles.noServicesContent}>
                  <View style={styles.noServicesText}>
                    <Text style={styles.noServicesTitle}>
                      No tienes servicios de{'\n'}grúa pendientes
                    </Text>
                      <Text style={styles.requestButtonText}>Pide tu grúa ya</Text>
                  </View>
                  <View style={styles.noServicesIcon}>
                    <Image
                      source={require('../assets/calendario.png')}
                      style={{ width: 80, height: 80, resizeMode: 'contain' }}
                    />
                  </View>
                </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Pasado section */}
        <View style={styles.section}>
          <View style={styles.pastHeader}>
            <Text style={styles.sectionTitle}>Pasado</Text>
            <TouchableOpacity 
              style={styles.filterButton}
              onPress={handleFilter}
              activeOpacity={0.7}
            >
              <MaterialCommunityIcons name="tune" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Past service card */}
          <View style={styles.serviceCard}>
            {/* Map placeholder */}
            <View style={styles.mapContainer}>
              <Image 
                source={require('../assets/map.png')} 
                style={styles.mapImage}
              />
            </View>

            {/* Service info */}
            <View style={styles.serviceInfo}>
              <Text style={styles.serviceLocation}>Poblado 2 Mz 10 casa 5</Text>
              <Text style={styles.serviceDateTime}>12Nov | 11:36AM</Text>
              <Text style={styles.servicePrice}>$70.000</Text>
            </View>

            {/* Action buttons */}
            <View style={styles.serviceActions}>
              <TouchableOpacity 
                style={styles.rateButton}
                onPress={handleRate}
                activeOpacity={0.8}
              >
                <MaterialCommunityIcons name="star-outline" size={20} color="#fff" />
                <Text style={styles.actionButtonText}>Puntúa</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.rechargeButton}
                onPress={handleRecharge}
                activeOpacity={0.8}
              >
                <MaterialCommunityIcons name="refresh" size={20} color="#fff" />
                <Text style={styles.actionButtonText}>Recargar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


