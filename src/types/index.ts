export type TabType = 'feed' | 'map' | 'roulette' | 'checkin' | 'rewards';

export interface Venue {
  id: string;
  name: string;
  category: string;
  rating: number;
  distance: string;
  distanceText?: string;   // <--- Agrega esto
  distanceMeters?: number; // <--- Agrega esto
  image: string;
  address: string;
  reward: string;
  discount: string;
  lat: number;
  lng: number;
}

export interface EventItem {
  id: string;
  title: string;
  venue: string;
  time: string;
  date: string;
  image: string;
  attendees: number;
  price: string;
  tag: string;
}

export interface Reward {
  id: string;
  title: string;
  points: number;
  code: string;
  venue: string;
}

export interface VenueEvent {
  id: string;
  venueId: string;
  venueName: string;
  title: string;
  dateText: string; // Ej: "ESTE SÁBADO • 9:00 PM"
  flyerUrl: string;
  category: string;
  description: string;
  entryInfo: string; // Ej: "Entrada libre con Check-in Yalla" o "Cover: $15.000"
}