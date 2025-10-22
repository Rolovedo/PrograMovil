import React from 'react';
import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';

export default function VehicleTypePicker({ value, onValueChange, styles }) {
  const vehicleTypes = [
    { label: 'Automóvil', value: 'Automóvil' },
    { label: 'Camioneta', value: 'Camioneta' },
    { label: 'Moto', value: 'Moto' },
    { label: 'Camión', value: 'Camión' },
    { label: 'Otro', value: 'Otro' },
  ];

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>Tipo de Vehículo</Text>
      <View style={styles.pickerContainer}>
        <RNPickerSelect
          onValueChange={onValueChange}
          items={vehicleTypes}
          placeholder={{ label: 'Selecciona un tipo...', value: '' }}
          value={value}
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
  );
}