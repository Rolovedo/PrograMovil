import { RequestService } from './requestService';
import { StatusService } from './statusService';
import { DriverService } from './driverService';
import { RealtimeService } from './realtimeService';
import { ValidationService } from './validationService';

//clase principal que agrupa todos los servicios
export class TowService {
  static requests = RequestService;
  static status = StatusService;
  static drivers = DriverService;
  static realtime = RealtimeService;
  static validation = ValidationService;

  //metodos de conveniencia (mantener compatibilidad)
  static async createTowRequest(requestData) {
    return this.requests.create(requestData);
  }

  static async updateRequestStatus(requestId, status, driverInfo) {
    return this.status.update(requestId, status, driverInfo);
  }

  static async getUserRequests(userId) {
    return this.requests.getByUser(userId);
  }

  static async getRequestsByStatus(status) {
    return this.requests.getByStatus(status);
  }

  static async getAllRequests() {
    return this.requests.getAll();
  }

  static subscribeToRequests(callback) {
    return this.realtime.subscribe(callback);
  }

  static async getRequestById(requestId) {
    return this.requests.getById(requestId);
  }

  static async getAvailableDrivers() {
    return this.drivers.getAvailable();
  }

  static async assignDriver(requestId, driverId) {
    return this.drivers.assign(requestId, driverId);
  }
}

//factory para crear datos de solicitud
export const createTowRequestData = (formData, serviceType, urgency, price, userId) => {
  //validar primero
  ValidationService.validateRequestData(formData, serviceType, urgency, price, userId);

  return {
    user_id: userId,
    user_phone: formData.telefono,
    service_type: serviceType,
    tow_type: 'standard',
    urgency: urgency || 'normal',
    price: parseInt(price, 10),
    origin: formData.origen,
    destination: formData.destino,
    vehicle_type: formData.tipoVehiculo || null,
    observations: formData.observaciones || null,
    status: 'pending',
  };
};

//exportar servicios individuales
export {
  RequestService,
  StatusService,
  DriverService,
  RealtimeService,
  ValidationService
};