import { supabase } from '../../config/supabase';

export class DriverService {
  //obtener conductores disponibles
  static async getAvailable() {
    try {
      console.log('Obteniendo conductores disponibles...');

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

      if (error) throw error;
      
      console.log('Conductores disponibles:', data.length);
      return data;
    } catch (error) {
      console.error('Error getting drivers:', error);
      throw error;
    }
  }

  //asignar conductor
  static async assign(requestId, driverId) {
    try {
      console.log('Asignando conductor:', driverId);

      //obtener info del conductor
      const driverData = await this.getById(driverId);
      
      //crear info del conductor
      const driverInfo = {
        driver_id: driverId,
        name: driverData.users.name,
        phone: driverData.users.phone,
        vehicle: `${driverData.vehicles.brand} ${driverData.vehicles.model}`,
        plate: driverData.vehicles.plate,
        license_number: driverData.license_number,
      };

      //actualizar solicitud
      const { data, error } = await supabase
        .from('tow_requests')
        .update({
          driver_info: driverInfo,
          status: 'assigned',
          updated_at: new Date().toISOString(),
        })
        .eq('id', requestId)
        .select()
        .single();

      if (error) throw error;

      console.log('Conductor asignado');
      return data;
    } catch (error) {
      console.error('Error assigning driver:', error);
      throw error;
    }
  }

  //obtener conductor por ID
  static async getById(driverId) {
    try {
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
        .eq('id', driverId)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error getting driver:', error);
      throw error;
    }
  }
}