
import React, { useState, useEffect } from 'react';
import { BottomNav, TopNav } from './components/Navigation';
import Feed from './components/Feed';
import Profile from './components/Profile';
import Discover from './components/Discover';
import UploadFlow from './components/UploadFlow';
import { MOCK_VIDEOS, MOCK_USERS } from './services/mockData';
import { TabType, Video } from './types';
import { generateAICaption } from './services/geminiService';

const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState('home');
  const [feedTab, setFeedTab] = useState<TabType>('foryou');
  const [isLoading, setIsLoading] = useState(true);
  const [showUploadFlow, setShowUploadFlow] = useState(false);
  const [videos, setVideos] = useState<Video[]>(MOCK_VIDEOS);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleUploadComplete = (data: { caption: string, music: string | null }) => {
    const newVideo: Video = {
      id: `v${Date.now()}`,
      url: 'https://assets.mixkit.co/videos/preview/mixkit-urban-skater-showing-off-his-skills-34533-large.mp4',
      thumbnail: 'https://picsum.photos/seed/new/400/700',
      caption: data.caption || "New sleek moment!",
      hashtags: ['new', 'sleek'],
      creator: MOCK_USERS[0],
      likes: 0,
      comments: 0,
      shares: 0,
      musicName: data.music ? `${data.music} - ${MOCK_USERS[0].username}` : 'Original Sound - ' + MOCK_USERS[0].username,
      isLiked: false
    };

    setVideos([newVideo, ...videos]);
    setShowUploadFlow(false);
    setCurrentTab('home');
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-[100]">
        <div className="w-24 h-24 relative mb-6">
           <div className="absolute inset-0 border-[3px] border-t-[#2E5BFF] border-r-[#F033FF] border-b-white/5 border-l-white/5 rounded-2xl animate-spin duration-[2s]"></div>
           <div className="absolute inset-0 flex items-center justify-center font-outfit font-black text-4xl italic tracking-tighter">S</div>
        </div>
        <p className="font-outfit text-white/20 tracking-[0.5em] uppercase text-[10px] animate-pulse">Experience Sleek</p>
      </div>
    );
  }

  const renderContent = () => {
    switch (currentTab) {
      case 'home':
        return (
          <>
            <TopNav activeTab={feedTab} onTabChange={setFeedTab} />
            <Feed videos={videos} />
          </>
        );
      case 'discover':
        return <Discover />;
      case 'profile':
        return <Profile user={MOCK_USERS[0]} videos={videos.filter(v => v.creator.id === MOCK_USERS[0].id)} />;
      default:
        return (
          <div className="flex items-center justify-center h-full text-gray-500">
            Coming Soon
          </div>
        );
    }
  };

  const handleTabChange = (tab: string) => {
    if (tab === 'upload') {
      setShowUploadFlow(true);
    } else {
      setCurrentTab(tab);
    }
  };

  return (
    <main className="fixed inset-0 flex flex-col items-center bg-[#050505]">
      {/* Mobile Frame Container */}
      <div className="w-full max-w-md h-full bg-black relative flex flex-col overflow-hidden shadow-[0_0_100px_rgba(46,91,255,0.15)] border-x border-white/[0.03]">
        {renderContent()}
        <BottomNav activeTab={currentTab} onTabChange={handleTabChange} />
        
        {showUploadFlow && (
          <UploadFlow 
            onCancel={() => setShowUploadFlow(false)} 
            onComplete={handleUploadComplete} 
          />
        )}
      </div>

      <style>{`
        /* Global override for active tab colors in BottomNav */
        nav button.text-white {
          color: #2E5BFF !important;
        }
        nav button[isSpecial] .bg-white {
           background-color: #2E5BFF !important;
        }
        /* Custom scrollbar behavior for Sleek feel */
        .no-scrollbar {
          scroll-behavior: smooth;
        }
      `}</style>
    </main>
  );
};

export default App;
