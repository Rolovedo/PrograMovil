import { useCallback } from 'react';
import { useAppContext } from '../context/AppContext';

export function useHomeActions(navigation) {
  const { user, selectedService, setSelectedService } = useAppContext();

  const handleProfilePress = useCallback(() => {
    console.log('Perfil presionado');
    // Navegacion a perfil (funcionalidad original)
  }, []);

  const handleMainCardPress = useCallback(() => {
    console.log('Solicitar grúa presionado');
    // ✅ Navegacion original restaurada
    navigation.navigate('RequestTowScreen', {
      serviceType: 'Servicio de Grúa'
    });
  }, [navigation]);

  const handleSuggestionPress = useCallback((suggestionType) => {
    console.log(`Sugerencia ${suggestionType} presionada`);
    // ✅ Navegacion original restaurada
    navigation.navigate('RequestTowScreen', {
      serviceType: suggestionType
    });
  }, [navigation]);

  const handlePromotionsPress = useCallback(() => {
    console.log('Promociones presionado');
    // Navegacion a promociones (funcionalidad original)
  }, []);

  const handleKnowMorePress = useCallback(() => {
    console.log('Conoce más presionado');
    // ✅ Navegacion original restaurada
    // Navegacion a más información de promociones
  }, []);

  return {
    handleProfilePress,
    handleMainCardPress,
    handleSuggestionPress,
    handlePromotionsPress,
    handleKnowMorePress,
  };
}