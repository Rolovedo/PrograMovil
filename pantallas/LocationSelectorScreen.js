// pantallas/LocationSelectorScreen.js
import React from 'react';
import { View, StatusBar, Text, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { locationSelectorScreenStyles as styles } from '../styles/locationSelectorScreenStyle';

// Importar componentes modulares
import LocationHeader from '../components/locationSelector/LocationHeader';
import RealMapView from '../components/locationSelector/RealMapView';
import LocationInfoCard from '../components/locationSelector/LocationInfoCard';
import ContinueButton from '../components/locationSelector/ContinueButton';

// Importar hook personalizado
import { useLocationSelector } from '../hooks/useLocationSelector';

export default function LocationSelectorScreen({ navigation, route }) {
  const {
    serviceType,
    locationData,
    currentLocation,
    destinationLocation,
    mapRegion,
    loading,
    handleMapPress,
    handleGoBack,
    handleContinue,
    handleRouteCalculated, // ✅ Nueva función
    formatPrice,
    canContinue,
  } = useLocationSelector(navigation, route);

  console.log('LocationSelectorScreen render:', {
    serviceType,
    hasLocationData: !!locationData,
    hasCurrentLocation: !!currentLocation,
    hasMapRegion: !!mapRegion,
    loading,
    canContinue
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      
      {/* Header fijo en la parte superior */}
      <View style={styles.header}>
        <LocationHeader 
          onGoBack={handleGoBack}
          styles={styles}
        />
      </View>

      {loading ? (
        /* Loading screen */
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Obteniendo tu ubicación...</Text>
          <Text style={{ color: '#666', fontSize: 12, marginTop: 5 }}>
            Asegúrate de tener el GPS activado
          </Text>
        </View>
      ) : (
        <>
          {/* Área del mapa - ocupa todo el espacio disponible */}
          <View style={styles.mapArea}>
            <RealMapView
              mapRegion={mapRegion}
              currentLocation={currentLocation}
              destinationLocation={destinationLocation}
              onMapPress={handleMapPress}
              onRouteCalculated={handleRouteCalculated} // ✅ Pasar función
              loading={false}
              styles={styles}
            />
          </View>

          {/* Panel inferior fijo */}
          <View style={styles.bottomPanel}>
            <LocationInfoCard 
              locationData={locationData}
              formatPrice={formatPrice}
              styles={styles}
            />

            <ContinueButton 
              onContinue={handleContinue}
              canContinue={canContinue}
              styles={styles}
            />
          </View>
        </>
      )}
    </View>
  );
}