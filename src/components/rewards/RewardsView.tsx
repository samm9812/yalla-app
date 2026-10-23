import React, { useEffect, useState } from 'react';
import { Gift,  Award, CheckCircle2, AlertCircle } from 'lucide-react';
import { supabase } from '../../services/supabaseClient';

interface RewardItem {
  id: string;
  title: string;
  cost: number;
  description: string;
  venueName: string;
}

export const RewardsView: React.FC = () => {
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [redeemingId, setRedeemingId] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Catálogo de premios equilibrado para Pasto
  const rewardsList: RewardItem[] = [
    {
      id: 'rew-1',
      title: 'Shot de la Casa o Cerveza Nacional',
      cost: 350,
      description: 'Válido por consumo mínimo en barra o mesa.',
      venueName: 'Salsa & Son / Club Maridiaz'
    },
    {
      id: 'rew-2',
      title: '2x1 en Cócteles de Autor',
      cost: 600,
      description: 'Compra 1 cóctel artesanal y recibe el segundo gratis.',
      venueName: 'Cervecería Av. Estudiantes'
    },
    {
      id: 'rew-3',
      title: '15% OFF en Picadas y Entradas',
      cost: 800,
      description: 'Aplica en consumos de comida superiores a $40.000 COP.',
      venueName: 'Gastrobar Pandiaco'
    },
    {
      id: 'rew-4',
      title: 'Pase VIP sin Fila + Cover Gratis',
      cost: 1200,
      description: 'Ingreso directo para ti y un acompañante este fin de semana.',
      venueName: 'Todos los locales asociados'
    }
  ];

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        if (data) setUserProfile(data);
      }
    } catch (err) {
      console.error('Error al obtener perfil:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRedeem = async (reward: RewardItem) => {
    if (!userProfile) {
      setMessage({ type: 'error', text: 'Debes iniciar sesión para canjear premios.' });
      return;
    }

    if (userProfile.points < reward.cost) {
      setMessage({ type: 'error', text: `Necesitas ${reward.cost - userProfile.points} puntos más para este premio.` });
      return;
    }

    setRedeemingId(reward.id);
    setMessage(null);

    try {
      const newPoints = userProfile.points - reward.cost;

      // Actualizar puntos en Supabase
      const { error } = await supabase
        .from('profiles')
        .update({ points: newPoints })
        .eq('id', userProfile.id);

      if (error) throw error;

      setUserProfile({ ...userProfile, points: newPoints });
      setMessage({ type: 'success', text: `🎉 ¡Canje exitoso! Presenta tu pantalla en caja para reclamar: ${reward.title}` });

    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: 'Ocurrió un error al procesar el canje.' });
    } finally {
      setRedeemingId(null);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', color: '#94a3b8', padding: '40px 0', fontSize: '14px' }}>
        ⏳ Cargando tu balance de puntos...
      </div>
    );
  }

  return (
    <div style={{ width: '100%', paddingBottom: '90px', boxSizing: 'border-box' }}>
      {/* Banner de Estado de Puntos */}
      <div style={{
        backgroundColor: '#0f172a',
        border: '1px solid #1e293b',
        padding: '20px',
        borderRadius: '20px',
        marginBottom: '20px',
        position: 'relative',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <div>
            <span style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 'bold' }}>
              Tu Saldo Acumulado
            </span>
            <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#fbbf24', margin: '2px 0 0 0' }}>
              {userProfile?.points || 0} <span style={{ fontSize: '16px', color: '#f8fafc' }}>Pts</span>
            </h2>
          </div>
          <div style={{
            backgroundColor: 'rgba(245, 158, 11, 0.1)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            padding: '8px 14px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <Award style={{ width: '18px', height: '18px', color: '#fbbf24' }} />
            <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#fbbf24' }}>
              {userProfile?.level || 'Bronce'}
            </span>
          </div>
        </div>

        <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>
          Acumula más puntos haciendo Check-in en tus salidas de fin de semana.
        </p>
      </div>

      {/* Mensajes de Notificación */}
      {message && (
        <div style={{
          marginBottom: '20px',
          backgroundColor: message.type === 'success' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
          border: `1px solid ${message.type === 'success' ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
          color: message.type === 'success' ? '#4ade80' : '#f87171',
          padding: '12px 16px',
          borderRadius: '14px',
          fontSize: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          {message.type === 'success' ? <CheckCircle2 style={{ width: '18px', height: '18px', flexShrink: 0 }} /> : <AlertCircle style={{ width: '18px', height: '18px', flexShrink: 0 }} />}
          <span>{message.text}</span>
        </div>
      )}

      {/* Lista de Premios */}
      <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#f8fafc', marginBottom: '12px' }}>
        Catálogo de Premios
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {rewardsList.map((reward) => {
          const canAfford = (userProfile?.points || 0) >= reward.cost;

          return (
            <div
              key={reward.id}
              style={{
                backgroundColor: '#0f172a',
                border: '1px solid #1e293b',
                borderRadius: '16px',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: 'bold', color: '#f8fafc', margin: '0 0 4px 0' }}>
                    {reward.title}
                  </h4>
                  <span style={{ fontSize: '11px', color: '#38bdf8', fontWeight: '600' }}>
                    📍 {reward.venueName}
                  </span>
                </div>
                <span style={{
                  backgroundColor: 'rgba(245, 158, 11, 0.15)',
                  color: '#fbbf24',
                  fontSize: '12px',
                  fontWeight: '800',
                  padding: '4px 8px',
                  borderRadius: '8px',
                  border: '1px solid rgba(245, 158, 11, 0.3)',
                  flexShrink: 0
                }}>
                  {reward.cost} Pts
                </span>
              </div>

              <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>
                {reward.description}
              </p>

              <button
                onClick={() => handleRedeem(reward)}
                disabled={!canAfford || redeemingId === reward.id}
                style={{
                  width: '100%',
                  marginTop: '4px',
                  backgroundColor: canAfford ? '#f59e0b' : '#1e293b',
                  color: canAfford ? '#020617' : '#64748b',
                  border: 'none',
                  padding: '10px',
                  borderRadius: '10px',
                  fontWeight: 'bold',
                  fontSize: '12px',
                  cursor: canAfford ? 'pointer' : 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <Gift style={{ width: '14px', height: '14px' }} />
                {redeemingId === reward.id ? 'Procesando...' : canAfford ? 'Canjear Premio' : 'Puntos Insuficientes'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};