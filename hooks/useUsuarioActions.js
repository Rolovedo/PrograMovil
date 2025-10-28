import { useAppContext } from '../context/AppContext';

export function useUsuarioActions(navigation) {
  const { user, setUser, setIsLoading } = useAppContext();

  const handleBackPress = () => {
    console.log('Botón de regresar presionado');
    navigation.navigate('Inicio');
  };

  const handleActivityPress = () => {
    console.log('Botón de Actividad presionado');
    navigation.navigate('Actividad');
  };

  const handleConfigPress = () => {
    console.log('Configuración presionada');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleHelpPress = () => {
    console.log('Ayuda presionada');
    // Navegación a ayuda
    // navigation.navigate('Help');
  };

  const handleMessagesPress = () => {
    console.log('Mensajes presionados');
    // Navegación a mensajes
    // navigation.navigate('Messages');
  };

  const handleDriverPress = () => {
    console.log('Conductor de Grúa presionado');
    // Navegación a conductor de grúa
    // navigation.navigate('DriverMode');
  };

  const handleHubPress = () => {
    console.log('HUB de negocios presionado');
    // Navegación a HUB de negocios
    // navigation.navigate('BusinessHub');
  };

  const handleAvatarPress = () => {
    setUser({
      ...user,
      name: user.isAuthenticated ? 'Usuario' : 'Samuel Lopez',
      isAuthenticated: !user.isAuthenticated,
    });
  };

  return {
    handleBackPress,
    handleActivityPress,
    handleConfigPress,
    handleHelpPress,
    handleMessagesPress,
    handleDriverPress,
    handleHubPress,
    handleAvatarPress,
  };
}