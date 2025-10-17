import { supabase } from '../config/supabase';

// Servicio para manejar las solicitudes de grúa con Supabase
export class TowService {
  
  // Crear una nueva solicitud de grúa
  static async createTowRequest(requestData) {
    try {
      console.log('📝 Creando solicitud de grúa...');
      console.log('📊 Datos:', JSON.stringify(requestData, null, 2));
      
      const { data, error } = await supabase
        .from('tow_requests')
        .insert([requestData])
        .select()
        .single();
      
      if (error) {
        console.error('❌ Error creando solicitud:', error);
        throw error;
      }
      
      console.log('✅ Solicitud creada exitosamente!');
      console.log('🆔 ID:', data.id);
      return data;
    } catch (error) {
      console.error('❌ Error creating tow request:', error);
      throw error;
    }
  }

  // Actualizar el estado de una solicitud
  static async updateRequestStatus(requestId, status, driverInfo = null) {
    try {
      console.log('🔄 Actualizando estado de solicitud:', requestId, 'a', status);
      
      const updateData = {
        status,
        updated_at: new Date().toISOString()
      };
      
      if (driverInfo) {
        updateData.driver_info = driverInfo;
      }
      
      const { data, error } = await supabase
        .from('tow_requests')
        .update(updateData)
        .eq('id', requestId)
        .select()
        .single();
      
      if (error) {
        console.error('❌ Error actualizando estado:', error);
        throw error;
      }
      
      console.log('✅ Estado actualizado exitosamente!');
      return data;
    } catch (error) {
      console.error('❌ Error updating request status:', error);
      throw error;
    }
  }

  // Obtener solicitudes por usuario
  static async getUserRequests(userId) {
    try {
      console.log('📋 Obteniendo solicitudes del usuario:', userId);
      
      const { data, error } = await supabase
        .from('tow_requests')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('❌ Error obteniendo solicitudes:', error);
        throw error;
      }
      
      console.log('✅ Solicitudes obtenidas:', data.length);
      return data;
    } catch (error) {
      console.error('❌ Error getting user requests:', error);
      throw error;
    }
  }

  // Obtener solicitudes por estado
  static async getRequestsByStatus(status) {
    try {
      console.log('📋 Obteniendo solicitudes con estado:', status);
      
      const { data, error } = await supabase
        .from('tow_requests')
        .select('*')
        .eq('status', status)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('❌ Error obteniendo solicitudes por estado:', error);
        throw error;
      }
      
      console.log('✅ Solicitudes obtenidas:', data.length);
      return data;
    } catch (error) {
      console.error('❌ Error getting requests by status:', error);
      throw error;
    }
  }

  // Obtener todas las solicitudes (para administradores)
  static async getAllRequests() {
    try {
      console.log('📋 Obteniendo todas las solicitudes...');
      
      const { data, error } = await supabase
        .from('tow_requests')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('❌ Error obteniendo todas las solicitudes:', error);
        throw error;
      }
      
      console.log('✅ Todas las solicitudes obtenidas:', data.length);
      return data;
    } catch (error) {
      console.error('❌ Error getting all requests:', error);
      throw error;
    }
  }

  // Suscribirse a cambios en tiempo real
  static subscribeToRequests(callback) {
    console.log('🔔 Suscribiéndose a cambios en tiempo real...');
    
    return supabase
      .channel('tow_requests_changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'tow_requests' }, 
        (payload) => {
          console.log('📡 Cambio detectado:', payload);
          callback(payload);
        }
      )
      .subscribe();
  }

  // Obtener una solicitud específica por ID
  static async getRequestById(requestId) {
    try {
      console.log('🔍 Obteniendo solicitud por ID:', requestId);
      
      const { data, error } = await supabase
        .from('tow_requests')
        .select('*')
        .eq('id', requestId)
        .single();
      
      if (error) {
        console.error('❌ Error obteniendo solicitud por ID:', error);
        throw error;
      }
      
      console.log('✅ Solicitud obtenida:', data.id);
      return data;
    } catch (error) {
      console.error('❌ Error getting request by ID:', error);
      throw error;
    }
  }

  // Obtener conductores disponibles
  static async getAvailableDrivers() {
    try {
      console.log('🚗 Obteniendo conductores disponibles...');
      
      const { data, error } = await supabase
        .from('drivers')
        .select(`
          *,
          users:user_id (
            id,
            name,
            phone
          ),
          vehicles:vehicle_id (
            id,
            plate,
            brand,
            model
          )
        `)
        .eq('driver_status', 'available');
      
      if (error) {
        console.error('❌ Error obteniendo conductores:', error);
        throw error;
      }
      
      console.log('✅ Conductores disponibles:', data.length);
      return data;
    } catch (error) {
      console.error('❌ Error getting available drivers:', error);
      throw error;
    }
  }

  // Asignar conductor a una solicitud
  static async assignDriver(requestId, driverId) {
    try {
      console.log('👨‍💼 Asignando conductor:', driverId, 'a solicitud:', requestId);
      
      // Obtener información del conductor
      const { data: driverData, error: driverError } = await supabase
        .from('drivers')
        .select(`
          *,
          users:user_id (
            id,
            name,
            phone
          ),
          vehicles:vehicle_id (
            id,
            plate,
            brand,
            model
          )
        `)
        .eq('id', driverId)
        .single();
      
      if (driverError) {
        console.error('❌ Error obteniendo conductor:', driverError);
        throw driverError;
      }
      
      // Actualizar solicitud con información del conductor
      const driverInfo = {
        driver_id: driverId,
        name: driverData.users.name,
        phone: driverData.users.phone,
        vehicle: `${driverData.vehicles.brand} ${driverData.vehicles.model}`,
        plate: driverData.vehicles.plate,
        license_number: driverData.license_number
      };
      
      const { data, error } = await supabase
        .from('tow_requests')
        .update({
          driver_info: driverInfo,
          status: 'assigned',
          updated_at: new Date().toISOString()
        })
        .eq('id', requestId)
        .select()
        .single();
      
      if (error) {
        console.error('❌ Error asignando conductor:', error);
        throw error;
      }
      
      console.log('✅ Conductor asignado exitosamente!');
      return data;
    } catch (error) {
      console.error('❌ Error assigning driver:', error);
      throw error;
    }
  }
}

// Estructura de datos para una solicitud de grúa
export const createTowRequestData = (formData, serviceType, towType, urgency, price, userId) => {
  return {
    // Datos del usuario
    user_id: userId,
    user_phone: formData.phone,
    
    // Datos del servicio
    service_type: serviceType,
    tow_type: towType,
    urgency: urgency,
    price: price,
    
    // Ubicaciones
    origin: formData.origin,
    destination: formData.destination,
    
    // Información adicional
    vehicle_type: formData.vehicleType || '',
    observations: formData.observations || '',
    
    // Metadatos
    status: 'pending',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
};
