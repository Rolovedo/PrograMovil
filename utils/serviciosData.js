export const serviciosData = [
  { 
    id: '1', 
    image: require('../assets/gruacarro.png'), 
    titulo: 'Convencional', 
    promo: true,
    precio: '$54.950'
  },
  { 
    id: '2', 
    image: require('../assets/gruaxl.png'), 
    titulo: 'XL',
    precio: '$75.000'
  },
  { 
    id: '3', 
    image: require('../assets/gruamoto.png'), 
    titulo: 'Moto', 
    promo: true,
    precio: '$35.000'
  },
  { 
    id: '4', 
    image: require('../assets/gruataller.png'), 
    titulo: 'Taller',
    precio: '$65.000'
  },
];

//funcion para obtener servicio por ID
export const getServicioById = (id) => {
  return serviciosData.find(servicio => servicio.id === id);
};

//funcion para obtener servicios con promoción
export const getServiciosConPromo = () => {
  return serviciosData.filter(servicio => servicio.promo);
};

//funcion para obtener todos los servicios
export const getAllServicios = () => {
  return serviciosData;
};