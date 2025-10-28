import { useCallback } from 'react';

export function useLoadingScreen() {
  const getLoadingMessages = useCallback(() => {
    return {
      title: 'Cargando...',
      subtitle: 'Verificando tu sesión'
    };
  }, []);

  //funcion para diferentes tipos de loading
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
      //loadings para mapas
      case 'map_location':
        return {
          title: 'Obteniendo ubicación...',
          subtitle: 'Configurando tu posición en el mapa'
        };
      case 'map_initializing':
        return {
          title: 'Inicializando mapa...',
          subtitle: 'Cargando vista satelital'
        };
      case 'map_unavailable':
        return {
          title: 'Mapa no disponible',
          subtitle: 'Configurando dependencias del mapa'
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