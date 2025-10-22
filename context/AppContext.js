import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../config/supabase';

//estado inicial del contexto
const initialState = {
  //Usuario
  user: {
    name: 'Usuario',
    rating: 4.82,
    isAuthenticated: false,
  },
  
  selectedService: null,
  location: null,
  //estado de carga
  isLoading: false,
};

//creacion del contexto
const AppContext = createContext();

//provider del contexto
export function AppProvider({ children }) {
  const { user: authUser } = useAuth(); // Obtener usuario del AuthContext
  
  const [selectedService, setSelectedService] = useState(initialState.selectedService);
  const [location, setLocation] = useState(initialState.location);
  const [isLoading, setIsLoading] = useState(initialState.isLoading);
  const [user, setUser] = useState(initialState.user);

  // ✅ Función para obtener datos del usuario desde la tabla users
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

  // ✅ Actualizar usuario cuando cambie el AuthContext
  useEffect(() => {
    const loadUserData = async () => {
      if (authUser) {
        console.log('👤 Usuario autenticado detectado:', authUser.id);
        
        // Obtener datos adicionales de la tabla users
        const userProfile = await fetchUserProfile(authUser.id);
        
        let userName = 'Usuario';
        let fullName = '';
        
        if (userProfile && userProfile.name) {
          // Usar el nombre real de la base de datos
          fullName = userProfile.name;
          userName = userProfile.name.split(' ')[0]; // Primer nombre
          console.log('✅ Usando nombre de la BD:', userName);
        } else {
          // Fallback al nombre quemado si no hay datos en la BD
          userName = 'Samuel López';
          fullName = 'Samuel López García';
          console.log('⚠️ Usando nombre fallback:', userName);
        }
        
        const newUser = {
          name: userName,
          rating: 4.82,
          isAuthenticated: true,
          email: authUser.email,
          fullName: fullName,
          phone: userProfile?.phone || '',
        };
        
        console.log('🎯 Usuario final creado:', newUser);
        setUser(newUser);
      } else {
        // Usuario no autenticado
        console.log('❌ Usuario no autenticado');
        setUser(initialState.user);
      }
    };

    loadUserData();
  }, [authUser]);

  const value = {
    //estos son los estados
    user,
    selectedService,
    location,
    isLoading,
    
    //funciones para actualizar estados
    setUser,
    setSelectedService,
    setLocation,
    setIsLoading,
    
    // ✅ Función para actualizar perfil
    updateUserProfile: fetchUserProfile,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

//hook personalizado para usar el contexto
export function useAppContext() {
  const context = useContext(AppContext);
  
  if (!context) {
    throw new Error('useAppContext debe ser usado dentro de AppProvider');
  }
  
  return context;
}

export default AppContext;