import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../config/supabase';

const AppContext = createContext();

export function AppProvider({ children }) {
  const { user: authUser } = useAuth();
  
  //estado inicial del usuario con rating fijo y nombres separados
  const [user, setUser] = useState({
    name: 'Usuario',
    fullName: 'Usuario',
    rating: 4.82,
    isAuthenticated: false,
    email: '',
    phone: '',
  });

  //estado para el servicio seleccionado
  const [selectedService, setSelectedService] = useState(null);

  //estado de carga global para pantallas que lo necesiten
  const [isLoading, setIsLoading] = useState(false);

  //funcion para extraer el primer nombre
  const getFirstName = (fullName) => {
    if (!fullName) return 'Usuario';
    return fullName.split(' ')[0]; // Toma solo la primera palabra
  };

  //funcion para obtener datos del usuario desde Supabase
  const fetchUserProfile = async (userId) => {
    try {
      console.log('Buscando perfil del usuario:', userId);
      
      const { data, error } = await supabase
        .from('users')
        .select('name, email, phone')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error obteniendo perfil:', error);
        return null;
      }
      return data;
    } catch (error) {
      console.error('Error en fetchUserProfile:', error);
      return null;
    }
  };

  //funcion para limpiar el servicio seleccionado
  const clearSelectedService = () => {
    setSelectedService(null);
  };

  //funcion para seleccionar un servicio
  const selectService = (serviceType, serviceData = {}) => {
    const service = {
      id: Date.now().toString(),
      name: serviceType,
      type: serviceData.type || 'suggestion',
      selectedAt: new Date().toISOString(),
      ...serviceData
    };
    
    console.log('Servicio seleccionado en contexto:', service);
    setSelectedService(service);
    
    return service;
  };

  //funcion helper para manejar carga con logs
  const setLoadingWithLog = (loading, action = '') => {
    console.log(`🔄 ${action ? `${action}: ` : ''}${loading ? 'Iniciando carga...' : 'Carga completada'}`);
    setIsLoading(loading);
  };

  //efecto para cargar datos del usuario autenticado
  useEffect(() => {
    const loadUserData = async () => {
      if (authUser) {
        console.log('Usuario autenticado detectado:', authUser.id);
        
        //obtener datos adicionales de la tabla users
        const userProfile = await fetchUserProfile(authUser.id);
        
        const fullName = userProfile?.name || 'Usuario Desconocido';
        const name = getFirstName(fullName);
        
        //crear objeto de usuario con nombres separados y rating fijo
        const newUser = {
          id: authUser.id,
          name: name,
          fullName: fullName,
          rating: 4.82,
          email: authUser.email,
          phone: userProfile?.phone || '',
          isAuthenticated: true,
        };
        
        setUser(newUser);
      } else {
        //usuario no autenticado - resetear todo
        console.log('Usuario no autenticado');
        setUser({
          name: 'Usuario',
          fullName: 'Usuario',
          rating: 4.82,
          isAuthenticated: false,
          email: '',
          phone: '',
        });
        //limpiar servicio seleccionado y loading
        setSelectedService(null);
        setIsLoading(false);
      }
    };

    loadUserData();
  }, [authUser]);

  //exportar todo lo necesario incluyendo isLoading
  const value = {
    user,
    setUser,
    selectedService,
    setSelectedService,
    isLoading,
    setIsLoading,
    selectService,
    clearSelectedService,
    setLoadingWithLog,
    //datos calculados
    hasSelectedService: !!selectedService,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

//hook personalizado
export function useAppContext() {
  const context = useContext(AppContext);
  
  if (!context) {
    throw new Error('useAppContext debe ser usado dentro de AppProvider');
  }
  
  return context;
}

export default AppContext;