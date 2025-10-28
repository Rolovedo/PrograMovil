export class DistanceUtils {
    //calcular distancia usando formula haversine
    static calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; //radio de la Tierra en km
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
            Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c;
    }

    //calcular distancia entre dos puntos (objetos con lat/lng)
    static calculateDistanceBetweenPoints(point1, point2) {
        return this.calculateDistance(
            point1.latitude,
            point1.longitude,
            point2.latitude,
            point2.longitude
        );
    }

    //formatear distancia para mostrar
    static formatDistance(distanceKm) {
        if (distanceKm < 1) {
            return `${Math.round(distanceKm * 1000)}m`;
        }
        return `${distanceKm.toFixed(1)}km`;
    }

    //verificar si dos puntos estan dentro de un radio especifico
    static isWithinRadius(point1, point2, radiusKm) {
        const distance = this.calculateDistanceBetweenPoints(point1, point2);
        return distance <= radiusKm;
    }
}