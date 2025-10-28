import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import AuthStack from './navigators/AuthStack';
import AppStack from './navigators/AppStack';
import LoadingScreen from './pantallas/LoadingScreen';

//importar el contexto existente
import { AppProvider } from './context/AppContext';

function AppNavigator() {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <AppProvider>
          <StatusBar translucent backgroundColor="transparent" style="light" />
          <AppNavigator />
        </AppProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
