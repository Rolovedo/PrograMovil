import { useCallback } from 'react';

export function useLoadingScreen() {
  const getLoadingMessages = useCallback(() => {
    return {
      title: 'Cargando...',
      subtitle: 'Verificando tu sesión'
    };
  }, []);

  // Función para diferentes tipos de loading si fuera necesario
  const getLoadingType = useCallback((type = 'auth') => {
    switch (type) {
      case 'auth':
        return {
          title: 'Cargando...',
          subtitle: 'Verificando tu sesión'
        };
      case 'data':
        return {
          title: 'Cargando datos...',
          subtitle: 'Obteniendo información'
        };
      case 'navigation':
        return {
          title: 'Navegando...',
          subtitle: 'Preparando la siguiente pantalla'
        };
      default:
        return {
          title: 'Cargando...',
          subtitle: 'Por favor espera'
        };
    }
  }, []);

  return {
    getLoadingMessages,
    getLoadingType,
  };
}