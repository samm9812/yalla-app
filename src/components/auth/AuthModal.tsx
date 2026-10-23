import React, { useState } from 'react';
import { X, Mail, Lock, User, Sparkles } from 'lucide-react';
import { supabase } from '../../services/supabaseClient';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isSignUp) {
        // 1. Registro en Supabase Auth
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });

        if (signUpError) throw signUpError;

        if (data.user) {
          // 2. Crear perfil inicial con 100 puntos de bienvenida
          const { error: profileError } = await supabase
            .from('profiles')
            .insert([
              {
                id: data.user.id,
                full_name: fullName || 'Noctámbulo Yalla',
                points: 100,
                level: 'Bronce'
              }
            ]);

          if (profileError) console.error('Error creando perfil:', profileError);
        }

        alert('¡Registro exitoso! Ya puedes iniciar sesión.');
        setIsSignUp(false);
      } else {
        // Inicio de Sesión
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) throw signInError;

        onSuccess();
        onClose();
      }
    } catch (err: any) {
      setError(err.message || 'Ocurrió un error en la autenticación.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(2, 6, 23, 0.85)',
      backdropFilter: 'blur(8px)',
      zIndex: 9999,
      display: 'grid',
      placeItems: 'center',
      padding: '16px',
      boxSizing: 'border-box',
      overflowY: 'auto'
    }}>
      <div style={{
        backgroundColor: '#0f172a',
        borderRadius: '24px',
        border: '1px solid #1e293b',
        width: '100%',
        maxWidth: '380px',
        padding: '24px',
        position: 'relative',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
        boxSizing: 'border-box',
        margin: 'auto'
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            backgroundColor: 'transparent',
            border: 'none',
            color: '#94a3b8',
            cursor: 'pointer',
            padding: '4px',
            zIndex: 10
          }}
        >
          <X style={{ width: '20px', height: '20px' }} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
          <div style={{
            display: 'inline-flex',
            backgroundColor: 'rgba(245, 158, 11, 0.1)',
            padding: '8px',
            borderRadius: '50%',
            marginBottom: '6px',
            border: '1px solid rgba(245, 158, 11, 0.3)'
          }}>
            <Sparkles style={{ width: '20px', height: '20px', color: '#fbbf24' }} />
          </div>
          <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#f8fafc', margin: 0 }}>
            {isSignUp ? 'Únete a Yalla' : 'Iniciar Sesión'}
          </h2>
          <p style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px', margin: 0 }}>
            {isSignUp ? 'Descubre la vida nocturna de Pasto y gana premios' : '¡Qué bueno verte de nuevo por la noche pastusa!'}
          </p>
        </div>

        {error && (
          <div style={{
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            color: '#f87171',
            padding: '8px 12px',
            borderRadius: '10px',
            fontSize: '11px',
            marginBottom: '12px',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {isSignUp && (
            <div>
              <label style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>Nombre completo</label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <User style={{ position: 'absolute', left: '12px', width: '16px', height: '16px', color: '#64748b' }} />
                <input
                  type="text"
                  placeholder="Tu nombre"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    backgroundColor: '#020617',
                    border: '1px solid #334155',
                    borderRadius: '12px',
                    padding: '8px 10px 8px 38px',
                    color: '#f8fafc',
                    fontSize: '13px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>
          )}

          <div>
            <label style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>Correo electrónico</label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <Mail style={{ position: 'absolute', left: '12px', width: '16px', height: '16px', color: '#64748b' }} />
              <input
                type="email"
                placeholder="tucorreo@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: '100%',
                  backgroundColor: '#020617',
                  border: '1px solid #334155',
                  borderRadius: '12px',
                  padding: '8px 10px 8px 38px',
                  color: '#f8fafc',
                  fontSize: '13px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>Contraseña</label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <Lock style={{ position: 'absolute', left: '12px', width: '16px', height: '16px', color: '#64748b' }} />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: '100%',
                  backgroundColor: '#020617',
                  border: '1px solid #334155',
                  borderRadius: '12px',
                  padding: '8px 10px 8px 38px',
                  color: '#f8fafc',
                  fontSize: '13px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              backgroundColor: '#f59e0b',
              color: '#020617',
              padding: '10px',
              borderRadius: '12px',
              fontWeight: 'bold',
              fontSize: '13px',
              border: 'none',
              cursor: 'pointer',
              marginTop: '4px'
            }}
          >
            {loading ? 'Procesando...' : isSignUp ? 'Registrarse' : 'Iniciar Sesión'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '14px' }}>
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              color: '#fbbf24',
              fontSize: '12px',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            {isSignUp ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate aquí'}
          </button>
        </div>
      </div>
    </div>
  );
};