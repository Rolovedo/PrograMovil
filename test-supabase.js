import { testSupabaseConnection, checkTableExists } from './config/supabase';

// Script de prueba para verificar la conexión a Supabase
const runSupabaseTests = async () => {
  console.log('\n🧪 === PRUEBAS DE CONEXIÓN SUPABASE ===\n');
  
  // Test 1: Conexión básica
  console.log('📋 Test 1: Conexión básica a Supabase');
  const connectionTest = await testSupabaseConnection();
  
  if (connectionTest) {
    console.log('✅ Test 1 PASÓ: Conexión exitosa\n');
    
    // Test 2: Verificar tabla
    console.log('📋 Test 2: Verificar existencia de tabla');
    const tableTest = await checkTableExists();
    
    if (tableTest) {
      console.log('✅ Test 2 PASÓ: Tabla existe y es accesible\n');
      
      // Test 3: Insertar registro de prueba
      console.log('📋 Test 3: Insertar registro de prueba');
      await testInsertRecord();
      
    } else {
      console.log('❌ Test 2 FALLÓ: Tabla no existe o no es accesible\n');
      console.log('💡 Solución: Ejecuta el script SQL en SUPABASE_SETUP.md\n');
    }
  } else {
    console.log('❌ Test 1 FALLÓ: No se pudo conectar a Supabase\n');
    console.log('💡 Verifica tu URL y clave de API\n');
  }
  
  console.log('🏁 === FIN DE PRUEBAS ===\n');
};

// Función para probar inserción de datos
const testInsertRecord = async () => {
  try {
    const { supabase } = await import('./config/supabase');
    
    const testData = {
      user_id: 'test-user-' + Date.now(),
      user_phone: '+56912345678',
      service_type: 'Prueba de conexión',
      tow_type: 'convencional',
      urgency: 'normal',
      price: 1000,
      origin: 'Dirección de prueba',
      destination: 'Destino de prueba',
      vehicle_type: 'Automóvil de prueba',
      observations: 'Registro de prueba para verificar conexión',
      status: 'pending'
    };
    
    console.log('📝 Insertando registro de prueba...');
    const { data, error } = await supabase
      .from('tow_requests')
      .insert([testData])
      .select()
      .single();
    
    if (error) {
      console.error('❌ Error insertando registro:', error.message);
      return false;
    }
    
    console.log('✅ Registro insertado exitosamente!');
    console.log('🆔 ID del registro:', data.id);
    
    // Limpiar registro de prueba
    console.log('🧹 Limpiando registro de prueba...');
    await supabase
      .from('tow_requests')
      .delete()
      .eq('id', data.id);
    
    console.log('✅ Registro de prueba eliminado');
    console.log('✅ Test 3 PASÓ: Inserción y eliminación exitosas\n');
    return true;
    
  } catch (err) {
    console.error('❌ Error en test de inserción:', err.message);
    console.log('❌ Test 3 FALLÓ: Error en inserción de datos\n');
    return false;
  }
};

// Ejecutar pruebas
runSupabaseTests();
