import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
  ScrollView,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TowCompletedScreen({ navigation, route }) {
  const { formData, serviceType, towType, urgency, price, driverInfo } = route.params;

  const handleRateService = () => {
    Alert.alert(
      'Calificar Servicio',
      '¿Cómo calificarías el servicio?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: '😭 Muy malo', onPress: () => console.log('Calificación: 1 estrella') },
        { text: '😪😪 Regulinguis', onPress: () => console.log('Calificación: 2 estrellas') },
        { text: '😒😒😒 Meh', onPress: () => console.log('Calificación: 3 estrellas') },
        { text: '😊😊😊😊 Tabien', onPress: () => console.log('Calificación: 4 estrellas') },
        { text: '⭐⭐⭐⭐⭐ La Cabra', onPress: () => console.log('Calificación: 5 estrellas') },
      ]
    );
  };

  const handleNewService = () => {
    navigation.navigate('HomeMain');
  };

  const handleViewHistory = () => {
    navigation.navigate('Actividad');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.navigate('HomeMain')}
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Servicio Completado</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Icono de éxito */}
        <View style={styles.successIcon}>
          <MaterialCommunityIcons name="check-circle" size={80} color="#34C759" />
        </View>

        <Text style={styles.successTitle}>¡Servicio Completado!</Text>
        <Text style={styles.successSubtitle}>
          Tu servicio de grúa ha sido completado exitosamente
        </Text>

        {/* Resumen del servicio completado */}
        <View style={styles.summaryCard}>
          <Text style={styles.cardTitle}>Resumen del Servicio</Text>
          
          <View style={styles.summaryInfo}>
            <View style={styles.infoRow}>
              <MaterialCommunityIcons name="truck" size={20} color="#007AFF" />
              <Text style={styles.infoLabel}>Tipo:</Text>
              <Text style={styles.infoValue}>{towType}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <MaterialCommunityIcons name="map-marker" size={20} color="#007AFF" />
              <Text style={styles.infoLabel}>Origen:</Text>
              <Text style={styles.infoValue}>{formData.origen}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <MaterialCommunityIcons name="flag" size={20} color="#007AFF" />
              <Text style={styles.infoLabel}>Destino:</Text>
              <Text style={styles.infoValue}>{formData.destino}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <MaterialCommunityIcons name="currency-usd" size={20} color="#007AFF" />
              <Text style={styles.infoLabel}>Precio:</Text>
              <Text style={styles.infoValue}>${price.toLocaleString()}</Text>
            </View>
          </View>
        </View>

        {/* Información del conductor */}
        {driverInfo && (
          <View style={styles.driverCard}>
            <Text style={styles.driverCardTitle}>Conductor</Text>
            <View style={styles.driverInfo}>
              <View style={styles.driverAvatar}>
                <MaterialCommunityIcons name="account" size={30} color="white" />
              </View>
              <View style={styles.driverDetails}>
                <Text style={styles.driverName}>{driverInfo.name}</Text>
                <Text style={styles.driverRating}>⭐ {driverInfo.rating}</Text>
                <Text style={styles.driverVehicle}>{driverInfo.vehicle} - {driverInfo.plate}</Text>
              </View>
            </View>
          </View>
        )}

        {/* Botones de acción */}
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={styles.rateButton}
            onPress={handleRateService}
            activeOpacity={0.8}
          >
            <MaterialCommunityIcons name="star" size={20} color="white" />
            <Text style={styles.rateButtonText}>Calificar Servicio</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.historyButton}
            onPress={handleViewHistory}
            activeOpacity={0.8}
          >
            <MaterialCommunityIcons name="history" size={20} color="white" />
            <Text style={styles.historyButtonText}>Ver Historial</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.newServiceButton}
            onPress={handleNewService}
            activeOpacity={0.8}
          >
            <MaterialCommunityIcons name="plus" size={20} color="white" />
            <Text style={styles.newServiceButtonText}>Nuevo Servicio</Text>
          </TouchableOpacity>
        </View>

        {/* Mensaje de agradecimiento */}
        <View style={styles.thanksCard}>
          <Text style={styles.thanksText}>
            ¡Gracias por usar nuestros servicios!{'\n'}
            Esperamos verte pronto.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  placeholder: {
    width: 34,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    alignItems: 'center',
  },
  successIcon: {
    marginTop: 20,
    marginBottom: 20,
  },
  successTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  successSubtitle: {
    color: '#888',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
  },
  summaryCard: {
    backgroundColor: '#111',
    borderRadius: 15,
    padding: 20,
    width: '100%',
    marginBottom: 20,
  },
  cardTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  summaryInfo: {
    gap: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  infoLabel: {
    color: '#888',
    fontSize: 14,
    minWidth: 60,
  },
  infoValue: {
    color: 'white',
    fontSize: 14,
    flex: 1,
  },
  driverCard: {
    backgroundColor: '#111',
    borderRadius: 15,
    padding: 20,
    width: '100%',
    marginBottom: 20,
  },
  driverCardTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  driverAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  driverDetails: {
    flex: 1,
  },
  driverName: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  driverRating: {
    color: '#FFD700',
    fontSize: 14,
    marginTop: 2,
  },
  driverVehicle: {
    color: '#888',
    fontSize: 12,
    marginTop: 2,
  },
  actionButtons: {
    width: '100%',
    gap: 15,
    marginBottom: 20,
  },
  rateButton: {
    backgroundColor: '#FFD700',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    gap: 8,
  },
  rateButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  historyButton: {
    backgroundColor: '#007AFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    gap: 8,
  },
  historyButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  newServiceButton: {
    backgroundColor: '#34C759',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    gap: 8,
  },
  newServiceButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  thanksCard: {
    backgroundColor: '#111',
    borderRadius: 15,
    padding: 20,
    width: '100%',
  },
  thanksText: {
    color: '#888',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
});
