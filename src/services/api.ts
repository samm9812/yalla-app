import { supabase } from './supabaseClient';
import type { Venue, VenueEvent } from '../types';

// Función para calcular distancia en kilómetros usando la fórmula Haversine
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Radio de la Tierra en km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// 1. Obtener Bares/Locales desde Supabase con cálculo de distancia
export const getNearbyVenues = async (userLat: number, userLng: number): Promise<Venue[]> => {
  try {
    const { data, error } = await supabase
      .from('venues')
      .select('*');

    if (error) {
      console.error('Error fetching venues from Supabase:', error);
      return [];
    }

    if (!data) return [];

    // Formatear y calcular distancias reales en Pasto
    return data.map((item: any) => {
      const distKm = calculateDistance(userLat, userLng, item.lat, item.lng);
      const distText = distKm < 1 
        ? `${Math.round(distKm * 1000)} m` 
        : `${distKm.toFixed(1)} km`;

      return {
        id: item.id,
        name: item.name,
        category: item.category,
        address: item.address,
        lat: item.lat,
        lng: item.lng,
        rating: Number(item.rating),
        reward: item.reward,
        discount: item.discount,
        image: item.image,
        isPromoted: item.is_promoted,
        distance: distText, // Convertido a string para cumplir el tipo Venue
        distanceText: distText
      };
    });
  } catch (err) {
    console.error('Unexpected error:', err);
    return [];
  }
};

// 2. Obtener Eventos / Flyers desde Supabase
export const getEvents = async (): Promise<VenueEvent[]> => {
  try {
    const { data, error } = await supabase
      .from('events')
      .select('*, venues(name)')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching events:', error);
      return [];
    }

    if (!data) return [];

    return data.map((item: any) => ({
      id: item.id,
      venueId: item.venue_id,
      venueName: item.venues?.name || 'Local en Pasto',
      title: item.title,
      dateText: item.date_text,
      flyerUrl: item.flyer_url,
      category: item.category,
      description: item.description || '',
      entryInfo: item.entry_info || 'Entrada Libre'
    }));
  } catch (err) {
    console.error('Error fetching events:', err);
    return [];
  }
};