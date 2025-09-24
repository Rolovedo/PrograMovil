import { 
  View, 
  Text, 
  TouchableOpacity, 
  Image,
  ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { usuarioScreenStyles as styles } from '../styles/usuarioScreenStyle';

export default function UsuarioScreen() {
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
    // Navegacion a configuración
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={handleBackPress}
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons name="chevron-left" size={24} color="#fff" />
          </TouchableOpacity>
          
          <View style={styles.userInfo}>
            <Text style={styles.title}>Usuario</Text>
            <View style={styles.rating}>
              <MaterialCommunityIcons name="star" size={16} color="#FFD700" />
              <Text style={styles.ratingText}>4.82</Text>
            </View>
          </View>

          <View style={styles.avatar}>
            <MaterialCommunityIcons name="account" size={30} color="#666" />
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={handleHelpPress}
            activeOpacity={0.8}
          >
            <View style={styles.actionButtonContent}>
              <MaterialCommunityIcons name="help-circle-outline" size={32} color="#666" />
            </View>
            <Text style={styles.actionButtonText}>Ayuda</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionButton}
            onPress={handleActivityPress}
            activeOpacity={0.8}
          >
            <View style={styles.actionButtonContent}>
              <MaterialCommunityIcons name="history" size={32} color="#666" />
            </View>
            <Text style={styles.actionButtonText}>Actividad</Text>
          </TouchableOpacity>
        </View>

        {/* Promo Section */}
        <View style={styles.promoSection}>
          <Text style={styles.promoTitle}>Aprovecha nuestras Promos</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flex: 1 }}>
              <Text style={styles.promoSubtitle}>
                Por cada servicio tienes más{'\n'}probabilidades de{'\n'}recibirlas
              </Text>
            </View>
            <View style={styles.promotionsIcon}>
              <Image
                source={require('../assets/twoSale.png')}
                style={{ width: 100, height: 100, resizeMode: 'contain' }}
              />
            </View>
          </View>
        </View>

        {/* Menu Options */}
        <View style={styles.menuSection}>
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={handleConfigPress}
            activeOpacity={0.6}
          >
            <MaterialCommunityIcons name="cog-outline" size={24} color="#fff" />
            <Text style={styles.menuText}>Configuración</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem}
            onPress={handleMessagesPress}
            activeOpacity={0.6}
          >
            <View style={styles.messageContainer}>
              <MaterialCommunityIcons name="message-outline" size={24} color="#fff" />
              <View style={styles.messageBadge} />
            </View>
            <Text style={styles.menuText}>Mensajes</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem}
            onPress={handleDriverPress}
            activeOpacity={0.6}
          >
            <MaterialCommunityIcons name="tow-truck" size={24} color="#fff" />
            <Text style={styles.menuText}>Gana siendo conductor de Grúa</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem}
            onPress={handleHubPress}
            activeOpacity={0.6}
          >
            <MaterialCommunityIcons name="office-building-outline" size={24} color="#fff" />
            <Text style={styles.menuText}>HUB de negocios</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}



