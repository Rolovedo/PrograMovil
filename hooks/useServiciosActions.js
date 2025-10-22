import { useCallback } from 'react';
import { useAppContext } from '../context/AppContext';

// ✅ CAMBIAR: usar export default en lugar de export function
export default function useServiciosActions() {
  const { user, selectedService, setSelectedService } = useAppContext();

  const handleServicePress = useCallback((serviceName) => {
    console.log(`${user.name} presionó servicio: ${serviceName}`);
    
    // Actualizar servicio seleccionado en el contexto
    setSelectedService({
      id: Date.now().toString(), // ID temporal
      name: serviceName,
      price: serviceName === 'Convencional' ? '$54.950' : '$0' // Precio por defecto
    });
    
    console.log('Servicio seleccionado:', serviceName);
    // Navegacion a detalles del servicio
  }, [user.name, setSelectedService]);

  const handleOrderPress = useCallback(() => {
    console.log(`${user.name} presiona: Pedir Grua Convencional`);
    
    // Establecer servicio convencional como seleccionado
    setSelectedService({
      id: 'convencional-1',
      name: 'Grúa Convencional',
      price: '$54.950'
    });
    
    console.log('Pedir Grua Convencional presionado');
    // Navegacion para pedir grua
  }, [user.name, setSelectedService]);

  return {
    handleServicePress,
    handleOrderPress,
  };
}