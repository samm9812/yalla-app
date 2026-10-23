import { Venue, EventItem, Reward } from '../types';

export const MOCK_VENUES: Venue[] = [
  {
    id: 'v1',
    name: 'Bodega BBC - Granada',
    category: 'Bar / Cervecería',
    rating: 4.8,
    distance: '450m',
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80',
    address: 'Av. 9N #15-22, Cali',
    reward: 'Shot artesanal de bienvenida',
    discount: '15% desc. en jarra artesanal',
    lat: 3.4516,
    lng: -76.5320
  },
  {
    id: 'v2',
    name: 'Mikitá Club',
    category: 'Discoteca / Crossover',
    rating: 4.7,
    distance: '1.2km',
    image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=800&q=80',
    address: 'Zona Rosa Menga, Cali',
    reward: 'Pase VIP sin fila antes de las 11 PM',
    discount: '2x1 en Cócteles de Autor',
    lat: 3.4810,
    lng: -76.5210
  },
  {
    id: 'v3',
    name: 'La Topa Tolondra',
    category: 'Salsa Bar / Cultural',
    rating: 4.9,
    distance: '800m',
    image: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=800&q=80',
    address: 'Calle 5 #13-27, Cali',
    reward: 'Clase de salsa gratis previa al evento',
    discount: '10% en consumición general',
    lat: 3.4420,
    lng: -76.5380
  }
];

export const MOCK_EVENTS: EventItem[] = [
  {
    id: 'e1',
    title: 'Noche de Rock & Blues en Vivo',
    venue: 'Bodega BBC - Granada',
    time: '8:00 PM',
    date: 'Hoy',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80',
    attendees: 124,
    price: 'Entrada Libre',
    tag: 'Música en Vivo'
  },
  {
    id: 'e2',
    title: 'Noche Crossover & DJ Set',
    venue: 'Mikitá Club',
    time: '10:00 PM',
    date: 'Hoy',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
    attendees: 310,
    price: '$20.000 COP',
    tag: 'Fiesta'
  }
];

export const MOCK_REWARDS: Reward[] = [
  {
    id: 'r1',
    title: 'Cóctel de la casa gratis',
    points: 300,
    code: 'YALLA-COCKTAIL-2026',
    venue: 'Mikitá Club'
  },
  {
    id: 'r2',
    title: '20% de descuento en la cuenta',
    points: 500,
    code: 'YALLA-PROMO-20',
    venue: 'Bodega BBC'
  }
];