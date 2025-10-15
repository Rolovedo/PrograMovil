# Configuración de Firebase para TOWX

## Pasos para configurar Firebase:

### 1. Crear proyecto en Firebase Console
1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Haz clic en "Crear un proyecto"
3. Nombra tu proyecto (ej: "towx-app")
4. Habilita Google Analytics (opcional)
5. Crea el proyecto

### 2. Configurar Firestore Database
1. En el panel lateral, ve a "Firestore Database"
2. Haz clic en "Crear base de datos"
3. Selecciona "Iniciar en modo de prueba" (para desarrollo)
4. Elige la ubicación más cercana a tu región
5. Haz clic en "Habilitar"

### 3. Configurar Authentication (opcional)
1. En el panel lateral, ve a "Authentication"
2. Haz clic en "Comenzar"
3. Ve a la pestaña "Sign-in method"
4. Habilita "Correo electrónico/contraseña" si necesitas autenticación

### 4. Obtener configuración del proyecto
1. Ve a "Configuración del proyecto" (ícono de engranaje)
2. Haz clic en "Configuración del proyecto"
3. Desplázate hacia abajo hasta "Tus aplicaciones"
4. Haz clic en el ícono de web (</>) para agregar una app web
5. Nombra tu app (ej: "towx-web")
6. Copia la configuración de Firebase

### 5. Actualizar archivo de configuración
Reemplaza los valores en `config/firebase.js` con tu configuración real:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyAZ4xjwxo6AsdgdnFvkpTPj5sWMIdtqHh8",
  authDomain: "towx-b0b44.firebaseapp.com",
  projectId: "towx-b0b44",
  storageBucket: "towx-b0b44.firebasestorage.app",
  messagingSenderId: "263540352695",
  appId: "1:263540352695:web:9bb4467cc4dc521a584f32",
  measurementId: "G-CTH27QWM0F"
};
```

### 6. Reglas de Firestore (para desarrollo)
En Firestore Database > Reglas, configura:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permitir lectura y escritura para todos (solo para desarrollo)
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

### 7. Estructura de datos en Firestore

#### Colección: `towRequests`
```javascript
{
  userId: "user-id",
  userPhone: "+56912345678",
  serviceType: "Remolque ligero",
  towType: "convencional",
  urgency: "normal",
  price: 54950,
  origin: "Dirección de origen",
  destination: "Dirección de destino",
  vehicleType: "Automóvil",
  observations: "Observaciones adicionales",
  status: "pending", // pending, confirmed, in_progress, completed, cancelled
  driverInfo: {
    name: "Juan Pérez",
    phone: "+56987654321",
    vehicle: "Toyota Hilux",
    plate: "ABC123"
  },
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### 8. Funciones útiles para el backend (opcional)
Puedes crear Cloud Functions para:
- Notificar a conductores sobre nuevas solicitudes
- Actualizar ubicaciones en tiempo real
- Enviar notificaciones push
- Procesar pagos

### 9. Seguridad en producción
Para producción, actualiza las reglas de Firestore:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /towRequests/{requestId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
  }
}
```

## Comandos útiles:

```bash
# Instalar Firebase CLI
npm install -g firebase-tools

# Inicializar proyecto
firebase init

# Desplegar reglas
firebase deploy --only firestore:rules

# Desplegar funciones
firebase deploy --only functions
```

## Notas importantes:
- Nunca expongas las claves de API en código público
- Usa variables de entorno para la configuración
- Configura reglas de seguridad apropiadas
- Haz backup regular de tu base de datos
- Monitorea el uso y costos en Firebase Console
