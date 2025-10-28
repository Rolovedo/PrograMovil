import React from 'react';
import { View } from 'react-native';
import NameInput from './NameInput';
import EmailInput from '../login/EmailInput';
import PhoneInput from './PhoneInput';
import PasswordInput from '../login/PasswordInput';
import ConfirmPasswordInput from './ConfirmPasswordInput';
import RegisterButton from './RegisterButton';
import LoginLink from './LoginLink';

export default function RegisterForm({ 
  formData,
  showPassword,
  showConfirmPassword,
  isLoading,
  onInputChange,
  onRegister,
  onLogin,
  onTogglePassword,
  onToggleConfirmPassword,
  styles 
}) {
  return (
    <View style={styles.form}>
      
      <NameInput 
        value={formData.name}
        onChangeText={(value) => onInputChange('name', value)}
        styles={styles}
      />

      <EmailInput 
        email={formData.email}
        onEmailChange={(value) => onInputChange('email', value)}
        styles={styles}
      />

      <PhoneInput 
        value={formData.phone}
        onChangeText={(value) => onInputChange('phone', value)}
        styles={styles}
      />

      <PasswordInput 
        password={formData.password}
        onPasswordChange={(value) => onInputChange('password', value)}
        showPassword={showPassword}
        onTogglePassword={onTogglePassword}
        styles={styles}
      />

      <ConfirmPasswordInput 
        value={formData.confirmPassword}
        onChangeText={(value) => onInputChange('confirmPassword', value)}
        showPassword={showConfirmPassword}
        onTogglePassword={onToggleConfirmPassword}
        styles={styles}
      />

      <RegisterButton 
        onRegister={onRegister}
        isLoading={isLoading}
        styles={styles}
      />

      <LoginLink 
        onLogin={onLogin}
        styles={styles}
      />
      
    </View>
  );
}