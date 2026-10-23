import React, { useEffect, useState } from 'react';
import { MapPin, Navigation, Star, Gift,  Compass } from 'lucide-react';
import { supabase } from '../../services/supabaseClient';

export const MapView: React.FC = () => {
  const [venues, setVenues] = useState<any[]>([]);
  const [selectedVenue, setSelectedVenue] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVenues();
  }, []);

  const fetchVenues = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('venues')
        .select('*');

      if (error) throw error;
      if (data) {
        setVenues(data);
        if (data.length > 0) setSelectedVenue(data[0]); // Seleccionar el primero por defecto
      }
    } catch (err) {
      console.error('Error cargando mapa:', err);
    } finally {
      setLoading(false);
    }
  };

  const openGoogleMaps = (venue: any) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${venue.lat},${venue.lng}`;
    window.open(url, '_blank');
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', color: '#94a3b8', padding: '40px 0', fontSize: '14px' }}>
        ⏳ Cargando mapa y locales de Pasto...
      </div>
    );
  }

  return (
    <div style={{ width: '100%', paddingBottom: '90px', boxSizing: 'border-box' }}>
      {/* Encabezado */}
      <div style={{
        backgroundColor: '#0f172a',
        border: '1px solid #1e293b',
        padding: '16px',
        borderRadius: '20px',
        marginBottom: '16px',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
          <Compass style={{ width: '16px', height: '16px', color: '#fbbf24' }} />
          <span style={{ fontSize: '11px', color: '#fbbf24', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Mapa Interactivo
          </span>
        </div>
        <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#f8fafc', margin: '0 0 4px 0' }}>
          Explora la Ruta Nocturna
        </h2>
        <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>
          Ubica los bares, discotecas y gastrobares aliados más cercanos en Pasto.
        </p>
      </div>

      {/* Visor de Mapa Embebido (Centrado en Pasto) */}
      <div style={{
        width: '100%',
        height: '240px',
        borderRadius: '20px',
        overflow: 'hidden',
        border: '1px solid #334155',
        marginBottom: '16px',
        position: 'relative',
        backgroundColor: '#020617'
      }}>
        <iframe
          title="Mapa de Pasto Yalla"
          width="100%"
          height="100%"
          frameBorder="0"
          scrolling="no"
          marginHeight={0}
          marginWidth={0}
          src={
            selectedVenue
              ? `https://maps.google.com/maps?q=${selectedVenue.lat},${selectedVenue.lng}&z=16&output=embed`
              : `https://maps.google.com/maps?q=1.2210,-77.2800&z=14&output=embed`
          }
          style={{ filter: 'contrast(1.1) opacity(0.9)' }}
        />
      </div>

      {/* Selector de Locales (Pines Rápidos) */}
      <h3 style={{ fontSize: '14px', fontWeight: 'bold', color: '#f8fafc', marginBottom: '10px' }}>
        Locales Cercanos en Pasto ({venues.length})
      </h3>

      <div style={{
        display: 'flex',
        gap: '12px',
        overflowX: 'auto',
        paddingBottom: '12px',
        marginBottom: '16px'
      }}>
        {venues.map((venue) => {
          const isSelected = selectedVenue?.id === venue.id;
          return (
            <div
              key={venue.id}
              onClick={() => setSelectedVenue(venue)}
              style={{
                minWidth: '200px',
                backgroundColor: isSelected ? '#1e293b' : '#0f172a',
                border: isSelected ? '2px solid #f59e0b' : '1px solid #1e293b',
                borderRadius: '16px',
                padding: '12px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                flexShrink: 0
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{
                  fontSize: '10px',
                  fontWeight: 'bold',
                  color: '#fbbf24',
                  backgroundColor: 'rgba(245, 158, 11, 0.1)',
                  padding: '2px 6px',
                  borderRadius: '6px',
                  textTransform: 'uppercase'
                }}>
                  {venue.category}
                </span>
                <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '3px' }}>
                  <Star style={{ width: '12px', height: '12px', fill: '#fbbf24' }} />
                  {venue.rating}
                </span>
              </div>

              <h4 style={{ fontSize: '14px', fontWeight: 'bold', color: '#f8fafc', margin: '0 0 4px 0' }}>
                {venue.name}
              </h4>

              <p style={{ fontSize: '11px', color: '#94a3b8', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {venue.address}
              </p>
            </div>
          );
        })}
      </div>

      {/* Tarjeta de Detalle del Local Seleccionado */}
      {selectedVenue && (
        <div style={{
          backgroundColor: '#0f172a',
          border: '1px solid #334155',
          borderRadius: '20px',
          padding: '16px',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.4)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#f8fafc', margin: 0 }}>
              {selectedVenue.name}
            </h3>
            <span style={{
              backgroundColor: '#f59e0b',
              color: '#020617',
              fontSize: '11px',
              fontWeight: '800',
              padding: '4px 8px',
              borderRadius: '8px'
            }}>
              {selectedVenue.category}
            </span>
          </div>

          <p style={{ fontSize: '12px', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '6px', margin: '0 0 12px 0' }}>
            <MapPin style={{ width: '14px', height: '14px', color: '#f59e0b' }} />
            {selectedVenue.address}
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
              Recompensa: {selectedVenue.reward}
            </span>
          </div>

          <button
            onClick={() => openGoogleMaps(selectedVenue)}
            style={{
              width: '100%',
              backgroundColor: '#38bdf8',
              color: '#020617',
              border: 'none',
              padding: '12px',
              borderRadius: '12px',
              fontSize: '13px',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              cursor: 'pointer'
            }}
          >
            <Navigation style={{ width: '16px', height: '16px' }} />
            Iniciar Ruta en Google Maps / Waze
          </button>
        </div>
      )}
    </div>
  );
};