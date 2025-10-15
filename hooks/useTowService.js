import { useState, useEffect } from 'react';
import { TowService, createTowRequestData } from '../services/towService';

export const useTowService = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createRequest = async (formData, serviceType, towType, urgency, price) => {
    setLoading(true);
    setError(null);
    
    try {
      const requestData = createTowRequestData(formData, serviceType, towType, urgency, price);
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
      await TowService.updateRequestStatus(requestId, status, driverInfo);
      return true;
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

  return {
    loading,
    error,
    createRequest,
    updateRequestStatus,
    getUserRequests
  };
};
