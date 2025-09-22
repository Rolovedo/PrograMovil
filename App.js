import { Text, StyleSheet, Pressable, View, Alert } from 'react-native';

// or any files within the Snack
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainScreen from './pantallas/MainScreen';
import SettingsScreen from './pantallas/SettingsScreen';
import CounterScreen from './pantallas/CounterScreen';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const Tab = createBottomTabNavigator();

export default function App() {
  
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'account' : 'account-outline';
            } else if (route.name === 'Counter') {
              iconName = focused ? 'counter' : 'counter';
            }
            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={MainScreen} options={{ title: 'Inicio' }} />
        <Tab.Screen name="Profile" component={SettingsScreen} options={{ title: 'Perfil' }} />
        <Tab.Screen name="Counter" component={CounterScreen} options={{ title: 'Contador' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
