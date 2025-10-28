import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { locationSelectorScreenStyles as styles } from '../../styles/locationSelectorScreenStyle';

export default function RouteInfo({ 
  destinationLocation, 
  calculatingRoute, 
  routeInfo 
}) {
  if (!destinationLocation) return null;

  //estilo de contenedor segun estado
  const getContainerStyle = () => {
    const baseStyle = [styles.routeInfoContainer];
    
    if (calculatingRoute) {
      baseStyle.push(styles.routeInfoCalculating);
    } else if (routeInfo) {
      baseStyle.push(styles.routeInfoReady);
    } else {
      baseStyle.push(styles.routeInfoError);
    }
    
    return baseStyle;
  };

  //color de texto segun el provider
  const getProviderStyle = () => {
    if (!routeInfo) return styles.routeProviderError;
    if (routeInfo.provider === 'Estimado') return styles.routeProviderEstimated;
    return styles.routeProviderReal;
  };

  return (
    <View style={getContainerStyle()}>
      
      {calculatingRoute ? (
        //estado de calculo
        <View style={styles.routeCalculatingRow}>
          <ActivityIndicator 
            size="small" 
            color="#FFA500" 
            style={styles.routeLoadingIndicator}
          />
          <Text style={styles.routeCalculatingText}>
            Calculando mejor ruta...
          </Text>
        </View>
      ) : (
        //ruta calculada
        <View>
          {/*header de ruta */}
          <View style={styles.routeHeader}>
            <MaterialCommunityIcons 
              name="map-marker-path" 
              size={18} 
              color="#34C759"
              style={styles.routeStatusIcon}
            />
            <Text style={styles.routeHeaderText}>
              Ruta {routeInfo?.provider}
            </Text>
          </View>
          
          {/*informacion detallada */}
          {routeInfo && (
            <View style={styles.routeDetailsContainer}>
              
              {/*distancia */}
              <View style={styles.routeInfoItem}>
                <Text style={styles.routeInfoLabel}>
                  Distancia
                </Text>
                <Text style={styles.routeInfoValue}>
                  {routeInfo.distance.toFixed(1)} km
                </Text>
              </View>
              
              {/*tiempo estimado */}
              <View style={styles.routeInfoItem}>
                <Text style={styles.routeInfoLabel}>
                  Tiempo est.
                </Text>
                <Text style={styles.routeInfoValue}>
                  {Math.round(routeInfo.duration)} min
                </Text>
              </View>
              
              {/*precision*/}
              <View style={styles.routeInfoItem}>
                <Text style={styles.routeInfoLabel}>
                  Precision
                </Text>
                <Text style={[styles.routeInfoValue, getProviderStyle()]}>
                  {routeInfo.provider === 'Estimado' ? 'Aprox.' : 'Real'}
                </Text>
              </View>
              
            </View>
          )}
        </View>
      )}
    </View>
  );
}