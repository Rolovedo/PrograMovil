import { useState, useEffect, useCallback } from 'react';
import { TowService, createTowRequestData } from '../services/towService';
import { useAuth } from '../contexts/AuthContext';

export const useTowService = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  const createRequest = useCallback(async (formData, serviceType, urgency, price) => {
    try {
      console.log('📝 Creando solicitud en Supabase:', {
        serviceType,
        urgency,
        price,
        telefono: formData.telefono
      });

      // ✅ Crear objeto de solicitud sin towType
      const requestData = {
        user_id: user?.id,
        service_type: serviceType,
        origin: formData.origen,
        destination: formData.destino,
        phone: formData.telefono,
        urgency: urgency,
        price: price,
        status: 'pending',
        distance: formData.distance || null,
        estimated_duration: formData.estimatedDuration || null,
        observations: formData.observaciones || null,
        created_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from('tow_requests') // O el nombre de tu tabla
        .insert([requestData])
        .select()
        .single();

      if (error) throw error;

      console.log('✅ Solicitud creada exitosamente:', data);
      return data;

    } catch (error) {
      console.error('❌ Error creando solicitud:', error);
      throw error;
    }
  }, [user]);

  const updateRequestStatus = async (requestId, status, driverInfo = null) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await TowService.updateRequestStatus(requestId, status, driverInfo);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getUserRequests = async (userId) => {
    setLoading(true);
    setError(null);
    
    try {
      const requests = await TowService.getUserRequests(userId);
      return requests;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getRequestById = async (requestId) => {
    setLoading(true);
    setError(null);
    
    try {
      const request = await TowService.getRequestById(requestId);
      return request;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getRequestsByStatus = async (status) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await TowService.getRequestsByStatus(status);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getAllRequests = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await TowService.getAllRequests();
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getAvailableDrivers = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await TowService.getAvailableDrivers();
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const assignDriver = async (requestId, driverId) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await TowService.assignDriver(requestId, driverId);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const subscribeToRequests = (callback) => {
    return TowService.subscribeToRequests(callback);
  };

  return {
    loading,
    error,
    createRequest,
    updateRequestStatus,
    getUserRequests,
    getRequestById,
    getRequestsByStatus,
    getAllRequests,
    getAvailableDrivers,
    assignDriver,
    subscribeToRequests
  };
};
