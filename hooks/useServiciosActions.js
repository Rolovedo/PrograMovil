import { useCallback } from 'react';
import { useAppContext } from '../context/AppContext';

export default function useServiciosActions() {
  const { user, selectedService, setSelectedService } = useAppContext();

  const handleServicePress = useCallback((serviceName) => {
    console.log(`${user.name} presionó servicio: ${serviceName}`);
    
    //actualizar servicio seleccionado en el contexto
    setSelectedService({
      id: Date.now().toString(),
      name: serviceName,
      price: serviceName === 'Convencional' ? '$54.950' : '$0' //ejemplo de precio
    });
    
    console.log('Servicio seleccionado:', serviceName);
    //navegacion a detalles del servicio
  }, [user.name, setSelectedService]);

  const handleOrderPress = useCallback(() => {
    console.log(`${user.name} presiona: Pedir Grua Convencional`);
    
    //establecer servicio convencional como seleccionado
    setSelectedService({
      id: 'convencional-1',
      name: 'Grúa Convencional',
      price: '$54.950'
    });
    
    console.log('Pedir Grua Convencional presionado');
    //navegacion para pedir grua
  }, [user.name, setSelectedService]);

  return {
    handleServicePress,
    handleOrderPress,
  };
}