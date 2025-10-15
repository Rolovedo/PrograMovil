import { Text, StyleSheet, Pressable, View, Alert } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './pantallas/HomeScreen';
import ServiciosScreen from './pantallas/ServiciosScreen';
import ActividadScreen from './pantallas/ActividadScreen';
import UsuarioScreen from './pantallas/UsuarioScreen';
import RequestTowScreen from './pantallas/RequestTowScreen';
import TowDetailsScreen from './pantallas/TowDetailsScreen';
import ConfirmRequestScreen from './pantallas/ConfirmRequestScreen';
import TrackTowScreen from './pantallas/TrackTowScreen';
import TowCompletedScreen from './pantallas/TowCompletedScreen';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Importar el contexto
import { AppProvider } from './context/AppContext';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

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

function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Inicio"
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
          tabBarStyle: {
            backgroundColor: '#000',
            borderTopWidth: 0,
          },
          tabBarActiveTintColor: '#fff',
          tabBarInactiveTintColor: '#888',
          headerShown: false,
        })}
      >
        <Tab.Screen name="Inicio" component={HomeStack} options={{ title: 'Inicio' }} />
        <Tab.Screen name="Servicios" component={ServiciosScreen} options={{ title: 'Servicios' }} />
        <Tab.Screen name="Actividad" component={ActividadScreen} options={{ title: 'Actividad' }} />
        <Tab.Screen name="Usuario" component={UsuarioScreen} options={{ title: 'Usuario' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppNavigator />
    </AppProvider>
  );
}
