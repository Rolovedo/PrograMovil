import React from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { usuarioScreenStyles as styles } from '../styles/usuarioScreenStyle';

// Importar componentes modulares
import UserHeader from '../components/user/UserHeader';
import ActionButtons from '../components/user/ActionButtons';
import PromoSection from '../components/user/PromoSection';
import MenuOptions from '../components/user/MenuOptions';
import SelectedService from '../components/user/SelectedService';

//importamos el hook personalizado
import { useUsuarioActions } from '../hooks/useUsuarioActions';

export default function UsuarioScreen() {
  //se obtienen todas las funciones del hook
  const {
    handleBackPress,
    handleActivityPress,
    handleConfigPress,
    handleHelpPress,
    handleMessagesPress,
    handleDriverPress,
    handleHubPress,
    handleAvatarPress,
  } = useUsuarioActions();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        
        <UserHeader 
          onBackPress={handleBackPress}
          onAvatarPress={handleAvatarPress}
          styles={styles}
        />

        <ActionButtons 
          onHelpPress={handleHelpPress}
          onActivityPress={handleActivityPress}
          styles={styles}
        />

        <PromoSection styles={styles} />

        <MenuOptions 
          onConfigPress={handleConfigPress}
          onMessagesPress={handleMessagesPress}
          onDriverPress={handleDriverPress}
          onHubPress={handleHubPress}
          styles={styles}
        />

        <SelectedService styles={styles} />
        
      </ScrollView>
    </SafeAreaView>
  );
}



