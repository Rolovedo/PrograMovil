import React, { createContext, useContext, useState } from 'react';

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
  const [user, setUser] = useState(initialState.user);
  const [selectedService, setSelectedService] = useState(initialState.selectedService);
  const [location, setLocation] = useState(initialState.location);
  const [isLoading, setIsLoading] = useState(initialState.isLoading);

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