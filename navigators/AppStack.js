import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Platform } from 'react-native';

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
import SettingsScreen from '../pantallas/SettingsScreen';

// ✅ AGREGAR: Importar LocationSelectorScreen
import LocationSelectorScreen from '../pantallas/LocationSelectorScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stack para la pestaña Home
function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="RequestTowScreen" component={RequestTowScreen} />
      <Stack.Screen name="LocationSelectorScreen" component={LocationSelectorScreen} />
      <Stack.Screen name="TowDetailsScreen" component={TowDetailsScreen} />
      <Stack.Screen name="ConfirmRequestScreen" component={ConfirmRequestScreen} />
      <Stack.Screen name="TrackTowScreen" component={TrackTowScreen} />
      <Stack.Screen name="TowCompletedScreen" component={TowCompletedScreen} />
    </Stack.Navigator>
  );
}

// Stack de Servicios
function ServiciosStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ServiciosMain" component={ServiciosScreen} />
    </Stack.Navigator>
  );
}

// Stack de Actividad
function ActividadStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ActividadMain" component={ActividadScreen} />
    </Stack.Navigator>
  );
}

// Stack de Usuario
function UsuarioStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="UsuarioMain" component={UsuarioScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
}

// Navegador principal con tabs
export default function AppStack() {
  const insets = useSafeAreaInsets();
  
  // ✅ Calcular altura total de la barra de navegación
  const tabBarHeight = Platform.OS === 'android' ? 60 + insets.bottom + 5 : 65;

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
        tabBarActiveTintColor: '#ffffffff',
        tabBarInactiveTintColor: '#666666',
        tabBarStyle: {
          backgroundColor: '#1A1A1A',
          borderTopColor: '#333333',
          borderTopWidth: 1,
          height: tabBarHeight,
          paddingBottom: Platform.OS === 'android' ? insets.bottom + 5 : 5,
          paddingTop: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
          marginBottom: Platform.OS === 'android' ? 2 : 0,
        },
        headerShown: false,
        contentStyle: {
          paddingBottom: 0, 
        },
      })}
    >
      <Tab.Screen 
        name="Inicio" 
        component={HomeStack} 
        options={{ title: 'Inicio' }} 
      />
      <Tab.Screen 
        name="Servicios" 
        component={ServiciosStack} 
        options={{ title: 'Servicios' }} 
      />
      <Tab.Screen 
        name="Actividad" 
        component={ActividadStack} 
        options={{ title: 'Actividad' }} 
      />
      <Tab.Screen 
        name="Usuario" 
        component={UsuarioStack} 
        options={{ title: 'Usuario' }} 
      />
    </Tab.Navigator>
  );
}
