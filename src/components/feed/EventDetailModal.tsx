import React from 'react';
import { X, MapPin, Calendar, Ticket, Sparkles, ExternalLink } from 'lucide-react';
import type { VenueEvent } from '../../types';

interface EventDetailModalProps {
  event: VenueEvent | null;
  onClose: () => void;
}

export const EventDetailModal: React.FC<EventDetailModalProps> = ({ event, onClose }) => {
  if (!event) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(2, 6, 23, 0.85)',
      backdropFilter: 'blur(8px)',
      zIndex: 1000,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '16px'
    }}>
      <div style={{
        backgroundColor: '#0f172a',
        borderRadius: '24px',
        border: '1px solid #1e293b',
        width: '100%',
        maxWidth: '440px',
        maxHeight: '90vh',
        overflowY: 'auto',
        position: 'relative',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)'
      }}>
        {/* Botón de Cierre */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            backgroundColor: 'rgba(15, 23, 42, 0.8)',
            border: 'none',
            color: '#f8fafc',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 20
          }}
        >
          <X style={{ width: '20px', height: '20px' }} />
        </button>

        {/* Flyer Completo */}
        <div style={{ width: '100%', maxHeight: '350px', backgroundColor: '#020617', display: 'flex', justifyContent: 'center' }}>
          <img
            src={event.flyerUrl}
            alt={event.title}
            style={{ width: '100%', height: '100%', objectFit: 'contain', maxHeight: '350px' }}
          />
        </div>

        {/* Información del Evento */}
        <div style={{ padding: '20px' }}>
          <span style={{
            fontSize: '11px',
            backgroundColor: 'rgba(245, 158, 11, 0.1)',
            color: '#fbbf24',
            padding: '4px 10px',
            borderRadius: '8px',
            fontWeight: 'bold',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            marginBottom: '8px',
            border: '1px solid rgba(245, 158, 11, 0.3)'
          }}>
            <Sparkles style={{ width: '12px', height: '12px' }} /> {event.category}
          </span>

          <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#f8fafc', margin: '0 0 6px 0' }}>
            {event.title}
          </h2>

          <p style={{ color: '#fbbf24', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', margin: '0 0 12px 0', fontWeight: 'bold' }}>
            <Calendar style={{ width: '14px', height: '14px' }} /> {event.dateText}
          </p>

          <p style={{ color: '#94a3b8', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', margin: '0 0 16px 0' }}>
            <MapPin style={{ width: '14px', height: '14px', color: '#f59e0b' }} /> {event.venueName}
          </p>

          {/* Descripción */}
          <p style={{ color: '#cbd5e1', fontSize: '13px', lineHeight: '1.5', margin: '0 0 16px 0' }}>
            {event.description}
          </p>

          {/* Info de Entrada / Beneficio */}
          <div style={{
            backgroundColor: 'rgba(245, 158, 11, 0.1)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            borderRadius: '12px',
            padding: '12px 16px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <Ticket style={{ width: '24px', height: '24px', color: '#fbbf24' }} />
            <div>
              <span style={{ fontSize: '10px', color: '#fcd34d', fontWeight: 'bold', textTransform: 'uppercase' }}>Condición de Ingreso</span>
              <p style={{ fontSize: '13px', fontWeight: 'bold', color: '#f8fafc', margin: 0 }}>{event.entryInfo}</p>
            </div>
          </div>

          {/* Botón de acción */}
          <button
            onClick={onClose}
            style={{
              width: '100%',
              backgroundColor: '#f59e0b',
              color: '#020617',
              padding: '12px',
              borderRadius: '12px',
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: '13px',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            ¡Entendido, nos vemos allá!
          </button>
        </div>
      </div>
    </div>
  );
};