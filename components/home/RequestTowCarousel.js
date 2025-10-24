import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useAppContext } from '../../context/AppContext';

export default function RequestTowCarousel({ onMainCardPress, styles = {} }) {
  const { user } = useAppContext() || {};
  const isAuth = user && user.isAuthenticated;
  const name = (user && user.name) || 'Invitado';

  const content = (
      <View style={[defaultStyles.container]}>
        <Image
          source={require('../../assets/rentalCar.png')}
          style={[defaultStyles.image, styles.image]}
        />

        <View style={[defaultStyles.textContainer, styles.textContainer]}>
          <Text style={[defaultStyles.title]}>
            {isAuth ? 'Bienvenido' : 'Bienvenido'}
          </Text>
          <Text style={[defaultStyles.name]} numberOfLines={1}>
            {isAuth ? name : 'Invitado'}
          </Text>
        </View>
      </View>
  );

  if (onMainCardPress) {
    return (
      <TouchableOpacity activeOpacity={0.85} onPress={onMainCardPress}>
        {content}
      </TouchableOpacity>
    );
  }

  return content;
}

const defaultStyles = StyleSheet.create({
  gradientContainer: {
    borderRadius: 18,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: -5
  },
  image: {
    width: 210,
    height: 160,
    marginRight:20
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 25,
    fontWeight: '700',
    color: '#f8f8f8ff',
    letterSpacing: 0.3,
  },
    name: {
    fontSize: 30,
    fontWeight: '700',
    color: '#ff9c1aff',
    letterSpacing: 0.3,
  },
});
