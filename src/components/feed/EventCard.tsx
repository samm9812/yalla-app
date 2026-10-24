import React from 'react';
import { Calendar, MapPin, Ticket, Sparkles, Navigation } from 'lucide-react';
import type { VenueEvent } from '../../types';

interface EventCardProps {
  event: VenueEvent;
  onSelectEvent?: (event: VenueEvent) => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onSelectEvent }) => {
  // Construir URLs de navegación
  const venueQuery = encodeURIComponent(`${event.venueName}`);
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${venueQuery}`;
  const wazeUrl = `https://waze.com/ul?q=${venueQuery}&navigate=yes`;

  return (
    <div
      onClick={() => onSelectEvent && onSelectEvent(event)}
      style={{
        backgroundColor: '#0f172a',
        borderRadius: '20px',
        overflow: 'hidden',
        border: '1px solid #334155',
        boxShadow: '0 10px 20px -5px rgba(245, 158, 11, 0.15)',
        cursor: 'pointer',
        position: 'relative'
      }}
    >
      {/* Badge Superior: Evento Destacado */}
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

      {/* Contenedor del Flyer */}
      <div style={{ position: 'relative', height: '220px', width: '100%' }}>
        <img
          src={event.flyerUrl}
          alt={event.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, #0f172a 0%, transparent 70%)'
        }} />
      </div>

      {/* Detalles del Evento */}
      <div style={{ padding: '16px', marginTop: '-30px', position: 'relative', zIndex: 5 }}>
        <span style={{
          fontSize: '11px',
          color: '#fbbf24',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          marginBottom: '4px'
        }}>
          <Calendar style={{ width: '13px', height: '13px' }} /> {event.dateText}
        </span>

        <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#f8fafc', margin: '0 0 6px 0' }}>
          {event.title}
        </h3>

        <p style={{ fontSize: '12px', color: '#94a3b8', margin: '0 0 10px 0', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <MapPin style={{ width: '13px', height: '13px', color: '#f59e0b' }} /> {event.venueName}
        </p>

        {/* Botones para Abrir Navegación en Google Maps y Waze */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            style={{
              flex: 1,
              backgroundColor: '#1e293b',
              border: '1px solid #334155',
              color: '#38bdf8',
              padding: '6px 10px',
              borderRadius: '8px',
              fontSize: '11px',
              fontWeight: '600',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px'
            }}
          >
            <Navigation style={{ width: '12px', height: '12px' }} /> Google Maps
          </a>

          <a
            href={wazeUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            style={{
              flex: 1,
              backgroundColor: '#1e293b',
              border: '1px solid #334155',
              color: '#38bdf8',
              padding: '6px 10px',
              borderRadius: '8px',
              fontSize: '11px',
              fontWeight: '600',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px'
            }}
          >
            <Navigation style={{ width: '12px', height: '12px' }} /> Waze
          </a>
        </div>

        {/* Info de Entrada / Beneficio Yalla */}
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
          <span style={{ fontSize: '10px', color: '#020617', backgroundColor: '#fbbf24', padding: '2px 8px', borderRadius: '6px', fontWeight: '800' }}>
            Ver Flyer
          </span>
        </div>
      </div>
    </div>
  );
};