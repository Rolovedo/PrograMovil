import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  StatusBar,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import RNPickerSelect from 'react-native-picker-select';

export default function RequestTowScreen({ navigation, route }) {
  const { serviceType = 'Servicio de Grúa' } = route.params || {};

  const [formData, setFormData] = useState({
    origen: '',
    destino: '',
    telefono: '',
    tipoVehiculo: '',
    observaciones: '',
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleContinue = () => {
    if (!formData.origen || !formData.destino || !formData.telefono) {
      Alert.alert('Error', 'Por favor completa todos los campos obligatorios');
      return;
    }

    navigation.navigate('TowDetailsScreen', {
      formData,
      serviceType,
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
        <Text style={styles.headerTitle}>{serviceType}</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Datos del Servicio</Text>

          {/* Campo Origen */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Origen *</Text>
            <TextInput
              style={styles.input}
              placeholder="Dirección de origen"
              placeholderTextColor="#666"
              value={formData.origen}
              onChangeText={(value) => handleInputChange('origen', value)}
            />
          </View>

          {/* Campo Destino */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Destino *</Text>
            <TextInput
              style={styles.input}
              placeholder="Dirección de destino"
              placeholderTextColor="#666"
              value={formData.destino}
              onChangeText={(value) => handleInputChange('destino', value)}
            />
          </View>

          {/* Campo Teléfono */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Teléfono *</Text>
            <TextInput
              style={styles.input}
              placeholder="Número de teléfono"
              placeholderTextColor="#666"
              value={formData.telefono}
              onChangeText={(value) => handleInputChange('telefono', value)}
              keyboardType="phone-pad"
            />
          </View>

          {/* Campo Tipo de Vehículo */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Tipo de Vehículo</Text>
            <View style={styles.pickerContainer}>
              <RNPickerSelect
                onValueChange={(value) => handleInputChange('tipoVehiculo', value)}
                items={[
                  { label: 'Automóvil', value: 'Automóvil' },
                  { label: 'Camioneta', value: 'Camioneta' },
                  { label: 'Moto', value: 'Moto' },
                  { label: 'Camión', value: 'Camión' },
                  { label: 'Otro', value: 'Otro' },
                ]}
                placeholder={{ label: 'Selecciona un tipo...', value: '' }}
                value={formData.tipoVehiculo}
                style={{
                  inputAndroid: styles.pickerInput,
                  inputIOS: styles.pickerInput,
                  iconContainer: { top: 15, right: 15 },
                  placeholder: { color: '#888' },
                }}
                Icon={() => (
                  <MaterialCommunityIcons
                    name="chevron-down"
                    size={22}
                    color="#aaa"
                  />
                )}
                useNativeAndroidPickerStyle={false}
              />
            </View>
          </View>
          {/* Campo Observaciones */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Observaciones</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Información adicional..."
              placeholderTextColor="#666"
              value={formData.observaciones}
              onChangeText={(value) => handleInputChange('observaciones', value)}
              multiline
              numberOfLines={3}
            />
          </View>

          {/* Botón Continuar */}
          <TouchableOpacity
            style={styles.continueButton}
            onPress={handleContinue}
            activeOpacity={0.8}
          >
            <Text style={styles.continueButtonText}>Continuar</Text>
            <MaterialCommunityIcons name="chevron-right" size={24} color="white" />
          </TouchableOpacity>
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
  },
  formContainer: {
    backgroundColor: '#111',
    borderRadius: 15,
    padding: 20,
  },
  formTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#222',
    borderRadius: 10,
    padding: 15,
    color: 'white',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  pickerInput: {
    backgroundColor: '#222',
    color: 'white',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#333',
    fontSize: 16,
  },
  continueButton: {
    backgroundColor: '#007AFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  continueButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  pickerContainer: {
    backgroundColor: '#222',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#333',
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  
  pickerInput: {
    color: 'white',
    fontSize: 16,
    paddingVertical: 12,
    paddingRight: 30, // espacio para el ícono
  },
  
});
