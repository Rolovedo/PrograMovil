import { useState, useEffect } from 'react';
import { supabase } from '../config/supabase';
import { useAuth } from '../contexts/AuthContext';

export function useUserRole() {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    async function loadUserRole() {
      try {
        if (!user) {
          setRole(null);
          setLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from('users')
          .select('role')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('Error obteniendo rol:', error);
          setRole(null);
        } else {
          setRole(data?.role || 'client'); 
        }
      } catch (err) {
        console.error('Error en useUserRole:', err);
        setRole(null);
      } finally {
        setLoading(false);
      }
    }

    loadUserRole();
  }, [user]);

  return { role, loading };
}
