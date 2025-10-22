// components/DebugSupabaseUser.js
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { supabase } from '../config/supabase';
import { useAuth } from '../contexts/AuthContext';

export default function DebugSupabaseUser() {
  const { user: authUser } = useAuth();
  const [dbUser, setDbUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchUserFromDB = async () => {
    if (!authUser) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', authUser.id)
        .single();

      if (error) {
        console.error('Error:', error);
        setDbUser({ error: error.message });
      } else {
        console.log('Usuario de BD:', data);
        setDbUser(data);
      }
    } catch (err) {
      setDbUser({ error: err.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authUser) {
      fetchUserFromDB();
    }
  }, [authUser]);

  if (!authUser) {
    return (
      <View style={{ padding: 20, backgroundColor: '#333', margin: 10 }}>
        <Text style={{ color: 'white' }}>No hay usuario autenticado</Text>
      </View>
    );
  }

  return (
    <View style={{ padding: 20, backgroundColor: '#333', margin: 10 }}>
      <Text style={{ color: 'white', fontWeight: 'bold' }}>DEBUG - Usuario BD:</Text>
      <TouchableOpacity 
        onPress={fetchUserFromDB}
        style={{ backgroundColor: '#666', padding: 10, marginVertical: 10 }}
      >
        <Text style={{ color: 'white' }}>
          {loading ? 'Cargando...' : 'Recargar datos'}
        </Text>
      </TouchableOpacity>
      
      <Text style={{ color: 'white', fontSize: 12 }}>
        ID Auth: {authUser.id}
      </Text>
      
      <Text style={{ color: 'white', fontSize: 12, marginTop: 10 }}>
        Datos de BD:
      </Text>
      <Text style={{ color: 'white', fontSize: 11 }}>
        {JSON.stringify(dbUser, null, 2)}
      </Text>
    </View>
  );
}