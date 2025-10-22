import { useAppContext } from '../context/AppContext';

export function useUsuarioActions() {
  const { user, setUser, setIsLoading } = useAppContext();

  const handleBackPress = () => {
    console.log('Botón de regresar presionado');
    // Navegacion de regreso
  };

  const handleActivityPress = () => {
    console.log('Botón de Actividad presionado');
    // Navegacion a actividad
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
    // Navegacion a ayuda
  };

  const handleMessagesPress = () => {
    console.log('Mensajes presionados');
    // Navegacion a mensajes
  };

  const handleDriverPress = () => {
    console.log('Conductor de Grúa presionado');
    // Navegacion a conductor de grua
  };

  const handleHubPress = () => {
    console.log('HUB de negocios presionado');
    // Navegacion a HUB de negocios
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