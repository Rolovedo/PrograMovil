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
  const [user, setUser] = useState(null); // usuario de auth
  const [profile, setProfile] = useState(null); // datos de la tabla users
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Obtener sesión inicial y escuchar cambios
  useEffect(() => {
    const initSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) console.error('Error obteniendo sesión inicial:', error);
      else {
        setSession(data.session);
        setUser(data.session?.user ?? null);
      }
      setLoading(false);
    };

    initSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('🔄 Auth event:', event);
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) await fetchUserProfile(session.user.id);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  // ✅ Cargar perfil extendido desde tabla users
  const fetchUserProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error obteniendo perfil:', error.message);
      } else {
        setProfile(data);
      }
    } catch (error) {
      console.error('Error inesperado en fetchUserProfile:', error);
    }
  };

  // ✅ Registrar usuario (Auth + tabla users)
  const signUp = async (email, password, userData) => {
    const { full_name, phone, role = 'user' } = userData;
    
    console.log('=================================');
    console.log('🟢 INICIANDO SIGNUP');
    console.log('Email:', email);
    console.log('UserData recibido:', userData);
    console.log('=================================');
  
    try {
      setLoading(true);
      
      // PASO 1: Crear usuario en Auth
      console.log('📝 PASO 1: Llamando a supabase.auth.signUp...');
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
  
      console.log('📊 Respuesta de signUp:', { data, error });
  
      if (error) {
        console.error('❌ ERROR EN AUTH.SIGNUP:', error);
        throw error;
      }
  
      const user = data.user;
      console.log('✅ Usuario de Auth:', user);
      
      if (!user) {
        console.error('❌ data.user es null o undefined');
        throw new Error('No se devolvió el usuario al registrarse');
      }
  
      console.log('✅ PASO 1 COMPLETADO - User ID:', user.id);
      console.log('=================================');
  
      // PASO 2: Crear registro en tabla users
      console.log('📝 PASO 2: Insertando en tabla users...');
      
      const profileData = {
        id: user.id,
        name: full_name,
        email: email,
        phone: phone,
        role: role,
        status: 'active',
      };
      
      console.log('📊 Datos a insertar:', profileData);
  
      const { data: insertData, error: insertError } = await supabase
        .from('users')
        .insert([profileData]);
  
      console.log('📊 Respuesta de insert:', { insertData, insertError });
  
      if (insertError) {
        console.error('❌ ERROR EN INSERT:', insertError);
        console.error('Código de error:', insertError.code);
        console.error('Mensaje:', insertError.message);
        console.error('Detalles:', insertError.details);
        throw new Error(`Error al crear perfil: ${insertError.message}`);
      }
  
      console.log('✅ PASO 2 COMPLETADO');
      console.log('=================================');
      console.log('✅✅✅ REGISTRO COMPLETO EXITOSO');
      console.log('=================================');
      
      return { success: true, user };
      
    } catch (error) {
      console.error('=================================');
      console.error('❌❌❌ ERROR GENERAL EN SIGNUP');
      console.error('Tipo:', error.name);
      console.error('Mensaje:', error.message);
      console.error('Stack:', error.stack);
      console.error('=================================');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // ✅ Iniciar sesión
  const signIn = async (email, password) => {
    try {
      setLoading(true);
      console.log('🔐 Iniciando sesión para:', email);

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      const user = data.user;
      await fetchUserProfile(user.id);

      console.log('✅ Sesión iniciada');
      return { success: true, user };
    } catch (error) {
      console.error('❌ Error en signIn:', error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // ✅ Cerrar sesión
  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      console.log('🚪 Sesión cerrada');
      setUser(null);
      setProfile(null);
      setSession(null);
    } catch (error) {
      console.error('❌ Error en signOut:', error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,       // usuario de auth
    profile,    // datos extendidos
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
