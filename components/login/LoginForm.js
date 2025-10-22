import React from 'react';
import { View } from 'react-native';
import EmailInput from './EmailInput';
import PasswordInput from './PasswordInput';
import LoginButton from './LoginButton';
import RegisterLink from './RegisterLink';

export default function LoginForm({ 
  email, 
  onEmailChange, 
  password, 
  onPasswordChange,
  showPassword,
  onTogglePassword,
  onLogin,
  isLoading,
  onRegister,
  styles 
}) {
  return (
    <View style={styles.form}>
      
      <EmailInput 
        email={email}
        onEmailChange={onEmailChange}
        styles={styles}
      />

      <PasswordInput 
        password={password}
        onPasswordChange={onPasswordChange}
        showPassword={showPassword}
        onTogglePassword={onTogglePassword}
        styles={styles}
      />

      <LoginButton 
        onLogin={onLogin}
        isLoading={isLoading}
        styles={styles}
      />

      <RegisterLink 
        onRegister={onRegister}
        styles={styles}
      />
      
    </View>
  );
}