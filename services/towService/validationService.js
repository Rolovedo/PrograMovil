export class ValidationService {
  //validar datos de solicitud
  static validateRequestData(formData, serviceType, urgency, price, userId) {
    const errors = [];

    if (!userId) errors.push('Se requiere user_id');
    if (!formData?.telefono) errors.push('Se requiere teléfono de contacto');
    if (!serviceType) errors.push('Se requiere tipo de servicio');
    if (!formData?.origen) errors.push('Se requiere origen');
    if (!formData?.destino) errors.push('Se requiere destino');
    if (!price || price <= 0) errors.push('Se requiere precio válido');

    if (errors.length > 0) {
      throw new Error(`Errores de validación: ${errors.join(', ')}`);
    }

    return true;
  }

  //validar telefono
  static validatePhone(phone) {
    const phoneRegex = /^[+]?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
  }

  //validar tipo de servicio
  static validateServiceType(serviceType) {
    const validTypes = ['grua', 'mecanico', 'llanta', 'combustible'];
    return validTypes.includes(serviceType);
  }

  //validar urgencia
  static validateUrgency(urgency) {
    const validUrgencies = ['normal', 'urgente', 'critico'];
    return validUrgencies.includes(urgency);
  }
}