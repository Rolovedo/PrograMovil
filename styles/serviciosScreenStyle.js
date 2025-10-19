import { StyleSheet } from 'react-native';

export const serviciosScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f10',
  },
  header: {
    padding: 16,
  },
  title: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#a0a0a5',
    marginTop: 4,
  },
  flatListContainer: {
    paddingHorizontal: 16,
    paddingBottom: 120,
  },
  serviceCard: {
    backgroundColor: '#1a1b1e',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  serviceImage: {
    display: 'flex',
    width: 80,
    height: 80,
    marginBottom: 8,
  },
  serviceTitle: {
    color: 'white',
    fontSize: 16,
  },
  promoText: {
    color: '#6ee7b7',
    marginTop: 4,
  },
  bottomPanel: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#111315',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#2a2b2f',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  bottomText: {
    color: 'white',
  },
  orderButton: {
    backgroundColor: '#18a558',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  orderButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  selectedIndicator: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: 'bold',
    marginTop: 5,
    textAlign: 'center',
  },
  userInfo: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginBottom: 5,
  },
  selectedServiceInfo: {
    fontSize: 12,
    color: '#4CAF50',
    textAlign: 'center',
    marginBottom: 5,
    fontStyle: 'italic',
  },
});