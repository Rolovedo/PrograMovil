import { useState, useEffect, useCallback } from 'react';
import { TowService, createTowRequestData } from '../services/towService';
import { useAuth } from '../contexts/AuthContext';

export const useTowService = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  const createRequest = useCallback(
    async (formData, serviceType, urgency, price) => {
      setLoading(true);
      setError(null);
      try {
        if (!user?.id) {
          throw new Error('Debes iniciar sesión para crear una solicitud');
        }

        console.log('📝 Validando datos de la solicitud:', {
          serviceType,
          urgency,
          price,
          telefono: formData.telefono,
        });

        // Validar campos requeridos
        if (!formData.telefono) throw new Error('Se requiere un número de teléfono');
        if (!formData.origen) throw new Error('Se requiere dirección de origen');
        if (!formData.destino) throw new Error('Se requiere dirección de destino');
        if (!price) throw new Error('Se requiere especificar el precio');

        const requestData = createTowRequestData(
          {
            origen: formData.origen,
            destino: formData.destino,
            telefono: formData.telefono,
            tipoVehiculo: formData.tipoVehiculo,
            observaciones: formData.observaciones,
          },
          serviceType,
          urgency,
          price,
          user.id
        );

        // Delegar la inserción a TowService.createTowRequest
        const data = await TowService.createTowRequest(requestData);

        console.log('✅ Solicitud creada (useTowService):', data.id);
        return data;
      } catch (err) {
        console.error('❌ Error creando solicitud (useTowService):', err);
        setError(err.message || String(err));
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [user]
  );

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
    subscribeToRequests,
  };
};
