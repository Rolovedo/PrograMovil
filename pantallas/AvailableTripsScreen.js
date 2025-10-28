import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTowService } from '../hooks/useTowService';
import { styles } from '../styles/availableTripsStyles';

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
