import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Importar pantallas
import AvailableTripsScreen from '../pantallas/AvailableTripsScreen';
import ActiveTripScreen from '../pantallas/ActiveTripScreen';
import UsuarioScreen from '../pantallas/UsuarioScreen';

const Tab = createBottomTabNavigator();

export default function DriverTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#2a9d8f',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
      }}
    >
      <Tab.Screen
        name="AvailableTrips"
        component={AvailableTripsScreen}
        options={{
          title: 'Disponibles',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="map-search" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="ActiveTrip"
        component={ActiveTripScreen}
        options={{
          title: 'Servicio Activo',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="truck-fast" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="DriverProfile"
        component={UsuarioScreen}
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
