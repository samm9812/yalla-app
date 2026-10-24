import React, { useState, useEffect } from 'react';
import { QrCode, Sparkles, CheckCircle2, AlertCircle, ShieldCheck, Camera, X } from 'lucide-react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { supabase } from '../../services/supabaseClient';

export const CheckinView: React.FC = () => {
  const [tokenInput, setTokenInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  useEffect(() => {
    let scanner: Html5QrcodeScanner | null = null;

    if (isScanning) {
      scanner = new Html5QrcodeScanner(
        "reader",
        { fps: 10, qrbox: { width: 250, height: 250 } },
        /* verbose= */ false
      );

      scanner.render(
        (decodedText) => {
          // Cuando la cámara detecta un QR
          setTokenInput(decodedText);
          setIsScanning(false);
          if (scanner) {
            scanner.clear().catch(err => console.error(err));
          }
          // Disparar validación automáticamente
          processCheckin(decodedText);
        },
        (error) => {
          // Ignorar errores de escaneo continuo por cuadro
        }
      );
    }

    return () => {
      if (scanner) {
        scanner.clear().catch(err => console.error(err));
      }
    };
  }, [isScanning]);

  const fetchUserProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      if (data) setUserProfile(data);
    }
  };

  const processCheckin = async (codeToValidate: string) => {
    if (!codeToValidate.trim()) return;

    setLoading(true);
    setMessage(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setMessage({ type: 'error', text: 'Debes iniciar sesión para realizar el check-in.' });
        setLoading(false);
        return;
      }

      // 1. Buscar el token dinámico en la base de datos
      const { data: tokenData, error: tokenError } = await supabase
        .from('qr_tokens')
        .select('*')
        .eq('token', codeToValidate.trim())
        .single();

      if (tokenError || !tokenData) {
        setMessage({ type: 'error', text: '❌ Código QR de pago inválido o no encontrado.' });
        setLoading(false);
        return;
      }

      // 2. Validar si ya fue usado (Anti-fraude)
      if (tokenData.is_used) {
        setMessage({ type: 'error', text: '⚠️ Este código de factura ya fue reclamado previamente.' });
        setLoading(false);
        return;
      }

      // 3. Validar si expiró
      if (new Date() > new Date(tokenData.expires_at)) {
        setMessage({ type: 'error', text: '⏰ Este código QR ha expirado. Solicita un nuevo comprobante en caja.' });
        setLoading(false);
        return;
      }

      // 4. Marcar token como usado
      const { error: updateError } = await supabase
        .from('qr_tokens')
        .update({ is_used: true })
        .eq('id', tokenData.id);

      if (updateError) throw updateError;

      // 5. Registrar el check-in
      const { error: checkinError } = await supabase
        .from('checkins')
        .insert([
          {
            user_id: user.id,
            venue_id: tokenData.venue_id,
            points_earned: 50
          }
        ]);

      if (checkinError) throw checkinError;

      // 6. Actualizar los puntos del usuario
      const currentPoints = userProfile?.points || 100;
      const newPoints = currentPoints + 50;

      const { error: profileError } = await supabase
        .from('profiles')
        .update({ points: newPoints })
        .eq('id', user.id);

      if (profileError) throw profileError;

      setMessage({ type: 'success', text: '🎉 ¡Pago verificado! Has sumado +50 Yallacoins a tu cuenta.' });
      setTokenInput('');
      fetchUserProfile();

    } catch (err: any) {
      console.error(err);
      setMessage({ type: 'error', text: 'Ocurrió un error al procesar el check-in de tu consumo.' });
    } finally {
      setLoading(false);
    }
  };

  const handleValidateAndCheckin = (e: React.FormEvent) => {
    e.preventDefault();
    processCheckin(tokenInput);
  };

  return (
    <div style={{ width: '100%', paddingBottom: '90px', boxSizing: 'border-box' }}>
      {/* Encabezado */}
      <div style={{
        backgroundColor: '#0f172a',
        border: '1px solid #1e293b',
        padding: '20px',
        borderRadius: '20px',
        marginBottom: '20px',
        textAlign: 'center',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)'
      }}>
        <div style={{
          display: 'inline-flex',
          backgroundColor: 'rgba(245, 158, 11, 0.1)',
          padding: '10px',
          borderRadius: '50%',
          marginBottom: '10px',
          border: '1px solid rgba(245, 158, 11, 0.3)'
        }}>
          <QrCode style={{ width: '28px', height: '28px', color: '#fbbf24' }} />
        </div>
        <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#f8fafc', margin: '0 0 6px 0' }}>
          Validar Consumo y Recompensa
        </h2>
        <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0, maxWidth: '280px', marginLeft: 'auto', marginRight: 'auto' }}>
          Escanea el código QR impreso en tu factura de consumo o ingresa el código alfanumérico entregado en caja.
        </p>
      </div>

      {/* Saldo de Puntos Actual */}
      {userProfile && (
        <div style={{
          backgroundColor: '#1e293b',
          borderRadius: '16px',
          padding: '16px',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          border: '1px solid #334155'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Sparkles style={{ width: '20px', height: '20px', color: '#fbbf24' }} />
            <div>
              <span style={{ fontSize: '11px', color: '#94a3b8', display: 'block' }}>Tus Yallacoins</span>
              <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#f8fafc' }}>{userProfile.points} Pts</span>
            </div>
          </div>
          <span style={{
            backgroundColor: 'rgba(245, 158, 11, 0.15)',
            color: '#fbbf24',
            padding: '4px 10px',
            borderRadius: '8px',
            fontSize: '11px',
            fontWeight: 'bold',
            border: '1px solid rgba(245, 158, 11, 0.3)'
          }}>
            Nivel {userProfile.level || 1}
          </span>
        </div>
      )}

      {/* Sección del Escáner con Cámara */}
      <div style={{
        backgroundColor: '#0f172a',
        border: '1px solid #1e293b',
        borderRadius: '20px',
        padding: '20px',
        marginBottom: '20px',
        textAlign: 'center'
      }}>
        {!isScanning ? (
          <button
            onClick={() => setIsScanning(true)}
            style={{
              width: '100%',
              backgroundColor: '#f59e0b',
              color: '#020617',
              padding: '14px',
              borderRadius: '12px',
              fontWeight: 'bold',
              fontSize: '14px',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <Camera style={{ width: '20px', height: '20px' }} />
            Escanear QR de Factura con Cámara
          </button>
        ) : (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '12px', color: '#f8fafc', fontWeight: '600' }}>Aponta al código QR de la factura</span>
              <button
                onClick={() => setIsScanning(false)}
                style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}
              >
                <X style={{ width: '20px', height: '20px' }} />
              </button>
            </div>
            <div id="reader" style={{ width: '100%', borderRadius: '12px', overflow: 'hidden' }}></div>
          </div>
        )}
      </div>

      {/* Formulario de Entrada Manual */}
      <div style={{
        backgroundColor: '#0f172a',
        border: '1px solid #1e293b',
        borderRadius: '20px',
        padding: '20px',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)'
      }}>
        <form onSubmit={handleValidateAndCheckin} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ fontSize: '12px', color: '#94a3b8', display: 'block', marginBottom: '6px', fontWeight: '600' }}>
              O ingresa el Código Manual del Comprobante
            </label>
            <input
              type="text"
              placeholder="Ej. YALLA-ABC123XYZ"
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value)}
              style={{
                width: '100%',
                backgroundColor: '#020617',
                border: '1px solid #334155',
                borderRadius: '12px',
                padding: '12px 14px',
                color: '#f8fafc',
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              backgroundColor: '#f59e0b',
              color: '#020617',
              padding: '12px',
              borderRadius: '12px',
              fontWeight: 'bold',
              fontSize: '14px',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <ShieldCheck style={{ width: '18px', height: '18px' }} />
            {loading ? 'Validando consumo...' : 'Validar Check-in Manual'}
          </button>
        </form>

        {message && (
          <div style={{
            marginTop: '16px',
            backgroundColor: message.type === 'success' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
            border: `1px solid ${message.type === 'success' ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
            color: message.type === 'success' ? '#4ade80' : '#f87171',
            padding: '12px',
            borderRadius: '12px',
            fontSize: '12px',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}>
            {message.type === 'success' ? <CheckCircle2 style={{ width: '16px', height: '16px' }} /> : <AlertCircle style={{ width: '16px', height: '16px' }} />}
            {message.text}
          </div>
        )}
      </div>
    </div>
  );
};