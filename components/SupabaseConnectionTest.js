import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { supabase } from '../config/supabase';
import { useAuth } from '../contexts/AuthContext';

export const SupabaseConnectionTest = () => {
  const { user } = useAuth();
  const [connectionStatus, setConnectionStatus] = useState('Probando...');
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const testConnection = async () => {
      try {
        console.log('🔍 Probando conexión a Supabase...');
        
        // Probar conexión básica usando la tabla users
        const { data, error } = await supabase
          .from('users')
          .select('count')
          .limit(1);
        
        if (error) {
          // Si hay error pero es de tabla no encontrada, la conexión está bien
          if (error.code === 'PGRST116' || error.message.includes('Could not find the table')) {
            console.log('✅ Conexión exitosa a Supabase!');
            setConnectionStatus('✅ Conectado');
            setIsConnected(true);
          } else {
            console.log('❌ Error de conexión:', error.message);
            setConnectionStatus('❌ No conectado');
            setIsConnected(false);
          }
        } else {
          console.log('✅ Conexión exitosa a Supabase!');
          setConnectionStatus('✅ Conectado');
          setIsConnected(true);
        }
      } catch (err) {
        console.log('❌ Error de conexión:', err.message);
        setConnectionStatus('❌ No conectado');
        setIsConnected(false);
      }
    };
    
    testConnection();
  }, []);

  // No mostrar el componente si el usuario está autenticado
  if (user) {
    return null;
  }

  return (
    <View style={[styles.container, { backgroundColor: isConnected ? 'rgba(52, 199, 89, 0.9)' : 'rgba(255, 59, 48, 0.9)' }]}>
      <Text style={styles.text}>Supabase: {connectionStatus}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    padding: 15,
    borderRadius: 10,
    zIndex: 1000,
  },
  text: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
