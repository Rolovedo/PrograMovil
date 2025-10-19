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
        console.error('Error obteniendo sesión inicial:', error);
        setUser(null);
        setProfile(null);
        setSession(null);
      } else if (data.session?.user && !isRegistering) {
        const profileExists = await validateUserProfile(data.session.user.id);
        if (profileExists) {
          setSession(data.session);
          setUser(data.session.user);
        } else {
          console.log('🚫 Usuario sin perfil válido, cerrando sesión...');
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
        console.log('🔄 Auth event:', event);
        
        if (event === 'SIGNED_IN' && session?.user && !isRegistering) {
          const profileExists = await validateUserProfile(session.user.id);
          if (profileExists) {
            setSession(session);
            setUser(session.user);
          } else {
            console.log('🚫 Login rechazado: usuario sin perfil válido');
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
          console.log('✅ Usuario registrado, preparando logout...');
        }
      }
    );

    return () => listener.subscription.unsubscribe();
  }, [isRegistering]);

  const validateUserProfile = async (userId) => {
    try {
      console.log('🔍 Validando perfil para userId:', userId);
      
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('❌ Error obteniendo perfil:', error.message);
        return false;
      }

      if (!data) {
        console.error('❌ No se encontró perfil para el usuario');
        return false;
      }

      console.log('✅ Perfil encontrado:', data);
      setProfile(data);
      return true;
      
    } catch (error) {
      console.error('❌ Error inesperado validando perfil:', error);
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
        console.error('❌ Error obteniendo perfil:', error.message);
        return null;
      }
      
      setProfile(data);
      return data;
    } catch (error) {
      console.error('❌ Error inesperado en fetchUserProfile:', error);
      return null;
    }
  };

  const signUp = async (email, password, userData) => {
    const { full_name, phone, role = 'client' } = userData;
    
    console.log('=================================');
    console.log('🟢 INICIANDO SIGNUP');
    console.log('Email:', email);
    console.log('UserData recibido:', userData);
    console.log('=================================');
  
    try {
      setLoading(true);
      setIsRegistering(true);
      
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
        
        try {
          await supabase.auth.admin.deleteUser(user.id);
          console.log('🗑️ Usuario de auth eliminado debido a error en perfil');
        } catch (deleteError) {
          console.error('❌ Error eliminando usuario de auth:', deleteError);
        }
        
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

  // ✅ MODIFICADO: Login sin mostrar errores de credenciales inválidas
  const signIn = async (email, password) => {
    try {
      setLoading(true);
      setIsRegistering(false);
      console.log('🔐 Iniciando sesión para:', email);

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        // ✅ Solo mostrar error en consola si NO es credenciales inválidas
        if (error.message !== 'Invalid login credentials') {
          console.error('❌ Error en auth:', error.message);
        }
        throw error;
      }

      const user = data.user;
      console.log('✅ Auth exitoso, validando perfil...');

      const profileExists = await validateUserProfile(user.id);
      
      if (!profileExists) {
        console.log('🚫 Login rechazado: usuario sin perfil en la tabla users');
        await supabase.auth.signOut();
        throw new Error('Tu cuenta no está completamente configurada. Contacta al administrador.');
      }

      console.log('✅ Login exitoso con perfil válido');
      return { success: true, user };
      
    } catch (error) {
      // ✅ Solo mostrar error en consola si NO es credenciales inválidas
      if (error.message !== 'Invalid login credentials') {
        console.error('❌ Error en signIn:', error.message);
      }
      
      // ✅ Retornar mensaje amigable para credenciales inválidas
      if (error.message === 'Invalid login credentials') {
        return { success: false, error: 'Usuario o contraseña incorrectos' };
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
      console.log('🚪 Sesión cerrada');
      setUser(null);
      setProfile(null);
      setSession(null);
      setIsRegistering(false);
      return { success: true };
    } catch (error) {
      console.error('❌ Error en signOut:', error.message);
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
