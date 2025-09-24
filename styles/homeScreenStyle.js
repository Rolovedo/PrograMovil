import { StyleSheet } from 'react-native';

export const homeScreenStyles = StyleSheet.create({
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