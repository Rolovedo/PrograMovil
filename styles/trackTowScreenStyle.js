import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const trackTowScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  menuButton: {
    padding: 5,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  mapContainer: {
    height: height * 0.35,
    backgroundColor: '#111',
    position: 'relative',
    margin: 20,
    borderRadius: 15,
  },
  mapPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapText: {
    color: '#666',
    fontSize: 16,
    marginTop: 10,
  },
  mapSubtext: {
    color: '#444',
    fontSize: 12,
    marginTop: 5,
  },
  originPoint: {
    position: 'absolute',
    top: 50,
    left: 50,
  },
  destinationPoint: {
    position: 'absolute',
    bottom: 50,
    right: 50,
  },
  driverPoint: {
    position: 'absolute',
    top: 100,
    left: width * 0.3,
  },
  statusContainer: {
    padding: 20,
  },
  statusCard: {
    backgroundColor: '#111',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    borderLeftWidth: 4,
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  statusSubtitle: {
    color: '#888',
    fontSize: 14,
  },
  driverCard: {
    backgroundColor: '#111',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  driverAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  driverDetails: {
    flex: 1,
  },
  driverName: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  driverRating: {
    color: '#FFD700',
    fontSize: 14,
    marginTop: 2,
  },
  driverVehicle: {
    color: '#888',
    fontSize: 12,
    marginTop: 2,
  },
  callButton: {
    backgroundColor: '#34C759',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  serviceInfoCard: {
    backgroundColor: '#111',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
  },
  serviceInfoTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  serviceDetails: {
    gap: 5,
  },
  serviceDetailText: {
    color: '#888',
    fontSize: 14,
  },
  actionButtons: {
    gap: 10,
  },
  completeButton: {
    backgroundColor: '#34C759',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    gap: 8,
  },
  completeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#FF3B30',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    gap: 8,
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});