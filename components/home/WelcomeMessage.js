import React from 'react';
import { View, Text, Image } from 'react-native';
import { useAppContext } from '../../context/AppContext';
import { homeScreenStyles } from '../../styles/homeScreenStyle';

export default function WelcomeMessage({ styles = {} }) {
  const { user } = useAppContext() || {};
  const isAuth = user && user.isAuthenticated;
  const name = (user && user.name) || 'Invitado';

  return (
    <View style={[homeScreenStyles.welcomeContainer, styles.container]}>
      <Image
        source={require('../../assets/rentalCar.png')}
        style={[homeScreenStyles.welcomeImage, styles.image]}
      />

      <View style={[homeScreenStyles.welcomeTextContainer, styles.textContainer]}>
        <Text style={[homeScreenStyles.welcomeTitle, styles.title]}>
          {isAuth ? 'Bienvenido' : 'Bienvenido'}
        </Text>
        <Text style={[homeScreenStyles.welcomeName, styles.name]} numberOfLines={1}>
          {isAuth ? name : 'Invitado'}
        </Text>
      </View>
    </View>
  );
}
