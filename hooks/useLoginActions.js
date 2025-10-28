import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { useAuth } from '../contexts/AuthContext';

export function useLoginActions(navigation) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { signIn } = useAuth();

  const handleLogin = useCallback(async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    if (!email.includes('@')) {
      Alert.alert('Error', 'Por favor ingresa un email válido');
      return;
    }

    setIsLoading(true);
    
    try {
      const result = await signIn(email, password);
      
      if (result.success) {
        console.log('Login exitoso');
      } else {
        Alert.alert('Error', result.error || 'Error al iniciar sesión');
      }
    } catch (error) {
      Alert.alert('Error', 'Error al iniciar sesión');
    } finally {
      setIsLoading(false);
    }
  }, [email, password, signIn]);

  const handleRegister = useCallback(() => {
    navigation.navigate('RegisterScreen');
  }, [navigation]);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword]);

  return {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    isLoading,
    handleLogin,
    handleRegister,
    togglePasswordVisibility,
  };
}