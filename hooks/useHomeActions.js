import { useCallback } from 'react';
import { useAppContext } from '../context/AppContext';

export function useHomeActions(navigation) {
  const { user, selectedService, setSelectedService } = useAppContext();

  const handleProfilePress = useCallback(() => {
    console.log(`${user.name} presiona perfil`);
    navigation.navigate('Usuario');
  }, [user.name, navigation]);

  const handleMainCardPress = useCallback(() => {
    console.log(`${user.name} presiona solicitar grúa`);
    navigation.navigate('Servicios');
  }, [user.name, navigation]);

  // ✅ CAMBIAR: Navegar a LocationSelectorScreen
  const handleSuggestionPress = useCallback((suggestion) => {
    console.log(`${user.name} presiona sugerencia: ${suggestion}`);
    
    // Actualizar servicio seleccionado en el contexto
    setSelectedService({
      id: Date.now().toString(),
      name: suggestion,
      type: 'suggestion'
    });
    
    // ✅ Navegar a LocationSelectorScreen
    navigation.navigate('LocationSelectorScreen', {
      serviceType: suggestion
    });
  }, [user.name, navigation, setSelectedService]);

  const handlePromotionsPress = useCallback(() => {
    console.log(`${user.name} presiona promociones`);
    // Navegación a promociones
  }, [user.name]);

  const handleKnowMorePress = useCallback(() => {
    console.log(`${user.name} presiona conocer más`);
    // Navegación a información
  }, [user.name]);

  return {
    handleProfilePress,
    handleMainCardPress,
    handleSuggestionPress,
    handlePromotionsPress,
    handleKnowMorePress,
  };
}