import { StyleSheet } from 'react-native';

export const activeTripScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  
  header: {
    padding: 16,
    backgroundColor: '#000000',
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
    paddingTop: 50,
  },
  
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  
  content: {
    flex: 1,
    padding: 16,
    backgroundColor: '#000000',
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingText: {
    color: '#CCCCCC',
    fontSize: 16,
    marginTop: 10,
  },

  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  errorText: {
    color: '#FF3B30',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },

  retryButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },

  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

  serviceInfoCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#333333',
  },

  serviceInfoTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },

  serviceInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },

  serviceInfoLabel: {
    color: '#CCCCCC',
    fontSize: 14,
  },

  serviceInfoValue: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },

  //estilos para botones de acción
  actionButtonsContainer: {
    padding: 20,
    gap: 12,
  },

  primaryButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },

  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

  secondaryButton: {
    backgroundColor: 'transparent',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333333',
  },

  secondaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },

  dangerButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },

  dangerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});