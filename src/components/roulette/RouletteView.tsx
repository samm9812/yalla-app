import React, { useState, useEffect } from 'react';
import { Sparkles, Trophy, MapPin, Gift, Eye } from 'lucide-react';
import { getNearbyVenues } from '../../services/api';
import type { Venue } from '../../types';
import { VenueDetailModal } from '../feed/VenueDetailModal';

export const RouletteView: React.FC = () => {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [winner, setWinner] = useState<Venue | null>(null);
  const [selectedVenueModal, setSelectedVenueModal] = useState<Venue | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      // Coordenadas fijas de Pasto
      const data = await getNearbyVenues(1.2136, -77.2811);
      setVenues(data);
    };
    fetchData();
  }, []);

  const spinRoulette = () => {
    if (venues.length === 0 || isSpinning) return;

    setIsSpinning(true);
    setWinner(null);

    // Animación de selección aleatoria
    let counter = 0;
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * venues.length);
      setWinner(venues[randomIndex]);
      counter++;

      if (counter > 15) {
        clearInterval(interval);
        const finalWinner = venues[Math.floor(Math.random() * venues.length)];
        setWinner(finalWinner);
        setIsSpinning(false);
      }
    }, 120);
  };

  return (
    <div style={{ width: '100%', paddingBottom: '90px', boxSizing: 'border-box' }}>
      {/* Banner Principal */}
      <div style={{
        backgroundColor: '#0f172a',
        border: '1px solid #1e293b',
        padding: '16px',
        borderRadius: '16px',
        marginBottom: '20px',
        textAlign: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginBottom: '4px' }}>
          <Sparkles style={{ width: '16px', height: '16px', color: '#fbbf24' }} />
          <span style={{ fontSize: '11px', color: '#fbbf24', fontWeight: 'bold', textTransform: 'uppercase' }}>
            ¿Indeciso hoy?
          </span>
        </div>
        <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#f8fafc', margin: '0 0 6px 0' }}>
          Ruleta Nocturna
        </h2>
        <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>
          Deja que el azar elija el mejor parche en Pasto para ti.
        </p>
      </div>

      {/* Botón de Girar Ruleta */}
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <button
          onClick={spinRoulette}
          disabled={isSpinning}
          style={{
            backgroundColor: isSpinning ? '#475569' : '#f59e0b',
            color: '#020617',
            border: 'none',
            padding: '14px 28px',
            borderRadius: '14px',
            fontSize: '15px',
            fontWeight: '800',
            cursor: isSpinning ? 'not-allowed' : 'pointer',
            boxShadow: '0 10px 20px -5px rgba(245, 158, 11, 0.4)',
            transition: 'all 0.2s ease',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}
        >
          {isSpinning ? '🎲 Seleccionando...' : '🎰 Girar Ruleta'}
        </button>
      </div>

      {/* Tarjeta del Local Ganador */}
      {winner && (
        <div style={{
          backgroundColor: '#0f172a',
          border: '2px solid #f59e0b',
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: '0 10px 25px -5px rgba(245, 158, 11, 0.25)',
          animation: 'fadeIn 0.3s ease-in'
        }}>
          {/* Header Ganador */}
          <div style={{
            backgroundColor: '#f59e0b',
            color: '#020617',
            padding: '6px 12px',
            textAlign: 'center',
            fontSize: '11px',
            fontWeight: '800',
            textTransform: 'uppercase',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px'
          }}>
            <Trophy style={{ width: '14px', height: '14px' }} /> ¡Tu sitio ideal para hoy!
          </div>

          {/* Imagen */}
          <div style={{ position: 'relative', height: '180px' }}>
            <img
              src={winner.image}
              alt={winner.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <span style={{
              position: 'absolute',
              top: '12px',
              left: '12px',
              backgroundColor: 'rgba(2, 6, 23, 0.85)',
              color: '#fbbf24',
              padding: '4px 10px',
              borderRadius: '8px',
              fontSize: '10px',
              fontWeight: 'bold',
              textTransform: 'uppercase'
            }}>
              {winner.category}
            </span>
          </div>

          {/* Info del Ganador */}
          <div style={{ padding: '16px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#f8fafc', margin: '0 0 6px 0' }}>
              {winner.name}
            </h3>

            <p style={{ fontSize: '12px', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px', margin: '0 0 12px 0' }}>
              <MapPin style={{ width: '14px', height: '14px', color: '#f59e0b' }} />
              {winner.address}
            </p>

            <div style={{
              backgroundColor: 'rgba(245, 158, 11, 0.1)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              borderRadius: '12px',
              padding: '10px 12px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '16px'
            }}>
              <Gift style={{ width: '16px', height: '16px', color: '#fbbf24', flexShrink: 0 }} />
              <span style={{ fontSize: '12px', color: '#fcd34d', fontWeight: 'bold' }}>
                {winner.reward}
              </span>
            </div>

            {/* BOTÓN PARA ABRIR EL MODAL DE DETALLE */}
            <button
              onClick={() => setSelectedVenueModal(winner)}
              style={{
                width: '100%',
                backgroundColor: '#f59e0b',
                color: '#020617',
                border: 'none',
                padding: '12px',
                borderRadius: '12px',
                fontSize: '13px',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                cursor: 'pointer'
              }}
            >
              <Eye style={{ width: '16px', height: '16px' }} />
              Ver Detalles, Menú y Eventos
            </button>
          </div>
        </div>
      )}

      {/* Modal Reutilizado para Ver Detalles */}
      <VenueDetailModal
        venue={selectedVenueModal}
        onClose={() => setSelectedVenueModal(null)}
      />
    </div>
  );
};