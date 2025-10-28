import React from 'react';
import {
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { registerScreenStyles as styles } from '../styles/registerScreenStyle';

//componentes modulares
import RegisterHeader from '../components/register/RegisterHeader';
import RegisterForm from '../components/register/RegisterForm';

//hook personalizado
import { useRegisterActions } from '../hooks/useRegisterActions';

export default function RegisterScreen({ navigation }) {
  const {
    formData,
    showPassword,
    showConfirmPassword,
    isLoading,
    handleInputChange,
    handleRegister,
    handleLogin,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
  } = useRegisterActions(navigation);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          
          <RegisterHeader styles={styles} />

          <RegisterForm 
            formData={formData}
            showPassword={showPassword}
            showConfirmPassword={showConfirmPassword}
            isLoading={isLoading}
            onInputChange={handleInputChange}
            onRegister={handleRegister}
            onLogin={handleLogin}
            onTogglePassword={togglePasswordVisibility}
            onToggleConfirmPassword={toggleConfirmPasswordVisibility}
            styles={styles}
          />
          
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
