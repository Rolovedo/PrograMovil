import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function DriverCard({ driverInfo, onCallDriver, styles }) {
  if (!driverInfo) return null;

  return (
    <View style={styles.driverCard}>
      <View style={styles.driverInfo}>
        <View style={styles.driverAvatar}>
          <MaterialCommunityIcons name="account" size={30} color="white" />
        </View>
        <View style={styles.driverDetails}>
          <Text style={styles.driverName}>{driverInfo.name}</Text>
          <Text style={styles.driverRating}>⭐ {driverInfo.rating}</Text>
          <Text style={styles.driverVehicle}>{driverInfo.vehicle} - {driverInfo.plate}</Text>
        </View>
      </View>
      <TouchableOpacity 
        style={styles.callButton}
        onPress={onCallDriver}
      >
        <MaterialCommunityIcons name="phone" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
}