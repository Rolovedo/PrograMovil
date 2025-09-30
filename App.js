import { Text, StyleSheet, Pressable, View, Alert } from 'react-native';

// or any files within the Snack
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './pantallas/HomeScreen';
import ServiciosScreen from './pantallas/ServiciosScreen';
import ActividadScreen from './pantallas/ActividadScreen';
import UsuarioScreen from './pantallas/UsuarioScreen';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const Tab = createBottomTabNavigator();

export default function App() {
  
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Inicio"
        screenOptions={({ route }) => ({
          headerShown: false,
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
      
          headerStyle: {
            backgroundColor: '#000',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',   
          },
        })}
      >
        <Tab.Screen name="Inicio" component={HomeScreen} options={{ title: 'Inicio' }} />
        <Tab.Screen name="Servicios" component={ServiciosScreen} options={{ title: 'Servicios' }} />
        <Tab.Screen name="Actividad" component={ActividadScreen} options={{ title: 'Actividad' }} />
        <Tab.Screen name="Usuario" component={UsuarioScreen} options={{ title: 'Usuario' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
