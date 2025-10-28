import React from 'react';
import { View, StatusBar, Text, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { locationSelectorScreenStyles as styles } from '../styles/locationSelectorScreenStyle';

//componentes modulares
import LocationHeader from '../components/locationSelector/LocationHeader';
import RealMapView from '../components/locationSelector/RealMapView';
import LocationInfoCard from '../components/locationSelector/LocationInfoCard';
import ContinueButton from '../components/locationSelector/ContinueButton';

//hook personalizado
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
    handleRouteCalculated,
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
      
      {/*header fijo en la parte superior*/}
      <View style={styles.header}>
        <LocationHeader 
          onGoBack={handleGoBack}
          styles={styles}
        />
      </View>

      {loading ? (
        /*loading screen */
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Obteniendo tu ubicación...</Text>
          <Text style={{ color: '#666', fontSize: 12, marginTop: 5 }}>
            Asegúrate de tener el GPS activado
          </Text>
        </View>
      ) : (
        <>
          {/*area del mapa*/}
          <View style={styles.mapArea}>
            <RealMapView
              mapRegion={mapRegion}
              currentLocation={currentLocation}
              destinationLocation={destinationLocation}
              onMapPress={handleMapPress}
              onRouteCalculated={handleRouteCalculated}
              loading={false}
              styles={styles}
            />
          </View>

          {/*panel inferior fijo*/}
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