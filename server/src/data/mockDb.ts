
export interface Venue {
  id: string;
  name: string;
  category: string;
  address: string;
  lat: number;
  lng: number;
  rating: number;
  reward: string;
  discount: string;
  image: string;
  distance: string;
  distanceText: string;
  isPromoted?: boolean; // <-- Agregamos esta línea
}

export const VENUES: Venue[] = [
  {
    id: '1',
    name: 'Cervecería Av. Estudiantes',
    category: 'Bar',
    address: 'Av. de los Estudiantes, Pasto',
    lat: 1.2210,
    lng: -77.2800,
    rating: 4.8,
    reward: 'Pinta artesanal de bienvenida 2x1',
    discount: '2x1 Cerveza',
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80',
    distance: '300m',
    distanceText: 'A 5 min a pie',
    isPromoted: true
  },
  {
    id: '2',
    name: 'Club Maridiaz',
    category: 'Discoteca',
    address: 'Sector Maridiaz, Pasto',
    lat: 1.2235,
    lng: -77.2830,
    rating: 4.7,
    reward: 'Shot de aguardiente de bienvenida',
    discount: 'Shot gratis',
    image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&q=80',
    distance: '650m',
    distanceText: 'A 8 min a pie',
    isPromoted: false
  },
  {
    id: '3',
    name: 'Gastrobar Pandiaco',
    category: 'Gastrobar',
    address: 'Sector Pandiaco, Pasto',
    lat: 1.2290,
    lng: -77.2850,
    rating: 4.9,
    reward: '15% Dcto en picadas y entradas',
    discount: '15% OFF',
    image: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&q=80',
    distance: '1.2 km',
    distanceText: 'A 4 min en vehículo',
    isPromoted: true
  },
  {
    id: '4',
    name: 'Salsa & Son Bar',
    category: 'Salsa Bar',
    address: 'Calle 18 #24-12, Pasto',
    lat: 1.2150,
    lng: -77.2780,
    rating: 4.6,
    reward: '2x1 en cocteles de la casa',
    discount: '2x1 Cocteles',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80',
    distance: '1.8 km',
    distanceText: 'A 6 min en vehículo',
    isPromoted: false
  }
];

export const MOCK_VENUES = VENUES;

export const USER_POINTS = {
  points: 170,
  level: 'Plata'
};