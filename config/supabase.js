import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://cuoacayyrhjvozhzyllh.supabase.co"
const supabasePublishableKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1b2FjYXl5cmhqdm96aHp5bGxoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2MjkzNDIsImV4cCI6MjA3NjIwNTM0Mn0.ViJHwe9y6pFCfNPsm7ktEKSuk07uOgUbOxDq4nNGSMQ"

console.log('🚀 Inicializando Supabase...');
console.log('📍 URL:', supabaseUrl);
console.log('🔑 Key:', supabasePublishableKey.substring(0, 20) + '...');

export const supabase = createClient(supabaseUrl, supabasePublishableKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})

// Función para probar la conexión
export const testSupabaseConnection = async () => {
  try {
    console.log('🔍 Probando conexión a Supabase...');
    
    // Probar conexión básica usando la tabla users
    const { data, error } = await supabase
      .from('users')
      .select('count')
      .limit(1);
    
    if (error) {
      console.error('❌ Error de conexión:', error.message);
      return false;
    }
    
    console.log('✅ Conexión exitosa a Supabase!');
    console.log('📊 Datos recibidos:', data);
    return true;
  } catch (err) {
    console.error('❌ Error de conexión:', err.message);
    return false;
  }
};

// Función para verificar si la tabla existe
export const checkTableExists = async () => {
  try {
    console.log('🔍 Verificando si la tabla tow_requests existe...');
    
    const { data, error } = await supabase
      .from('tow_requests')
      .select('*')
      .limit(1);
    
    if (error) {
      if (error.code === 'PGRST116') {
        console.log('⚠️  La tabla tow_requests no existe. Necesitas crearla.');
        console.log('📝 Ejecuta el script SQL en SUPABASE_SETUP.md');
        return false;
      }
      console.error('❌ Error verificando tabla:', error.message);
      return false;
    }
    
    console.log('✅ La tabla tow_requests existe y es accesible!');
    console.log('📊 Registros encontrados:', data.length);
    return true;
  } catch (err) {
    console.error('❌ Error verificando tabla:', err.message);
    return false;
  }
};

console.log('✅ Cliente Supabase creado exitosamente');