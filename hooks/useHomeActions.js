import { useCallback } from 'react';
import { useAppContext } from '../context/AppContext';

export function useHomeActions(navigation) {
  const { user, selectedService, setSelectedService } = useAppContext();

  //navegacion al perfil de usuario
  const handleProfilePress = useCallback(() => {
    console.log(`${user.name} presiona perfil`);
    navigation.navigate('Usuario');
  }, [user.name, navigation]);

  const handleSuggestionPress = useCallback((suggestion) => {
    console.log(`${user.name} presiona sugerencia: ${suggestion}`);
    
    //actualizar servicio seleccionado en el contexto
    setSelectedService({
      id: Date.now().toString(),
      name: suggestion,
      type: 'suggestion'
    });
    
    //navegar a LocationSelectorScreen
    navigation.navigate('LocationSelectorScreen', {
      serviceType: suggestion
    });
  }, [user.name, navigation, setSelectedService]);

  const handlePromotionsPress = useCallback(() => {
    console.log(`${user.name} presiona promociones`);
    //proxima navegacion a promociones
  }, [user.name]);

  const handleKnowMorePress = useCallback(() => {
    console.log(`${user.name} presiona conocer más`);
    //proxima navegacion a información
  }, [user.name]);

  return {
    handleProfilePress,
    handleSuggestionPress,
    handlePromotionsPress,
    handleKnowMorePress,
  };
}