export class PriceUtils {
    //configuracion de precios
    static priceConfig = {
        basePrice: 50000,
        pricePerKm: 2000,
    };

    //calcular precio basado en distancia
    static calculatePrice(distanceKm, config = this.priceConfig) {
        const basePrice = config.basePrice;
        const distancePrice = distanceKm * config.pricePerKm;
        return Math.round(basePrice + distancePrice);
    }

    //formatear precio para mostrar
    static formatPrice(price) {
        if (!price) return '$0';
        return `$${Math.round(price).toLocaleString('es-CO')}`;
    }

    //calcular precio con urgencia (para uso futuro)
    static calculatePriceWithUrgency(distanceKm, urgency = 'normal') {
        const basePrice = this.calculatePrice(distanceKm);
        
        const urgencyMultipliers = {
            'normal': 1,
            'urgente': 1.5,
            'critico': 2
        };

        const multiplier = urgencyMultipliers[urgency] || 1;
        return Math.round(basePrice * multiplier);
    }

    //obtener configuracion de precios
    static getPriceConfig() {
        return this.priceConfig;
    }

    //actualizar configuracion de precios
    static updatePriceConfig(newConfig) {
        this.priceConfig = { ...this.priceConfig, ...newConfig };
    }
}