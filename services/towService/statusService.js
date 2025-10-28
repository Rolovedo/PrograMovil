import { supabase } from '../../config/supabase';

export class StatusService {
  //actualizar estado
  static async update(requestId, status, driverInfo = null) {
    try {
      console.log('Actualizando estado:', requestId, 'a', status);

      const updateData = {
        status,
        updated_at: new Date().toISOString(),
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

      if (error) throw error;
      
      console.log('Estado actualizado');
      return data;
    } catch (error) {
      console.error('Error updating status:', error);
      throw error;
    }
  }

  //estados disponibles
  static getValidStatuses() {
    return ['pending', 'assigned', 'in_progress', 'completed', 'cancelled'];
  }

  //validar transicion de estado
  static canTransitionTo(currentStatus, newStatus) {
    const transitions = {
      'pending': ['assigned', 'cancelled'],
      'assigned': ['in_progress', 'cancelled'],
      'in_progress': ['completed', 'cancelled'],
      'completed': [],
      'cancelled': []
    };

    return transitions[currentStatus]?.includes(newStatus) || false;
  }
}