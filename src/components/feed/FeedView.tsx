import React, { useEffect, useState } from 'react';
import { Star, MapPin, Sparkles, Navigation, Gift, Calendar, Ticket } from 'lucide-react';
import { supabase } from '../../services/supabaseClient';
import { VenueDetailModal } from './VenueDetailModal';
import { EventDetailModal } from './EventDetailModal';

export const FeedView: React.FC = () => {
  const [venues, setVenues] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [selectedVenue, setSelectedVenue] = useState<any | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    loadDataFromSupabase();
  }, []);

  const loadDataFromSupabase = async () => {
    try {
      setLoading(true);

      // 1. Cargar bares (venues) desde Supabase
      const { data: venuesData, error: venuesError } = await supabase
        .from('venues')
        .select('*');
        //console para verificar si hay error en la carga
     if (venuesError) console.error('Error en venues:', venuesError);
      if (venuesData) {
        console.log('Bares cargados:', venuesData);
        setVenues(venuesData);
      }

      // 2. Cargar eventos junto con el nombre del bar asociado
      const { data: eventsData, error: eventsError } = await supabase
        .from('events')
        .select('*');

      if (eventsError) console.error('Error en events:', eventsError);
      if (eventsData) {
        console.log('Eventos cargados desde Supabase:', eventsData);
        
        const formattedEvents = eventsData.map(ev => ({
          ...ev,
          flyerUrl: ev.flyer_url,
          dateText: ev.date_text,
          entryInfo: ev.entry_info,
          venueName: 'Local Asociado'
        }));
        setEvents(formattedEvents);
      }

    } catch (error) {
      console.error('Error general cargando datos de Supabase:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['todos', 'Eventos', 'Bar', 'Discoteca', 'Gastrobar', 'Salsa Bar'];

  const filteredVenues = selectedCategory === 'todos'
    ? venues
    : venues.filter((v: any) => v.category.toLowerCase().includes(selectedCategory.toLowerCase()));

  return (
    <div style={{ width: '100%', paddingBottom: '90px', boxSizing: 'border-box' }}>
      {/* Banner Principal */}
      <div style={{
        backgroundColor: '#0f172a',
        border: '1px solid #1e293b',
        padding: '16px',
        borderRadius: '16px',
        marginBottom: '16px',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
          <Sparkles style={{ width: '16px', height: '16px', color: '#fbbf24' }} />
          <span style={{ fontSize: '11px', color: '#fbbf24', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Explora Pasto
          </span>
        </div>
        <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#f8fafc', margin: '0 0 6px 0' }}>
          Vida Nocturna en Vivo
        </h2>
        <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>
          Descubre los mejores bares, discotecas y toques de este fin de semana.
        </p>
      </div>

      {/* Categorías (Filtros) */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '12px', marginBottom: '16px' }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: '8px 16px',
              borderRadius: '12px',
              fontSize: '12px',
              fontWeight: '600',
              whiteSpace: 'nowrap',
              border: selectedCategory === cat ? 'none' : '1px solid #1e293b',
              backgroundColor: selectedCategory === cat ? '#f59e0b' : '#0f172a',
              color: selectedCategory === cat ? '#020617' : '#94a3b8',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            {cat === 'todos' ? '🔥 Todos' : cat === 'Eventos' ? '🎉 Eventos' : cat}
          </button>
        ))}
      </div>

      {/* Estado de carga */}
      {loading ? (
        <div style={{ textAlign: 'center', color: '#94a3b8', padding: '40px 0', fontSize: '14px' }}>
          ⏳ Cargando locales y eventos desde Supabase...
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* SECCIÓN DE EVENTOS */}
          {(selectedCategory === 'todos' || selectedCategory === 'Eventos') && events.map((event) => (
            <div
              key={event.id}
              onClick={() => setSelectedEvent(event)}
              style={{
                backgroundColor: '#0f172a',
                borderRadius: '20px',
                overflow: 'hidden',
                border: '1px solid #334155',
                boxShadow: '0 10px 20px -5px rgba(245, 158, 11, 0.15)',
                position: 'relative',
                cursor: 'pointer'
              }}
            >
              <div style={{
                position: 'absolute',
                top: '12px',
                left: '12px',
                zIndex: 10,
                backgroundColor: '#f59e0b',
                color: '#020617',
                padding: '4px 10px',
                borderRadius: '8px',
                fontSize: '10px',
                fontWeight: '800',
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <Sparkles style={{ width: '12px', height: '12px' }} /> Evento en Vivo
              </div>

              <div style={{ position: 'relative', height: '200px', width: '100%' }}>
                <img
                  src={event.flyerUrl || 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80'}
                  alt={event.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, #0f172a 0%, transparent 80%)'
                }} />
              </div>

              <div style={{ padding: '16px', marginTop: '-20px', position: 'relative', zIndex: 5 }}>
                <span style={{ fontSize: '11px', color: '#fbbf24', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
                  <Calendar style={{ width: '13px', height: '13px' }} /> {event.dateText}
                </span>

                <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#f8fafc', margin: '0 0 4px 0' }}>
                  {event.title}
                </h3>

                <p style={{ fontSize: '12px', color: '#94a3b8', margin: '0 0 12px 0', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <MapPin style={{ width: '13px', height: '13px', color: '#f59e0b' }} /> {event.venueName}
                </p>

                <div style={{
                  backgroundColor: 'rgba(245, 158, 11, 0.1)',
                  border: '1px solid rgba(245, 158, 11, 0.3)',
                  borderRadius: '10px',
                  padding: '8px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <span style={{ fontSize: '11px', color: '#fcd34d', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Ticket style={{ width: '14px', height: '14px' }} /> {event.entryInfo}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {/* SECCIÓN DE LOCALES / BARES */}
          {selectedCategory !== 'Eventos' && filteredVenues.map((venue: any) => (
            <div
              key={venue.id}
              onClick={() => setSelectedVenue(venue)}
              style={{
                backgroundColor: '#0f172a',
                border: '1px solid #1e293b',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.4)',
                cursor: 'pointer',
                transition: 'transform 0.2s ease'
              }}
            >
              <div style={{ position: 'relative', width: '100%', height: '180px', backgroundColor: '#1e293b' }}>
                <img
                  src={venue.image || 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80'}
                  alt={venue.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  backgroundColor: 'rgba(2, 6, 23, 0.85)',
                  backdropFilter: 'blur(4px)',
                  padding: '4px 10px',
                  borderRadius: '8px',
                  fontSize: '10px',
                  fontWeight: 'bold',
                  color: '#fbbf24',
                  textTransform: 'uppercase',
                  border: '1px solid rgba(245, 158, 11, 0.3)'
                }}>
                  {venue.category}
                </div>

                <div style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  backgroundColor: 'rgba(2, 6, 23, 0.85)',
                  backdropFilter: 'blur(4px)',
                  padding: '4px 8px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  color: '#fbbf24',
                  border: '1px solid rgba(245, 158, 11, 0.3)'
                }}>
                  <Star style={{ width: '13px', height: '13px', fill: '#fbbf24' }} />
                  {venue.rating}
                </div>
              </div>

              <div style={{ padding: '16px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#f8fafc', margin: '0 0 6px 0' }}>
                  {venue.name}
                </h3>

                <p style={{ fontSize: '12px', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '6px', margin: '0 0 12px 0' }}>
                  <MapPin style={{ width: '14px', height: '14px', color: '#64748b' }} />
                  {venue.address}
                </p>

                <div style={{
                  backgroundColor: 'rgba(245, 158, 11, 0.1)',
                  border: '1px solid rgba(245, 158, 11, 0.25)',
                  borderRadius: '12px',
                  padding: '10px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '14px'
                }}>
                  <Gift style={{ width: '16px', height: '16px', color: '#fbbf24', flexShrink: 0 }} />
                  <span style={{ fontSize: '12px', color: '#fcd34d', fontWeight: '500' }}>
                    {venue.reward}
                  </span>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue.name + ' ' + venue.address)}`, '_blank');
                  }}
                  style={{
                    width: '100%',
                    backgroundColor: '#020617',
                    border: '1px solid #334155',
                    color: '#f8fafc',
                    padding: '10px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    cursor: 'pointer'
                  }}
                >
                  <Navigation style={{ width: '14px', height: '14px', color: '#38bdf8' }} />
                  Ver Ruta en Google Maps
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modales */}
      <VenueDetailModal
        venue={selectedVenue}
        onClose={() => setSelectedVenue(null)}
      />

      <EventDetailModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </div>
  );
};