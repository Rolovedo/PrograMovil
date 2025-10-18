import { useCallback } from 'react';
import { useAppContext } from '../context/AppContext';

export function useActivityActions() {
  const { 
    user, 
    selectedService, 
    setSelectedService, 
    isLoading, 
    setIsLoading 
  } = useAppContext();

  const handleRequestTow = useCallback(() => {
    console.log(`${user.name} solicita nueva grúa`);
    setIsLoading(true);
    
    // Simular proceso de solicitud
    setTimeout(() => {
      setIsLoading(false);
      console.log('Solicitud procesada');
      // Aquí iría la navegación real a RequestTowScreen
    }, 2000);
  }, [user.name, setIsLoading]);

  const handleRate = useCallback(() => {
    console.log(`${user.name} va a calificar un servicio`);
    // Navegación para puntuar
    // Se podría usar el selectedService para precargar datos
  }, [user.name]);

  const handleRecharge = useCallback(() => {
    if (selectedService) {
      console.log(`${user.name} está recargando: ${selectedService.name} por ${selectedService.price}`);
      
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        console.log('Servicio recargado exitosamente');
        // Aquí iría la navegación a RequestTowScreen con datos precargados
      }, 1500);
    } else {
      console.log('No hay servicio seleccionado para recargar');
    }
  }, [user.name, selectedService, setIsLoading]);

  const handleFilter = useCallback(() => {
    console.log(`${user.name} abre filtros de actividad`);
    // Funcionalidad de filtro
  }, [user.name]);

  const handleServiceDetails = useCallback((serviceId) => {
    console.log(`${user.name} ve detalles del servicio: ${serviceId}`);
    // Navegación a detalles del servicio
  }, [user.name]);

  return {
    handleRequestTow,
    handleRate,
    handleRecharge,
    handleFilter,
    handleServiceDetails,
  };
}