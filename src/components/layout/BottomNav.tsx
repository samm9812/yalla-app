import React from 'react';
import { Compass, Map, Disc, CheckSquare, Trophy } from 'lucide-react';

interface BottomNavProps {
  currentTab?: string;
  activeTab?: string;
  onTabChange?: (tab: any) => void;
  setActiveTab?: (tab: any) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ 
  currentTab, 
  activeTab, 
  onTabChange, 
  setActiveTab 
}) => {
  // Unificamos para que funcione sin importar qué prop use App.tsx
  const current = currentTab || activeTab || 'feed';
  const changeTab = onTabChange || setActiveTab || (() => {});

  const tabs = [
    { id: 'feed', label: 'Feed', icon: Compass },
    { id: 'map', label: 'Mapa', icon: Map },
    { id: 'roulette', label: 'Ruleta', icon: Disc },
    { id: 'checkin', label: 'Check-in', icon: CheckSquare },
    { id: 'rewards', label: 'Premios', icon: Trophy },
  ];

  return (
    <nav style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: '#0f172a',
      borderTop: '1px solid #1e293b',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      padding: '8px 4px',
      zIndex: 1000,
      boxShadow: '0 -4px 10px rgba(0, 0, 0, 0.3)'
    }}>
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = current === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => changeTab(tab.id)}
            style={{
              background: 'none',
              border: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: isActive ? '#f59e0b' : '#64748b',
              flex: 1,
              padding: '6px 0',
              transition: 'color 0.2s ease'
            }}
          >
            <Icon style={{ width: '20px', height: '20px', marginBottom: '3px' }} />
            <span style={{
              fontSize: '10px',
              fontWeight: isActive ? 'bold' : 'normal',
              lineHeight: '1'
            }}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};