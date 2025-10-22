import { useState, useEffect } from 'react';
import { TowService, createTowRequestData } from '../services/towService';
import { useAuth } from '../contexts/AuthContext';

export const useTowService = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  const createRequest = async (formData, serviceType, towType, urgency, price) => {
    if (!user) {
      throw new Error('Usuario no autenticado');
    }

    setLoading(true);
    setError(null);
    
    try {
      const requestData = createTowRequestData(formData, serviceType, towType, urgency, price, user.id);
      const result = await TowService.createTowRequest(requestData);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

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
