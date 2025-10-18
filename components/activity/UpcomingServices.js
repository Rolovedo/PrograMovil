import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useAppContext } from '../../context/AppContext';

export default function UpcomingServices({ onRequestTow, styles }) {
  const { user, isLoading, selectedService } = useAppContext();

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Próximos servicios de grúa</Text>
      
      <View style={styles.noServicesCard}>
        <TouchableOpacity 
          style={[
            styles.requestButton,
            { opacity: isLoading ? 0.7 : 1 }
          ]}
          onPress={onRequestTow}
          activeOpacity={0.8}
          disabled={isLoading}
        >
          <View style={styles.noServicesContent}>
            <View style={styles.noServicesText}>
              <Text style={styles.noServicesTitle}>
                {isLoading 
                  ? 'Procesando solicitud...'
                  : user.isAuthenticated
                    ? `¡Hola ${user.name}! No tienes servicios\nde grúa pendientes`
                    : 'No tienes servicios de\ngrúa pendientes'
                }
              </Text>
              <Text style={[
                styles.requestButtonText,
                { color: isLoading ? '#000000ff' : '#000000ff' }
              ]}>
                {isLoading ? 'Cargando...' : 'Pide tu grúa ya'}
              </Text>
              
              {/* Mostrar servicio seleccionado si existe */}
              {selectedService && !isLoading && (
                <Text style={styles.selectedServiceHint}>
                  Último servicio: {selectedService.name}
                </Text>
              )}
            </View>
            <View style={styles.noServicesIcon}>
              <Image
                source={require('../../assets/calendario.png')}
                style={{ width: 80, height: 80, resizeMode: 'contain' }}
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}