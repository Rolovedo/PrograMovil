import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTowService } from '../hooks/useTowService';

export default function AvailableTripsScreen() {
  const { getRequestsByStatus, loading } = useTowService();
  const [trips, setTrips] = React.useState([]);

  React.useEffect(() => {
    loadAvailableTrips();
  }, []);

  const loadAvailableTrips = async () => {
    try {
      const pendingTrips = await getRequestsByStatus('pending');
      setTrips(pendingTrips || []);
    } catch (error) {
      console.error('Error cargando viajes:', error);
    }
  };

  const renderTrip = ({ item }) => (
    <TouchableOpacity style={styles.tripCard}>
      <View style={styles.tripHeader}>
        <Text style={styles.serviceType}>{item.service_type}</Text>
        <Text style={styles.price}>${item.price}</Text>
      </View>

      <View style={styles.locationInfo}>
        <Text style={styles.locationText}>Desde: {item.origin}</Text>
        <Text style={styles.locationText}>Hasta: {item.destination}</Text>
      </View>

      <View style={styles.tripFooter}>
        <Text style={styles.urgencyLabel}>
          {item.urgency === 'urgent' ? '🚨 Urgente' : '🚗 Normal'}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Servicios Disponibles</Text>
      </View>

      <FlatList
        data={trips}
        renderItem={renderTrip}
        keyExtractor={(item) => item.id.toString()}
        refreshing={loading}
        onRefresh={loadAvailableTrips}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  listContent: {
    padding: 16,
  },
  tripCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tripHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  serviceType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2a9d8f',
  },
  locationInfo: {
    marginBottom: 12,
  },
  locationText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  tripFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  urgencyLabel: {
    fontSize: 14,
    color: '#666',
  },
});
