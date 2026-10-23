import React, { useEffect, useState } from 'react';
import { Flame, LogOut, User as UserIcon } from 'lucide-react';
import { supabase } from '../../services/supabaseClient';
import { AuthModal } from '../auth/AuthModal';

export const Header: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    // Comprobar sesión actual
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Escuchar cambios de autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      backgroundColor: 'rgba(2, 6, 23, 0.9)',
      backdropFilter: 'blur(8px)',
      borderBottom: '1px solid #1e293b',
      padding: '12px 16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      {/* Logo y Nombre */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{
          backgroundColor: '#f59e0b',
          borderRadius: '10px',
          padding: '6px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Flame style={{ width: '20px', height: '20px', color: '#020617', fill: '#020617' }} />
        </div>
        <div>
          <h1 style={{ fontSize: '18px', fontWeight: '900', color: '#f8fafc', margin: 0, letterSpacing: '0.5px' }}>
            YALLA
          </h1>
          <span style={{ fontSize: '10px', color: '#f59e0b', fontWeight: '700', textTransform: 'uppercase' }}>
            Pasto Nights
          </span>
        </div>
      </div>

      {/* Botón de Autenticación */}
      <div>
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#0f172a',
              border: '1px solid #334155',
              padding: '6px 10px',
              borderRadius: '20px'
            }}>
              <UserIcon style={{ width: '14px', height: '14px', color: '#fbbf24' }} />
              <span style={{ fontSize: '11px', color: '#f8fafc', fontWeight: '600', maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {user.email.split('@')[0]}
              </span>
            </div>
            <button
              onClick={handleLogout}
              style={{
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                color: '#f87171',
                padding: '6px',
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              title="Cerrar sesión"
            >
              <LogOut style={{ width: '14px', height: '14px' }} />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsAuthModalOpen(true)}
            style={{
              backgroundColor: '#f59e0b',
              color: '#020617',
              border: 'none',
              padding: '6px 14px',
              borderRadius: '12px',
              fontSize: '12px',
              fontWeight: '800',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)'
            }}
          >
            Sign In
          </button>
        )}
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={() => setIsAuthModalOpen(false)}
      />
    </header>
  );
};