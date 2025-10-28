import { supabase } from '../../config/supabase';

export class RealtimeService {
  //suscribirse a cambios
  static subscribe(callback) {
    console.log('Suscribiéndose a cambios...');

    return supabase
      .channel('tow_requests_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'tow_requests' },
        (payload) => {
          console.log('📡 Cambio detectado:', payload);
          callback(payload);
        }
      )
      .subscribe();
  }

  //suscribirse a solicitud especifica
  static subscribeToRequest(requestId, callback) {
    return supabase
      .channel(`request_${requestId}`)
      .on(
        'postgres_changes',
        { 
          event: 'UPDATE', 
          schema: 'public', 
          table: 'tow_requests',
          filter: `id=eq.${requestId}`
        },
        callback
      )
      .subscribe();
  }

  //suscribirse a solicitudes por usuario
  static subscribeToUserRequests(userId, callback) {
    return supabase
      .channel(`user_requests_${userId}`)
      .on(
        'postgres_changes',
        { 
          event: '*', 
          schema: 'public', 
          table: 'tow_requests',
          filter: `user_id=eq.${userId}`
        },
        callback
      )
      .subscribe();
  }
}