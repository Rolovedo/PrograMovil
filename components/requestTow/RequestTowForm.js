import React from 'react';
import { View, Text } from 'react-native';
import TextFieldInput from './TextFieldInput';
import ContinueButton from './ContinueButton';

export default function RequestTowForm({ 
  formData, 
  onInputChange, 
  onContinue, 
  styles 
}) {
  return (
    <View style={styles.formContainer}>
      <Text style={styles.formTitle}>Datos del Servicio</Text>

      <TextFieldInput
        label="Origen *"
        value={formData.origen}
        onChangeText={(value) => onInputChange('origen', value)}
        placeholder="Dirección de origen"
        styles={styles}
      />

      <TextFieldInput
        label="Destino *"
        value={formData.destino}
        onChangeText={(value) => onInputChange('destino', value)}
        placeholder="Dirección de destino"
        styles={styles}
      />

      <TextFieldInput
        label="Teléfono *"
        value={formData.telefono}
        onChangeText={(value) => onInputChange('telefono', value)}
        placeholder="Número de teléfono"
        keyboardType="phone-pad"
        styles={styles}
      />

      <VehicleTypePicker
        value={formData.tipoVehiculo}
        onValueChange={(value) => onInputChange('tipoVehiculo', value)}
        styles={styles}
      />

      <TextFieldInput
        label="Observaciones"
        value={formData.observaciones}
        onChangeText={(value) => onInputChange('observaciones', value)}
        placeholder="Información adicional..."
        multiline={true}
        numberOfLines={3}
        styles={styles}
      />

      <ContinueButton 
        onPress={onContinue}
        styles={styles}
      />
    </View>
  );
}