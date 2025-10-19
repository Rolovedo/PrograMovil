import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { useAuth } from '../contexts/AuthContext';

export function useRegisterActions(navigation) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { signUp, signOut } = useAuth(); // ✅ Agregar signOut

  const handleInputChange = useCallback((field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const validateForm = useCallback(() => {
    const { name, email, password, confirmPassword, phone } = formData;

    if (!name.trim()) {
      Alert.alert('Error', 'Por favor ingresa tu nombre');
      return false;
    }

    if (!email.trim() || !email.includes('@')) {
      Alert.alert('Error', 'Por favor ingresa un email válido');
      return false;
    }

    if (!phone.trim()) {
      Alert.alert('Error', 'Por favor ingresa tu número de teléfono');
      return false;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
      return false;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return false;
    }

    return true;
  }, [formData]);

  const handleRegister = useCallback(async () => {
    console.log('🟠 handleRegister ejecutado');
    
    if (!validateForm()) {
      console.log('❌ validateForm retornó false');
      return;
    }
    
    console.log('✅ Validación pasada, continuando...');
  
    setIsLoading(true);
    
    try {
      const { name, email, password, phone } = formData;
      
      const userData = { 
        full_name: name.trim(), 
        phone: phone.trim(), 
        role: 'client' 
      };
      
      console.log('📤 Llamando a signUp con:', { email, userData });
      const result = await signUp(email, password, userData);
      console.log('📥 Resultado del signUp:', result);
      
      if (result.success) {
        // ✅ FORZAR LOGOUT después del registro exitoso
        console.log('🚪 Forzando logout después del registro exitoso...');
        try {
          await signOut();
          console.log('✅ Logout completado');
        } catch (logoutError) {
          console.error('⚠️ Error en logout:', logoutError);
          // Continuar aunque el logout falle
        }
        
        // ✅ Mostrar alerta y redirigir al login
        Alert.alert(
          'Usuario Creado Exitosamente',
          'Tu cuenta ha sido creada correctamente. Ahora debes iniciar sesión con tus credenciales.',
          [
            {
              text: 'OK',
              onPress: () => {
                console.log('📱 Navegando a LoginScreen...');
                navigation.navigate('LoginScreen');
              }
            }
          ]
        );
      } else {
        Alert.alert('Error', result.error || 'Error al crear la cuenta');
      }
    } catch (error) {
      console.error('❌ Error en handleRegister:', error);
      Alert.alert('Error', 'Error al crear la cuenta');
    } finally {
      setIsLoading(false);
    }
  }, [formData, validateForm, signUp, signOut, navigation]); // ✅ Agregar signOut a dependencies

  const handleLogin = useCallback(() => {
    navigation.navigate('LoginScreen');
  }, [navigation]);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword]);

  const toggleConfirmPasswordVisibility = useCallback(() => {
    setShowConfirmPassword(!showConfirmPassword);
  }, [showConfirmPassword]);

  return {
    formData,
    showPassword,
    showConfirmPassword,
    isLoading,
    handleInputChange,
    handleRegister,
    handleLogin,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
  };
}