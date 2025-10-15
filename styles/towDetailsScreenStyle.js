import { StyleSheet } from 'react-native';

export const towDetailsScreenStyles = StyleSheet.create({
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
  placeholder: {
    width: 34,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  summaryCard: {
    backgroundColor: '#111',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  cardTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  summaryLabel: {
    color: '#888',
    fontSize: 14,
    marginLeft: 10,
    minWidth: 60,
  },
  summaryValue: {
    color: 'white',
    fontSize: 14,
    flex: 1,
  },
  sectionCard: {
    backgroundColor: '#111',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  optionCard: {
    backgroundColor: '#222',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    width: '48%',
    borderWidth: 2,
    borderColor: 'transparent',
    minHeight: 120,
    justifyContent: 'center',
  },
  selectedOption: {
    borderColor: '#007AFF',
    backgroundColor: '#1a1a2e',
  },
  optionText: {
    color: '#888',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'center',
  },
  selectedOptionText: {
    color: '#007AFF',
  },
  optionPrice: {
    color: '#666',
    fontSize: 12,
    marginTop: 4,
    fontWeight: '500',
  },
  selectedOptionPrice: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
  urgencyContainer: {
    gap: 12,
  },
  urgencyOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#222',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedUrgency: {
    borderColor: '#007AFF',
    backgroundColor: '#1a1a2e',
  },
  urgencyIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  urgencyText: {
    color: '#888',
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  selectedUrgencyText: {
    color: 'white',
  },
  urgencyMultiplier: {
    color: '#666',
    fontSize: 14,
    fontWeight: 'bold',
  },
  selectedUrgencyMultiplier: {
    color: '#007AFF',
  },
  priceCard: {
    backgroundColor: '#007AFF',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  priceLabel: {
    color: 'white',
    fontSize: 16,
    marginBottom: 5,
  },
  priceValue: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
  priceNote: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    marginTop: 5,
    textAlign: 'center',
  },
  continueButton: {
    backgroundColor: '#007AFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  disabledButton: {
    backgroundColor: '#333',
  },
  continueButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
});
