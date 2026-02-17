
import React from 'react';
import { ICONS, COLORS } from '../constants';
import { TabType } from '../types';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'home', icon: ICONS.Home, label: 'Feed' },
    { id: 'discover', icon: ICONS.Search, label: 'Search' },
    { id: 'upload', icon: ICONS.Plus, label: '', isSpecial: true },
    { id: 'inbox', icon: ICONS.Inbox, label: 'Activity' },
    { id: 'profile', icon: ICONS.User, label: 'You' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full h-16 bg-black/80 backdrop-blur-xl border-t border-white/[0.05] flex items-center justify-around z-50 px-3">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        
        if (tab.isSpecial) {
          return (
            <button 
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="relative flex items-center justify-center w-14 h-9 group active:scale-90 transition-transform"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-[#2E5BFF] to-[#F033FF] rounded-xl opacity-80" />
              <div className="relative w-[92%] h-[92%] bg-black rounded-[10px] flex items-center justify-center">
                <Icon className="w-5 h-5 text-white" />
              </div>
            </button>
          );
        }

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center gap-1 transition-all duration-300 ${isActive ? 'text-[#2E5BFF]' : 'text-white/40 hover:text-white/60'}`}
          >
            <Icon className="w-6 h-6" />
            <span className="text-[9px] font-bold tracking-tight uppercase">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

interface TopNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const TopNav: React.FC<TopNavProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-16 flex items-center justify-center gap-8 z-50 bg-gradient-to-b from-black/80 to-transparent pt-2">
      <button 
        onClick={() => onTabChange('following')}
        className={`text-sm font-black tracking-widest uppercase transition-all duration-300 ${activeTab === 'following' ? 'text-white' : 'text-white/30'}`}
      >
        Following
      </button>
      <button 
        onClick={() => onTabChange('foryou')}
        className={`text-sm font-black tracking-widest uppercase transition-all duration-300 relative ${activeTab === 'foryou' ? 'text-white' : 'text-white/30'}`}
      >
        For You
        {activeTab === 'foryou' && (
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#2E5BFF] rounded-full shadow-[0_0_8px_#2E5BFF]" />
        )}
      </button>
    </div>
  );
};
