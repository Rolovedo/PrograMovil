import React from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity, 
  Image,
  StatusBar,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.brandName}>TOWX</Text>
        <TouchableOpacity style={styles.profileButton}>
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
                  <MaterialCommunityIcons name="tow-truck" size={60} color="#6366f1" />
                  <Text style={styles.illustrationText}>🚗💨</Text>
                </View>
              </View>
              <View style={styles.phoneButton} />
            </View>
            <TouchableOpacity style={styles.arrowButton}>
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
          <Text style={styles.sectionTitle}>Suggestions</Text>
          
          <View style={styles.suggestionsGrid}>
            <TouchableOpacity style={styles.suggestionCard}>
              <MaterialCommunityIcons name="truck" size={32} color="white" />
              <Text style={styles.suggestionText}>Remolque{'\n'}ligero</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.suggestionCard}>
              <MaterialCommunityIcons name="car-side" size={32} color="white" />
              <Text style={styles.suggestionText}>Transporte{'\n'}vehículo</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.suggestionCard}>
              <MaterialCommunityIcons name="car-back" size={32} color="white" />
              <Text style={styles.suggestionText}>Traslado{'\n'}ciudad</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.suggestionCard}>
              <MaterialCommunityIcons name="wrench" size={32} color="white" />
              <Text style={styles.suggestionText}>Asistencia{'\n'}rápida</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Promotions Section */}
        <TouchableOpacity style={styles.promotionsCard}>
          <View style={styles.promotionsContent}>
            <View style={styles.promotionsText}>
              <Text style={styles.promotionsTitle}>Aprovecha{'\n'}Nuestras{'\n'}Promociones</Text>
              <TouchableOpacity style={styles.knowMoreButton}>
                <Text style={styles.knowMoreText}>Conoce más</Text>
                <MaterialCommunityIcons name="chevron-right" size={20} color="white" />
              </TouchableOpacity>
            </View>
            <View style={styles.promotionsIcon}>
              <MaterialCommunityIcons name="tag-multiple" size={60} color="#ff6b6b" />
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#000000',
  },
  brandName: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  profileButton: {
    padding: 4,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  mainCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    alignItems: 'center',
  },
  mainTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  illustrationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  phoneFrame: {
    backgroundColor: '#2a2a2a',
    borderRadius: 20,
    padding: 8,
    marginRight: 16,
  },
  phoneScreen: {
    backgroundColor: '#3a3a3a',
    borderRadius: 12,
    width: 200,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustrationContent: {
    alignItems: 'center',
  },
  illustrationText: {
    fontSize: 16,
    marginTop: 8,
  },
  phoneButton: {
    backgroundColor: '#666',
    width: 40,
    height: 4,
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 8,
  },
  arrowButton: {
    backgroundColor: '#2a2a2a',
    borderRadius: 20,
    padding: 8,
  },
  pagination: {
    flexDirection: 'row',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#444',
  },
  activeDot: {
    backgroundColor: 'white',
  },
  suggestionsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  suggestionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  suggestionCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    padding: 16,
    width: '48%',
    alignItems: 'center',
    minHeight: 100,
    justifyContent: 'center',
  },
  suggestionText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 16,
  },
  promotionsCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 16,
    padding: 20,
    overflow: 'hidden',
  },
  promotionsContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  promotionsText: {
    flex: 1,
  },
  promotionsTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 24,
    marginBottom: 12,
  },
  knowMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  knowMoreText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
    marginRight: 4,
  },
  promotionsIcon: {
    marginLeft: 16,
  },
});


