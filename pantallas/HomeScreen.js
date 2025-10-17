import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  StatusBar,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { homeScreenStyles as styles } from '../styles/homeScreenStyle';
import { SupabaseConnectionTest } from '../components/SupabaseConnectionTest';

export default function HomeScreen({ navigation }) {
  const handleProfilePress = () => {
    console.log('Perfil presionado');
    // Navegacion a perfil
  };

  const handleMainCardPress = () => {
    console.log('Solicitar grúa presionado');
    // Navegacion para solicitar grúa
    navigation.navigate('RequestTowScreen', {
      serviceType: 'Servicio de Grúa'
    });
  };

  const handleSuggestionPress = (suggestionType) => {
    console.log(`Sugerencia ${suggestionType} presionada`);
    // Navegacion a tipo de servicio específico
    navigation.navigate('RequestTowScreen', {
      serviceType: suggestionType
    });
  };

  const handlePromotionsPress = () => {
    console.log('Promociones presionado');
    // Navegacion a promociones
  };

  const handleKnowMorePress = () => {
    console.log('Conoce más presionado');
    // Navegacion a más información de promociones
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      
      {/* Componente de prueba de Supabase */}
      <SupabaseConnectionTest />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.brandName}>TOWX</Text>
        <TouchableOpacity 
          style={styles.profileButton}
          onPress={handleProfilePress}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons name="account-circle" size={32} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Main Service Card */}
        <View style={styles.mainCard}>
          <Text style={styles.mainTitle}>Solicita tu próxima grúa</Text>
          
          <View style={styles.illustrationContainer}>
            <View style={styles.phoneFrame}>
              <View style={styles.phoneScreen}>
                <View style={styles.illustrationContent}>
                  <Image 
                    source={require('../assets/rentalCar.png')} 
                    style={{ width: 150, height: 100, resizeMode: 'contain' }} 
                  />
                </View>
              </View>
              <View style={styles.phoneButton} />
            </View>
            <TouchableOpacity 
              style={styles.arrowButton}
              onPress={handleMainCardPress}
              activeOpacity={0.8}
            >
              <MaterialCommunityIcons name="chevron-right" size={24} color="#666" />
            </TouchableOpacity>
          </View>
          
          {/* Pagination dots */}
          <View style={styles.pagination}>
            <View style={[styles.dot, styles.activeDot]} />
            <View style={styles.dot} />
          </View>
        </View>

        {/* Suggestions Section */}
        <View style={styles.suggestionsSection}>
          <Text style={styles.sectionTitle}>Sugerencias</Text>
          
          <View style={styles.suggestionsGrid}>
            <TouchableOpacity 
              style={styles.suggestionCard}
              onPress={() => handleSuggestionPress('Remolque ligero')}
              activeOpacity={0.8}
            >
              <MaterialCommunityIcons name="truck" size={32} color="white" />
              <Text style={styles.suggestionText}>Remolque{'\n'}ligero</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.suggestionCard}
              onPress={() => handleSuggestionPress('Transporte vehículo')}
              activeOpacity={0.8}
            >
              <MaterialCommunityIcons name="car-side" size={32} color="white" />
              <Text style={styles.suggestionText}>Transporte{'\n'}vehículo</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.suggestionCard}
              onPress={() => handleSuggestionPress('Traslado ciudad')}
              activeOpacity={0.8}
            >
              <MaterialCommunityIcons name="car-back" size={32} color="white" />
              <Text style={styles.suggestionText}>Traslado{'\n'}ciudad</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.suggestionCard}
              onPress={() => handleSuggestionPress('Asistencia rápida')}
              activeOpacity={0.8}
            >
              <MaterialCommunityIcons name="wrench" size={32} color="white" />
              <Text style={styles.suggestionText}>Asistencia{'\n'}rápida</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Promotions Section */}
        <TouchableOpacity 
          style={styles.promotionsCard}
          onPress={handlePromotionsPress}
          activeOpacity={0.8}
        >
          <View style={styles.promotionsContent}>
            <View style={styles.promotionsText}>
              <Text style={styles.promotionsTitle}>Aprovecha{'\n'}Nuestras{'\n'}Promociones</Text>
              <TouchableOpacity 
                style={styles.knowMoreButton}
                onPress={handleKnowMorePress}
                activeOpacity={0.7}
              >
                <Text style={styles.knowMoreText}>Conoce más</Text>
                <MaterialCommunityIcons name="chevron-right" size={20} color="white" />
              </TouchableOpacity>
            </View>
            <View style={styles.promotionsIcon}>
                <Image source={require('../assets/twoSale.png')} 
                style={{ width: 150, height: 150, resizeMode: 'contain' }}/>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};