
import React from 'react';
import { ICONS } from '../constants';

const Discover: React.FC = () => {
  const trends = [
    { tag: 'SummerVibes', count: '1.2B' },
    { tag: 'SleekDance', count: '850M' },
    { tag: 'TechTips', count: '420M' },
    { tag: 'HealthyEating', count: '120M' },
    { tag: 'MinimalistDesign', count: '55M' }
  ];

  return (
    <div className="pt-4 pb-20 bg-black min-h-screen overflow-y-auto no-scrollbar">
      {/* Search Bar */}
      <div className="px-4 mb-6">
        <div className="flex items-center gap-3 bg-white/10 rounded-lg p-3">
          <ICONS.Search className="w-5 h-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search Sleek" 
            className="bg-transparent border-none outline-none text-white w-full placeholder:text-gray-500"
          />
        </div>
      </div>

      {/* Hero Banner */}
      <div className="px-4 mb-8">
        <div className="h-48 rounded-xl bg-gradient-to-br from-[#FE2C55] to-[#25F4EE] relative overflow-hidden flex items-center p-8">
          <div className="z-10 max-w-[60%]">
            <h3 className="text-2xl font-black italic uppercase text-white leading-tight">Join the Sleek Challenge</h3>
            <button className="mt-4 px-6 py-2 bg-white text-black font-bold rounded-full text-sm">Learn More</button>
          </div>
          <div className="absolute right-[-10%] bottom-[-10%] opacity-20 transform rotate-12">
            <ICONS.Plus className="w-64 h-64" />
          </div>
        </div>
      </div>

      {/* Trending Sections */}
      <div className="space-y-8">
        <div>
          <div className="px-4 flex justify-between items-center mb-4">
            <h4 className="font-bold flex items-center gap-2">
              <span className="text-xl">#</span> Trending Hashtags
            </h4>
            <button className="text-xs text-gray-400">View All &gt;</button>
          </div>
          <div className="flex overflow-x-auto gap-1 px-4 no-scrollbar">
            {trends.map(t => (
              <div key={t.tag} className="flex-none w-32 aspect-[3/4] bg-white/5 rounded-lg p-3 flex flex-col justify-end">
                <div className="text-xs font-bold text-white truncate">#{t.tag}</div>
                <div className="text-[10px] text-gray-500">{t.count} views</div>
              </div>
            ))}
          </div>
        </div>

        <div className="px-4">
          <h4 className="font-bold mb-4 flex items-center gap-2">
            <div className="w-5 h-5 bg-blue-500 rounded flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-3 h-3 fill-white"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
            </div>
            Recommended Audio
          </h4>
          <div className="space-y-4">
            {[1,2,3].map(i => (
              <div key={i} className="flex items-center justify-between p-3 glass rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/10 rounded-lg overflow-hidden">
                    <img src={`https://picsum.photos/seed/${i*10}/200/200`} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="font-bold text-sm">Trending Beat #{i}</div>
                    <div className="text-xs text-gray-400">Viral Sound • 2.4M videos</div>
                  </div>
                </div>
                <button className="w-8 h-8 flex items-center justify-center bg-white/10 rounded-full">
                   <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white"><path d="M8 5v14l11-7z"/></svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discover;
