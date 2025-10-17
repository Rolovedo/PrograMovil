import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Importar pantallas
import HomeScreen from '../pantallas/HomeScreen';
import RequestTowScreen from '../pantallas/RequestTowScreen';
import TowDetailsScreen from '../pantallas/TowDetailsScreen';
import ConfirmRequestScreen from '../pantallas/ConfirmRequestScreen';
import TrackTowScreen from '../pantallas/TrackTowScreen';
import TowCompletedScreen from '../pantallas/TowCompletedScreen';
import UsuarioScreen from '../pantallas/UsuarioScreen';
import ServiciosScreen from '../pantallas/ServiciosScreen';
import ActividadScreen from '../pantallas/ActividadScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stack para la pestaña Home
function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="RequestTowScreen" component={RequestTowScreen} />
      <Stack.Screen name="TowDetailsScreen" component={TowDetailsScreen} />
      <Stack.Screen name="ConfirmRequestScreen" component={ConfirmRequestScreen} />
      <Stack.Screen name="TrackTowScreen" component={TrackTowScreen} />
      <Stack.Screen name="TowCompletedScreen" component={TowCompletedScreen} />
    </Stack.Navigator>
  );
}

// Navegador principal con tabs
export default function AppStack() {
  return (
    <Tab.Navigator 
      initialRouteName="Inicio"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Inicio') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Servicios') {
            iconName = focused ? 'tow-truck' : 'tow-truck';
          } else if (route.name === 'Actividad') {
            iconName = focused ? 'history' : 'history';
          } else if (route.name === 'Usuario') {
            iconName = focused ? 'account' : 'account-outline';
          }

          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FF6B35',
        tabBarInactiveTintColor: '#666666',
        tabBarStyle: {
          backgroundColor: '#1A1A1A',
          borderTopColor: '#333333',
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 5,
          paddingTop: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
        },
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="Inicio" 
        component={HomeStack} 
        options={{ title: 'Inicio' }} 
      />
      <Tab.Screen 
        name="Servicios" 
        component={ServiciosScreen} 
        options={{ title: 'Servicios' }} 
      />
      <Tab.Screen 
        name="Actividad" 
        component={ActividadScreen} 
        options={{ title: 'Actividad' }} 
      />
      <Tab.Screen 
        name="Usuario" 
        component={UsuarioScreen} 
        options={{ title: 'Usuario' }} 
      />
    </Tab.Navigator>
  );
}
