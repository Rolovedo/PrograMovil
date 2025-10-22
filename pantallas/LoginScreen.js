import React from 'react';
import {
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { loginScreenStyles as styles } from '../styles/loginScreenStyle';

// Importar componentes modulares
import LoginHeader from '../components/login/LoginHeader';
import LoginForm from '../components/login/LoginForm';

// Importar hook personalizado
import { useLoginActions } from '../hooks/useLoginActions';

export default function LoginScreen({ navigation }) {
  const {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    isLoading,
    handleLogin,
    handleRegister,
    togglePasswordVisibility,
  } = useLoginActions(navigation);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          
          <LoginHeader styles={styles} />

          <LoginForm 
            email={email}
            onEmailChange={setEmail}
            password={password}
            onPasswordChange={setPassword}
            showPassword={showPassword}
            onTogglePassword={togglePasswordVisibility}
            onLogin={handleLogin}
            isLoading={isLoading}
            onRegister={handleRegister}
            styles={styles}
          />
          
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
