import { 
  collection, 
  addDoc, 
  updateDoc, 
  doc, 
  getDocs, 
  query, 
  where, 
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../config/firebase';

// Servicio para manejar las solicitudes de grúa
export class TowService {
  
  // Crear una nueva solicitud de grúa
  static async createTowRequest(requestData) {
    try {
      const docRef = await addDoc(collection(db, 'towRequests'), {
        ...requestData,
        status: 'pending',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return { id: docRef.id, ...requestData };
    } catch (error) {
      console.error('Error creating tow request:', error);
      throw error;
    }
  }

  // Actualizar el estado de una solicitud
  static async updateRequestStatus(requestId, status, driverInfo = null) {
    try {
      const requestRef = doc(db, 'towRequests', requestId);
      const updateData = {
        status,
        updatedAt: serverTimestamp()
      };
      
      if (driverInfo) {
        updateData.driverInfo = driverInfo;
      }
      
      await updateDoc(requestRef, updateData);
      return true;
    } catch (error) {
      console.error('Error updating request status:', error);
      throw error;
    }
  }

  // Obtener solicitudes por usuario
  static async getUserRequests(userId) {
    try {
      const q = query(
        collection(db, 'towRequests'),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting user requests:', error);
      throw error;
    }
  }

  // Obtener solicitudes por estado
  static async getRequestsByStatus(status) {
    try {
      const q = query(
        collection(db, 'towRequests'),
        where('status', '==', status),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting requests by status:', error);
      throw error;
    }
  }

  // Obtener todas las solicitudes (para administradores)
  static async getAllRequests() {
    try {
      const q = query(
        collection(db, 'towRequests'),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting all requests:', error);
      throw error;
    }
  }
}

// Estructura de datos para una solicitud de grúa
export const createTowRequestData = (formData, serviceType, towType, urgency, price) => {
  return {
    // Datos del usuario
    userId: 'user-id-here', // Esto debería venir del contexto de autenticación
    userPhone: formData.telefono,
    
    // Datos del servicio
    serviceType,
    towType,
    urgency,
    price,
    
    // Ubicaciones
    origin: formData.origen,
    destination: formData.destino,
    
    // Información adicional
    vehicleType: formData.tipoVehiculo || '',
    observations: formData.observaciones || '',
    
    // Metadatos
    createdAt: new Date(),
    status: 'pending'
  };
};
