import { useState } from 'react';
import type { TabType } from './types';
import { Header } from './components/layout/Header';
import { BottomNav } from './components/layout/BottomNav';
import { FeedView } from './components/feed/FeedView';
import { RouletteView } from './components/roulette/RouletteView';
import { CheckinView } from './components/checkin/CheckinView';
import { RewardsView } from './components/rewards/RewardsView';
import { MapView } from './components/map/MapView';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('feed');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex justify-center">
      <div className="w-full max-w-md bg-slate-950 min-h-screen flex flex-col relative border-x border-slate-900">
        <Header />

        <main className="flex-1 pb-20">
          {activeTab === 'feed' && <FeedView />}

        {activeTab === 'map' && <MapView />}

          {activeTab === 'roulette' && <RouletteView />}

          {activeTab === 'checkin' && <CheckinView />}

          {activeTab === 'rewards' && <RewardsView />}
        </main>

        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </div>
  );
}