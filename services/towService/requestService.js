import { supabase } from '../../config/supabase';

export class RequestService {
  //crear solicitud
  static async create(requestData) {
    try {
      console.log('Creando solicitud de grúa...');
      
      const { data, error } = await supabase
        .from('tow_requests')
        .insert([requestData])
        .select()
        .single();

      if (error) throw error;
      
      console.log('Solicitud creada:', data.id);
      return data;
    } catch (error) {
      console.error('Error creando solicitud:', error);
      throw error;
    }
  }

  //obtener por ID
  static async getById(requestId) {
    try {
      const { data, error } = await supabase
        .from('tow_requests')
        .select('*')
        .eq('id', requestId)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error obteniendo solicitud:', error);
      throw error;
    }
  }

  //obtener por usuario
  static async getByUser(userId) {
    try {
      const { data, error } = await supabase
        .from('tow_requests')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error obteniendo solicitudes del usuario:', error);
      throw error;
    }
  }

  //obtener por estado
  static async getByStatus(status) {
    try {
      const { data, error } = await supabase
        .from('tow_requests')
        .select('*')
        .eq('status', status)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error obteniendo solicitudes por estado:', error);
      throw error;
    }
  }

  //obtener todas (admin)
  static async getAll() {
    try {
      const { data, error } = await supabase
        .from('tow_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error obteniendo todas las solicitudes:', error);
      throw error;
    }
  }
}