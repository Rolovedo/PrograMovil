import React from 'react';
import { View } from 'react-native';
import { loadingScreenStyles as styles } from '../styles/loadingScreenStyle';

// Importar componentes modulares
import LoadingIcon from '../components/loading/LoadingIcon';
import LoadingText from '../components/loading/LoadingText';
import LoadingSpinner from '../components/loading/LoadingSpinner';

// Importar hook personalizado
import { useLoadingScreen } from '../hooks/useLoadingScreen';

export default function LoadingScreen({ loadingType = 'auth' }) {
  // Obtener mensajes del hook
  const { getLoadingType } = useLoadingScreen();
  const { title, subtitle } = getLoadingType(loadingType);

  return (
    <View style={styles.container}>
      <View style={styles.loadingContainer}>
        
        <LoadingIcon styles={styles} />
        
        <LoadingText 
          title={title}
          subtitle={subtitle}
          styles={styles}
        />
        
        <LoadingSpinner styles={styles} />
        
      </View>
    </View>
  );
}
