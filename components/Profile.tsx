
import React from 'react';
import { User, Video } from '../types';
import { ICONS } from '../constants';

interface ProfileProps {
  user: User;
  videos: Video[];
}

const Profile: React.FC<ProfileProps> = ({ user, videos }) => {
  return (
    <div className="pt-12 pb-20 px-4 min-h-screen bg-black overflow-y-auto no-scrollbar">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button className="p-2"><ICONS.User className="w-6 h-6" /></button>
        <span className="font-bold text-lg">{user.displayName}</span>
        <button className="p-2">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
        </button>
      </div>

      {/* Profile Info */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-24 h-24 rounded-full border-2 border-white/10 p-1 mb-4">
          <img src={user.avatar} className="w-full h-full rounded-full object-cover" />
        </div>
        <h2 className="font-bold text-lg mb-1">@{user.username}</h2>
        
        <div className="flex gap-6 mt-4">
          <div className="text-center">
            <div className="font-bold">{(user.following / 1000).toFixed(1)}K</div>
            <div className="text-xs text-gray-400">Following</div>
          </div>
          <div className="text-center">
            <div className="font-bold">{(user.followers / 1000).toFixed(1)}K</div>
            <div className="text-xs text-gray-400">Followers</div>
          </div>
          <div className="text-center">
            <div className="font-bold">{(user.totalLikes / 1000).toFixed(1)}K</div>
            <div className="text-xs text-gray-400">Likes</div>
          </div>
        </div>

        <div className="flex gap-2 mt-6 w-full px-4">
          <button className="flex-1 py-3 bg-[#FE2C55] rounded-md font-bold text-sm">Follow</button>
          <button className="px-6 py-3 bg-white/10 rounded-md"><ICONS.Share className="w-5 h-5" /></button>
        </div>

        <p className="mt-4 text-sm text-center px-8 text-gray-300">
          {user.bio}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/10">
        <button className="flex-1 py-3 border-b-2 border-white flex justify-center"><ICONS.Plus className="w-6 h-6 rotate-45" /></button>
        <button className="flex-1 py-3 flex justify-center text-gray-500"><ICONS.Heart className="w-6 h-6" /></button>
        <button className="flex-1 py-3 flex justify-center text-gray-500"><ICONS.Inbox className="w-6 h-6" /></button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-0.5 mt-0.5">
        {videos.map(v => (
          <div key={v.id} className="aspect-[3/4] relative bg-gray-900 overflow-hidden group">
            <img src={v.thumbnail} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
            <div className="absolute bottom-2 left-2 flex items-center gap-1">
              <ICONS.Heart className="w-3 h-3 text-white" />
              <span className="text-[10px] font-bold">{(v.likes / 1000).toFixed(1)}K</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
