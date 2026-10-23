import React from 'react';
import { X, MapPin, Star, Music, DollarSign, Calendar, Gift, ExternalLink } from 'lucide-react';
import type { Venue } from '../../types';

interface VenueDetailModalProps {
  venue: Venue | null;
  onClose: () => void;
}

export const VenueDetailModal: React.FC<VenueDetailModalProps> = ({ venue, onClose }) => {
  if (!venue) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(2, 6, 23, 0.85)',
        backdropFilter: 'blur(8px)',
        zIndex: 9999, // Asegura que esté por encima de la barra de navegación inferior
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center', // Centrado perfecto en cualquier posición de la pantalla
        padding: '16px',
        boxSizing: 'border-box'
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()} // Previene que se cierre al hacer click dentro del modal
        style={{
          backgroundColor: '#0f172a',
          borderRadius: '24px',
          border: '1px solid #1e293b',
          width: '100%',
          maxWidth: '420px',
          maxHeight: '75vh', // Altura controlada para pantallas móviles
          overflowY: 'auto', // Scroll interno fluido si el contenido es largo
          WebkitOverflowScrolling: 'touch',
          position: 'relative',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
          paddingBottom: '24px'
        }}
      >
        {/* Imagen de Cabecera con Botón de Cierre */}
        <div style={{ position: 'relative', height: '200px', width: '100%', flexShrink: 0 }}>
          <img
            src={venue.image}
            alt={venue.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              backgroundColor: 'rgba(15, 23, 42, 0.75)',
              border: 'none',
              color: '#f8fafc',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              backdropFilter: 'blur(4px)'
            }}
          >
            <X style={{ width: '20px', height: '20px' }} />
          </button>
          
          <span style={{
            position: 'absolute',
            bottom: '12px',
            left: '16px',
            backgroundColor: '#f59e0b',
            color: '#020617',
            padding: '4px 10px',
            borderRadius: '8px',
            fontSize: '11px',
            fontWeight: 'bold',
            textTransform: 'uppercase'
          }}>
            {venue.category}
          </span>
        </div>

        {/* Información del Local */}
        <div style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#f8fafc', margin: 0 }}>
              {venue.name}
            </h2>
            <span style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              color: '#fbbf24',
              fontWeight: 'bold',
              fontSize: '14px',
              flexShrink: 0
            }}>
              <Star style={{ width: '16px', height: '16px', fill: '#fbbf24' }} /> {venue.rating}
            </span>
          </div>

          <p style={{ color: '#94a3b8', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px', margin: '8px 0 16px 0' }}>
            <MapPin style={{ width: '14px', height: '14px', color: '#f59e0b', flexShrink: 0 }} /> {venue.address}
          </p>

          {/* Tarjeta de Recompensa Activa */}
          <div style={{
            backgroundColor: 'rgba(245, 158, 11, 0.1)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            borderRadius: '14px',
            padding: '12px 16px',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <Gift style={{ width: '24px', height: '24px', color: '#fbbf24', flexShrink: 0 }} />
            <div>
              <span style={{ fontSize: '10px', color: '#fcd34d', fontWeight: 'bold', textTransform: 'uppercase' }}>Promoción Yalla</span>
              <p style={{ fontSize: '13px', fontWeight: 'bold', color: '#f8fafc', margin: 0 }}>{venue.reward}</p>
            </div>
          </div>

          {/* Detalle de Ambiente, Música y Precios */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
            <div style={{ backgroundColor: '#1e293b', padding: '12px', borderRadius: '12px' }}>
              <span style={{ fontSize: '10px', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Music style={{ width: '12px', height: '12px' }} /> Música / Ambiente
              </span>
              <p style={{ fontSize: '13px', fontWeight: 'bold', color: '#f8fafc', margin: '4px 0 0 0' }}>Rock & Cerveza</p>
            </div>
            <div style={{ backgroundColor: '#1e293b', padding: '12px', borderRadius: '12px' }}>
              <span style={{ fontSize: '10px', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <DollarSign style={{ width: '12px', height: '12px' }} /> Precios Promedio
              </span>
              <p style={{ fontSize: '13px', fontWeight: 'bold', color: '#f8fafc', margin: '4px 0 0 0' }}>$$ (Moderado)</p>
            </div>
          </div>

          {/* Próximo Evento / Flyer */}
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ fontSize: '12px', fontWeight: 'bold', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Calendar style={{ width: '14px', height: '14px', color: '#f59e0b' }} /> Próximo Evento
            </h4>
            <div style={{
              backgroundColor: '#1e293b',
              borderRadius: '12px',
              padding: '12px',
              display: 'flex',
              gap: '12px',
              alignItems: 'center'
            }}>
              <div style={{
                backgroundColor: '#f59e0b',
                color: '#020617',
                padding: '8px',
                borderRadius: '8px',
                textAlign: 'center',
                fontWeight: '800',
                fontSize: '11px',
                minWidth: '42px'
              }}>
                VIE <br/> 24
              </div>
              <div>
                <h5 style={{ fontSize: '13px', fontWeight: 'bold', color: '#f8fafc', margin: 0 }}>Noche de Cocteles & DJ Set</h5>
                <p style={{ fontSize: '11px', color: '#94a3b8', margin: '2px 0 0 0' }}>Entrada libre con check-in en Yalla</p>
              </div>
            </div>
          </div>

          {/* Acciones principales */}
          <div style={{ display: 'flex', gap: '10px' }}>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${venue.lat},${venue.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                flex: 1,
                backgroundColor: '#f59e0b',
                color: '#020617',
                padding: '12px',
                borderRadius: '12px',
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: '13px',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}
            >
              <ExternalLink style={{ width: '16px', height: '16px' }} /> Abrir Carta / Menú
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};