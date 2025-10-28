import { Alert } from 'react-native';
import * as Location from 'expo-location';

export class LocationUtils {
  //solicitar permisos de ubicación
  static async requestLocationPermission() {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      console.log('Estado de permisos:', status);
      
      if (status !== 'granted') {
        Alert.alert('Error', 'Se requieren permisos de ubicación para usar esta función');
        return false;
      }
      return true;
    } catch (error) {
      console.error('Error solicitando permisos:', error);
      return false;
    }
  }

  //geocodificacion inversa
  static async getAddressFromLocation(latitude, longitude) {
    try {
      console.log('Obteniendo dirección para:', { latitude, longitude });
      
      const result = await Location.reverseGeocodeAsync({ latitude, longitude });
      
      if (result && result.length > 0) {
        const address = result[0];
        let formattedAddress = '';
        
        if (address.name) formattedAddress += address.name;
        if (address.street) formattedAddress += `, ${address.street}`;
        if (address.city) formattedAddress += `, ${address.city}`;
        if (address.region) formattedAddress += `, ${address.region}`;
        
        console.log('Dirección obtenida:', formattedAddress);
        return formattedAddress || `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
      }
      return `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
    } catch (error) {
      console.error('Error geocodificación:', error);
      return `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
    }
  }

  //obtener ubicacion actual
  static async getCurrentPosition() {
    try {
      console.log('Obteniendo ubicacion actual...');
      
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
        timeout: 20000,
      });

      const { latitude, longitude } = location.coords;
      return { latitude, longitude };
    } catch (error) {
      console.error('Error obteniendo ubicacion:', error);
      throw error;
    }
  }

  //crear region del mapa
  static createMapRegion(latitude, longitude, zoom = 0.015) {
    return {
      latitude,
      longitude,
      latitudeDelta: zoom,
      longitudeDelta: zoom,
    };
  }
}