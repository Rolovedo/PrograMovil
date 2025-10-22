// Script simple para probar Supabase
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://cuoacayyrhjvozhzyllh.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1b2FjYXl5cmhqdm96aHp5bGxoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2MjkzNDIsImV4cCI6MjA3NjIwNTM0Mn0.ViJHwe9y6pFCfNPsm7ktEKSuk07uOgUbOxDq4nNGSMQ";

console.log('🚀 Probando conexión a Supabase...');
console.log('📍 URL:', supabaseUrl);
console.log('🔑 Key:', supabaseKey.substring(0, 20) + '...');

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  try {
    console.log('🔍 Probando conexión...');
    
    // Probar una consulta simple
    const { data, error } = await supabase
      .from('tow_requests')
      .select('count')
      .limit(1);
    
    if (error) {
      console.error('❌ Error:', error.message);
      console.error('📋 Código:', error.code);
      console.error('📋 Detalles:', error.details);
      
      if (error.code === 'PGRST116') {
        console.log('💡 La tabla "tow_requests" no existe.');
        console.log('📝 Necesitas ejecutar el script SQL en SUPABASE_SETUP.md');
      }
    } else {
      console.log('✅ ¡Conexión exitosa!');
      console.log('📊 Datos:', data);
    }
  } catch (err) {
    console.error('❌ Error de conexión:', err.message);
  }
}

testConnection();
