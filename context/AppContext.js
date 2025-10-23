import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../config/supabase';

const AppContext = createContext();

export function AppProvider({ children }) {
  const { user: authUser } = useAuth();
  
  // estado inicial del usuario con rating fijo y nombres separados
  const [user, setUser] = useState({
    name: 'Usuario',
    fullName: 'Usuario',
    rating: 4.82,
    isAuthenticated: false,
    email: '',
    phone: '',
  });

  // ✅ Estado para el servicio seleccionado
  const [selectedService, setSelectedService] = useState(null);

  // ✅ Estado de carga global para pantallas que lo necesiten
  const [isLoading, setIsLoading] = useState(false);

  // Función para extraer el primer nombre
  const getFirstName = (fullName) => {
    if (!fullName) return 'Usuario';
    return fullName.split(' ')[0]; // Toma solo la primera palabra
  };

  //funcion para obtener datos del usuario desde Supabase
  const fetchUserProfile = async (userId) => {
    try {
      console.log('🔍 Buscando perfil del usuario:', userId);
      
      const { data, error } = await supabase
        .from('users')
        .select('name, email, phone')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('❌ Error obteniendo perfil:', error);
        return null;
      }

      console.log('✅ Perfil obtenido de Supabase:', data);
      return data;
    } catch (error) {
      console.error('❌ Error en fetchUserProfile:', error);
      return null;
    }
  };

  // ✅ Función para limpiar el servicio seleccionado
  const clearSelectedService = () => {
    console.log('🧹 Limpiando servicio seleccionado');
    setSelectedService(null);
  };

  // ✅ Función para seleccionar un servicio
  const selectService = (serviceType, serviceData = {}) => {
    const service = {
      id: Date.now().toString(),
      name: serviceType,
      type: serviceData.type || 'suggestion',
      selectedAt: new Date().toISOString(),
      ...serviceData
    };
    
    console.log('🚛 Servicio seleccionado en contexto:', service);
    setSelectedService(service);
    
    return service;
  };

  // ✅ Función helper para manejar carga con logs
  const setLoadingWithLog = (loading, action = '') => {
    console.log(`🔄 ${action ? `${action}: ` : ''}${loading ? 'Iniciando carga...' : 'Carga completada'}`);
    setIsLoading(loading);
  };

  // ✅ Efecto para cargar datos del usuario autenticado
  useEffect(() => {
    const loadUserData = async () => {
      if (authUser) {
        console.log('👤 Usuario autenticado detectado:', authUser.id);
        
        // Obtener datos adicionales de la tabla users
        const userProfile = await fetchUserProfile(authUser.id);
        
        const fullName = userProfile?.name || 'Usuario Desconocido';
        const name = getFirstName(fullName);
        
        // ✅ Crear objeto de usuario con nombres separados y rating fijo
        const newUser = {
          id: authUser.id,
          name: name, // ✅ Solo primer nombre
          fullName: fullName, // ✅ Nombre completo
          rating: 4.82, // ✅ Rating fijo
          email: authUser.email,
          phone: userProfile?.phone || '',
          isAuthenticated: true,
        };
        
        console.log('🎯 Usuario cargado:', {
          name: newUser.name,
          fullName: newUser.fullName,
          rating: newUser.rating,
          phone: newUser.phone
        });
        
        setUser(newUser);
      } else {
        // ✅ Usuario no autenticado - resetear todo
        console.log('❌ Usuario no autenticado');
        setUser({
          name: 'Usuario',
          fullName: 'Usuario',
          rating: 4.82,
          isAuthenticated: false,
          email: '',
          phone: '',
        });
        // ✅ Limpiar servicio seleccionado y loading también
        setSelectedService(null);
        setIsLoading(false);
      }
    };

    loadUserData();
  }, [authUser]);

  // ✅ Exportar todo lo necesario incluyendo isLoading
  const value = {
    // Estados del usuario
    user,
    setUser,
    
    // Estados del servicio seleccionado
    selectedService,
    setSelectedService,
    
    // Estados de carga
    isLoading,
    setIsLoading,
    
    // Funciones utilitarias
    selectService,
    clearSelectedService,
    setLoadingWithLog, // ✅ Helper con logs
    
    // Datos calculados
    hasSelectedService: !!selectedService,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

// ✅ Hook personalizado sin cambios
export function useAppContext() {
  const context = useContext(AppContext);
  
  if (!context) {
    throw new Error('useAppContext debe ser usado dentro de AppProvider');
  }
  
  return context;
}

export default AppContext;