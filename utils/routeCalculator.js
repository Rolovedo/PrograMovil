export class RouteCalculator {
  static async calculateRoute(origin, destination) {
    console.log('Iniciando cálculo de ruta:', { origin, destination });

    try {
      //intentar primero con OpenRouteService
      const openRouteResult = await this.calculateWithOpenRoute(origin, destination);
      if (openRouteResult.success) {
        return openRouteResult.data;
      }

      //usar OSRM
      const osrmResult = await this.calculateWithOSRM(origin, destination);
      if (osrmResult.success) {
        return osrmResult.data;
      }

      //calculo estimado
      return this.calculateEstimatedRoute(origin, destination);

    } catch (error) {
      console.error('Error en calculo de ruta:', error);
      return this.calculateEstimatedRoute(origin, destination);
    }
  }

  static async calculateWithOpenRoute(origin, destination) {
    try {
      console.log('Intentando OpenRouteService...');
      
      const API_KEY = '5b3ce3597851110001cf6248a4c7b7bf7a4d4d3b8ae8c0e0a8d7e7b7';
      const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${API_KEY}&start=${origin.longitude},${origin.latitude}&end=${destination.longitude},${destination.latitude}&format=geojson&geometry_format=geojson&instructions=true`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/geo+json'
        }
      });

      if (!response.ok) {
        throw new Error(`OpenRoute HTTP ${response.status}`);
      }

      const data = await response.json();
      
      if (data.features && data.features[0]) {
        const route = data.features[0];
        const coordinates = route.geometry.coordinates.map(coord => ({
          latitude: coord[1],
          longitude: coord[0]
        }));
        
        const distance = route.properties.summary.distance / 1000; // de metros a km
        const duration = route.properties.summary.duration / 60; // de segundos a minutos

        return {
          success: true,
          data: {
            coordinates,
            distance,
            duration,
            provider: 'OpenRouteService'
          }
        };
      }

      return { success: false };
    } catch (error) {
      console.log('OpenRouteService falló:', error.message);
      return { success: false };
    }
  }

  static async calculateWithOSRM(origin, destination) {
    try {
      console.log('Intentando OSRM...');
      
      const url = `https://router.project-osrm.org/route/v1/driving/${origin.longitude},${origin.latitude};${destination.longitude},${destination.latitude}?overview=full&geometries=geojson`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`OSRM HTTP ${response.status}`);
      }

      const data = await response.json();
      
      if (data.routes && data.routes[0]) {
        const route = data.routes[0];
        const coordinates = route.geometry.coordinates.map(coord => ({
          latitude: coord[1],
          longitude: coord[0]
        }));
        
        const distance = route.distance / 1000; // km
        const duration = route.duration / 60; // minutos

        return {
          success: true,
          data: {
            coordinates,
            distance,
            duration,
            provider: 'OSRM'
          }
        };
      }

      return { success: false };
    } catch (error) {
      console.log('OSRM falló:', error.message);
      return { success: false };
    }
  }

  static calculateEstimatedRoute(origin, destination) {
    console.log('Usando calculo estimado...');
    
    const straightCoordinates = [origin, destination];
    
    //formula haversine para distancia
    const R = 6371; // Radio terrestre en km
    const dLat = (destination.latitude - origin.latitude) * Math.PI / 180;
    const dLon = (destination.longitude - origin.longitude) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(origin.latitude * Math.PI / 180) * Math.cos(destination.latitude * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const straightDistance = R * c;
    
    //correccion para calles reales
    const cityFactor = 1.4;
    const distance = straightDistance * cityFactor;
    
    //estimacion de tiempo (velocidad promedio urbana 25 km/h)
    const duration = distance / 25 * 60;
    
    return {
      coordinates: straightCoordinates,
      distance,
      duration,
      provider: 'Estimado'
    };
  }
}