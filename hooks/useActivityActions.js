import { useCallback } from 'react';
import { useAppContext } from '../context/AppContext';

export function useActivityActions(navigation) {
  const { 
    user, 
    selectedService, 
    setSelectedService, 
    isLoading, 
    setIsLoading 
  } = useAppContext();

  //navegacion para solicitar nueva grua
  const handleRequestTow = useCallback(() => {
    console.log(`${user.name} solicita nueva grúa`);
    navigation.navigate('Servicios');
  }, [user.name, navigation]);

  const handleRate = useCallback(() => {
    console.log(`${user.name} va a calificar un servicio`);
    //navegacion para puntuar
  }, [user.name]);

  const handleRecharge = useCallback(() => {
    if (selectedService) {
      console.log(`${user.name} está recargando: ${selectedService.name} por ${selectedService.price}`);
      
      //navegar a Servicios con servicio precargado
      navigation.navigate('Servicios', {
        preselectedService: selectedService
      });
    } else {
      console.log('No hay servicio seleccionado para recargar');
      //si no hay servicio, navegar a Servicios normal
      navigation.navigate('Servicios');
    }
  }, [user.name, selectedService, navigation]);

  const handleFilter = useCallback(() => {
    console.log(`${user.name} abre filtros de actividad`);
    //funcionalidad de filtro
  }, [user.name]);

  const handleServiceDetails = useCallback((serviceId) => {
    console.log(`${user.name} ve detalles del servicio: ${serviceId}`);
    //navegacion a detalles del servicio
  }, [user.name]);

  return {
    handleRequestTow,
    handleRate,
    handleRecharge,
    handleFilter,
    handleServiceDetails,
  };
}