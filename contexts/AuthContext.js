import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../config/supabase';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    const initSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        setUser(null);
        setProfile(null);
        setSession(null);
      } else if (data.session?.user && !isRegistering) {
        const profileExists = await validateUserProfile(data.session.user.id);
        if (profileExists) {
          setSession(data.session);
          setUser(data.session.user);
        } else {
          await supabase.auth.signOut();
          setUser(null);
          setProfile(null);
          setSession(null);
        }
      } else {
        setUser(null);
        setProfile(null);
        setSession(null);
      }
      setLoading(false);
    };

    initSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        
        if (event === 'SIGNED_IN' && session?.user && !isRegistering) {
          const profileExists = await validateUserProfile(session.user.id);
          if (profileExists) {
            setSession(session);
            setUser(session.user);
          } else {
            await supabase.auth.signOut();
            setUser(null);
            setProfile(null);
            setSession(null);
          }
        } else if (event === 'SIGNED_OUT') {
          setSession(null);
          setUser(null);
          setProfile(null);
          setIsRegistering(false);
        } else if (event === 'SIGNED_UP') {
          console.log('Usuario registrado, preparando logout...');
        }
      }
    );

    return () => listener.subscription.unsubscribe();
  }, [isRegistering]);

  const validateUserProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error obteniendo perfil:', error.message);
        return false;
      }

      if (!data) {
        console.error('No se encontro perfil para el usuario');
        return false;
      }

      console.log('Perfil encontrado:', data);
      setProfile(data);
      return true;
      
    } catch (error) {
      console.error('Error inesperado validando perfil:', error);
      return false;
    }
  };

  const fetchUserProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error obteniendo perfil:', error.message);
        return null;
      }
      
      setProfile(data);
      return data;
    } catch (error) {
      console.error('Error inesperado en fetchUserProfile:', error);
      return null;
    }
  };

  const signUp = async (email, password, userData) => {
    const { full_name, phone, role = 'client' } = userData;
  
    try {
      setLoading(true);
      setIsRegistering(true);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
  
      if (error) {
        console.error('ERROR EN AUTH.SIGNUP:', error);
        throw error;
      }
  
      const user = data.user;
      console.log('Usuario de Auth:', user);
      
      if (!user) {
        throw new Error('No se devolvio el usuario al registrarse');
      }
      
      const profileData = {
        id: user.id,
        name: full_name,
        email: email,
        phone: phone,
        role: role,
        status: 'active',
      };
  
      const { data: insertData, error: insertError } = await supabase
        .from('users')
        .insert([profileData]);
  
      if (insertError) {
        console.error('ERROR EN INSERT:', insertError);
        
        try {
          await supabase.auth.admin.deleteUser(user.id);
          console.log('Usuario de auth eliminado debido a error en perfil');
        } catch (deleteError) {
          console.error('Error eliminando usuario de auth:', deleteError);
        }
        
        throw new Error(`Error al crear perfil: ${insertError.message}`);
      }
      
      return { success: true, user };
      
    } catch (error) {
      console.error('=================================');
      console.error('ERROR GENERAL EN SIGNUP');
      console.error('Tipo:', error.name);
      console.error('Mensaje:', error.message);
      console.error('Stack:', error.stack);
      console.error('=================================');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email, password) => {
    try {
      setLoading(true);
      setIsRegistering(false);
      console.log('Iniciando sesion para:', email);

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        if (error.message !== 'Invalid login credentials') {
          console.error('Error en auth:', error.message);
        }
        throw error;
      }

      const user = data.user;

      const profileExists = await validateUserProfile(user.id);
      
      if (!profileExists) {
        await supabase.auth.signOut();
        throw new Error('Tu cuenta no esta completamente configurada. Contacta al administrador.');
      }

      console.log('Login exitoso con perfil valido');
      return { success: true, user };
      
    } catch (error) {
      if (error.message !== 'Invalid login credentials') {
        console.error('Error en signIn:', error.message);
      }
      
      if (error.message === 'Invalid login credentials') {
        return { success: false, error: 'Usuario o contrasena incorrectos' };
      }
      
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      console.log('Sesion cerrada');
      setUser(null);
      setProfile(null);
      setSession(null);
      setIsRegistering(false);
      return { success: true };
    } catch (error) {
      console.error('Error en signOut:', error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    profile,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    fetchUserProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
