import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
  Dimensions,
  ScrollView,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

export default function TrackTowScreen({ navigation, route }) {
  const { formData, serviceType, towType, urgency, price } = route.params;
  const [driverStatus, setDriverStatus] = useState('searching'); // searching, found, arriving, arrived, completed
  const [estimatedTime, setEstimatedTime] = useState(15);
  const [driverInfo, setDriverInfo] = useState(null);

  useEffect(() => {
    // Simular búsqueda de conductor
    const timer1 = setTimeout(() => {
      setDriverStatus('found');
      setDriverInfo({
        name: 'Juan Pérez',
        rating: 4.8,
        vehicle: 'Toyota Hilux',
        plate: 'ABC123',
        phone: '+56 9 1234 5678'
      });
    }, 3000);

    // Simular conductor en camino
    const timer2 = setTimeout(() => {
      setDriverStatus('arriving');
    }, 8000);

    // Simular conductor llegando
    const timer3 = setTimeout(() => {
      setDriverStatus('arrived');
    }, 15000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const getStatusInfo = () => {
    switch (driverStatus) {
      case 'searching':
        return {
          title: 'Buscando conductor',
          subtitle: 'Estamos buscando el conductor más cercano',
          icon: 'magnify',
          color: '#FF9500',
        };
      case 'found':
        return {
          title: 'Conductor encontrado',
          subtitle: `${driverInfo?.name} está en camino`,
          icon: 'check-circle',
          color: '#34C759',
        };
      case 'arriving':
        return {
          title: 'Conductor en camino',
          subtitle: `Llegará en aproximadamente ${estimatedTime} minutos`,
          icon: 'truck-delivery',
          color: '#007AFF',
        };
      case 'arrived':
        return {
          title: 'Conductor llegó',
          subtitle: 'El conductor está en tu ubicación',
          icon: 'map-marker-check',
          color: '#34C759',
        };
      default:
        return {
          title: 'Buscando conductor',
          subtitle: 'Estamos buscando el conductor más cercano',
          icon: 'magnify',
          color: '#FF9500',
        };
    }
  };

  const statusInfo = getStatusInfo();

  const handleCallDriver = () => {
    Alert.alert(
      'Llamar al conductor',
      `¿Deseas llamar a ${driverInfo?.name}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Llamar', onPress: () => console.log('Llamando al conductor...') }
      ]
    );
  };

  const handleCancelService = () => {
    Alert.alert(
      'Cancelar servicio',
      '¿Estás seguro de que quieres cancelar este servicio?',
      [
        { text: 'No', style: 'cancel' },
        { 
          text: 'Sí', 
          onPress: () => navigation.navigate('HomeMain')
        }
      ]
    );
  };

  const handleCompleteService = () => {
    navigation.navigate('TowCompletedScreen', {
      formData,
      serviceType,
      towType,
      urgency,
      price,
      driverInfo
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Seguimiento</Text>
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={handleCallDriver}
          disabled={!driverInfo}
        >
          <MaterialCommunityIcons 
            name="phone" 
            size={24} 
            color={driverInfo ? "white" : "#333"} 
          />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Mapa simulado */}
        <View style={styles.mapContainer}>
          <View style={styles.mapPlaceholder}>
            <MaterialCommunityIcons name="map" size={80} color="#333" />
            <Text style={styles.mapText}>Mapa en tiempo real</Text>
            <Text style={styles.mapSubtext}>Ubicación del conductor</Text>
          </View>
          
          {/* Puntos en el mapa */}
          <View style={styles.originPoint}>
            <MaterialCommunityIcons name="map-marker" size={30} color="#34C759" />
          </View>
          
          <View style={styles.destinationPoint}>
            <MaterialCommunityIcons name="flag" size={30} color="#FF3B30" />
          </View>
          
          {driverStatus !== 'searching' && (
            <View style={styles.driverPoint}>
              <MaterialCommunityIcons name="truck" size={30} color="#007AFF" />
            </View>
          )}
        </View>

        {/* Información del estado */}
        <View style={styles.statusContainer}>
          <View style={[styles.statusCard, { borderLeftColor: statusInfo.color }]}>
            <View style={styles.statusHeader}>
              <MaterialCommunityIcons 
                name={statusInfo.icon} 
                size={24} 
                color={statusInfo.color} 
              />
              <Text style={styles.statusTitle}>{statusInfo.title}</Text>
            </View>
            <Text style={styles.statusSubtitle}>{statusInfo.subtitle}</Text>
          </View>

          {/* Información del conductor */}
          {driverInfo && (
            <View style={styles.driverCard}>
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
              <TouchableOpacity 
                style={styles.callButton}
                onPress={handleCallDriver}
              >
                <MaterialCommunityIcons name="phone" size={20} color="white" />
              </TouchableOpacity>
            </View>
          )}

          {/* Información del servicio */}
          <View style={styles.serviceInfoCard}>
            <Text style={styles.serviceInfoTitle}>Detalles del Servicio</Text>
            <View style={styles.serviceDetails}>
              <Text style={styles.serviceDetailText}>Origen: {formData.origen}</Text>
              <Text style={styles.serviceDetailText}>Destino: {formData.destino}</Text>
              <Text style={styles.serviceDetailText}>Precio: ${price.toLocaleString()}</Text>
              <Text style={styles.serviceDetailText}>Tipo: {towType}</Text>
            </View>
          </View>

          {/* Botones de acción */}
          <View style={styles.actionButtons}>
            {driverStatus === 'arrived' && (
              <TouchableOpacity 
                style={styles.completeButton}
                onPress={handleCompleteService}
                activeOpacity={0.8}
              >
                <MaterialCommunityIcons name="check" size={20} color="white" />
                <Text style={styles.completeButtonText}>Servicio Completado</Text>
              </TouchableOpacity>
            )}
            
            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={handleCancelService}
              activeOpacity={0.8}
            >
              <MaterialCommunityIcons name="close" size={20} color="white" />
              <Text style={styles.cancelButtonText}>Cancelar Servicio</Text>
            </TouchableOpacity>
          </View>
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
  menuButton: {
    padding: 5,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  mapContainer: {
    height: height * 0.35,
    backgroundColor: '#111',
    position: 'relative',
    margin: 20,
    borderRadius: 15,
  },
  mapPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapText: {
    color: '#666',
    fontSize: 16,
    marginTop: 10,
  },
  mapSubtext: {
    color: '#444',
    fontSize: 12,
    marginTop: 5,
  },
  originPoint: {
    position: 'absolute',
    top: 50,
    left: 50,
  },
  destinationPoint: {
    position: 'absolute',
    bottom: 50,
    right: 50,
  },
  driverPoint: {
    position: 'absolute',
    top: 100,
    left: width * 0.3,
  },
  statusContainer: {
    padding: 20,
  },
  statusCard: {
    backgroundColor: '#111',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    borderLeftWidth: 4,
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  statusSubtitle: {
    color: '#888',
    fontSize: 14,
  },
  driverCard: {
    backgroundColor: '#111',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
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
  callButton: {
    backgroundColor: '#34C759',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  serviceInfoCard: {
    backgroundColor: '#111',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
  },
  serviceInfoTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  serviceDetails: {
    gap: 5,
  },
  serviceDetailText: {
    color: '#888',
    fontSize: 14,
  },
  actionButtons: {
    gap: 10,
  },
  completeButton: {
    backgroundColor: '#34C759',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    gap: 8,
  },
  completeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#FF3B30',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    gap: 8,
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
