import { StyleSheet, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

export const locationSelectorScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  
  // ✅ HEADER FIJO
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: '#000',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  
  // ✅ ÁREA DEL MAPA
  mapArea: {
    flex: 1,
    marginTop: 80, // Espacio para el header
    marginBottom: 180, // Espacio para panel inferior
  },
  
  // ✅ PANEL INFERIOR FIJO
  bottomPanel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#000',
    zIndex: 1000,
  },
  
  // ✅ ESTILOS DEL HEADER
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: 50, // Para SafeArea
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  placeholder: {
    width: 34,
  },
  
  // ✅ LOADING
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    padding: 20,
  },
  loadingText: {
    color: 'white',
    fontSize: 16,
    marginTop: 10,
  },
  
  // ✅ MAPA CONTAINER
  mapContainer: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    position: 'relative',
  },
  
  // ✅ MAPA STYLE
  map: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  
  // ✅ OVERLAY DE INSTRUCCIONES
  instructionsOverlay: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#333',
    zIndex: 10,
  },
  instructionsText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
  },
  
  // ✅ INFO CARD
  infoCard: {
    backgroundColor: '#111',
    margin: 10,
    padding: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#333',
  },
  infoRow: {
    marginBottom: 10,
  },
  infoLabel: {
    color: '#888',
    fontSize: 12,
    marginBottom: 4,
  },
  infoValue: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  priceValue: {
    color: '#34C759',
    fontSize: 14,
    fontWeight: 'bold',
  },
  
  // ✅ BOTÓN CONTINUAR
  continueButton: {
    backgroundColor: '#007AFF',
    margin: 20,
    marginTop: 0,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  continueButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  // Estilos adicionales...
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  mapIcon: {
    marginBottom: 20,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  serviceLabel: {
    color: '#888',
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  serviceType: {
    color: '#007AFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
  },
});