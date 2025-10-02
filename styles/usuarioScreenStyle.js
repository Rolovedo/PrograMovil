import { StyleSheet } from 'react-native';

export const usuarioScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfo: {
    flex: 1,
    alignItems: 'flex-start',
    marginLeft: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 5,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 40,
    marginBottom: 30,
  },
  actionButton: {
    alignItems: 'center',
  },
  actionButtonContent: {
    width: 80,
    height: 80,
    borderRadius: 15,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
  promoSection: {
    backgroundColor: '#444',
    marginHorizontal: 20,
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
    position: 'relative',
    overflow: 'hidden',
  },
  promoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  promoSubtitle: {
    fontSize: 14,
    color: '#ccc',
    lineHeight: 20,
  },
  promotionsIcon: {
    marginLeft: 16,
  },
  menuSection: {
    paddingHorizontal: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
  messageContainer: {
    position: 'relative',
  },
  messageBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00bfff',
  },
  menuText: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 20,
    flex: 1,
  },
  // Nuevos estilos que estaban inline
  promoContentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  promoTextContainer: {
    flex: 1,
  },
  promotionImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
});