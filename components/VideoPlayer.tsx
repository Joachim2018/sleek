
import React, { useRef, useEffect, useState } from 'react';
import { Video } from '../types';
import { ICONS, COLORS } from '../constants';

interface VideoPlayerProps {
  video: Video;
  isActive: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ video, isActive }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showHeart, setShowHeart] = useState(false);
  const [isLiked, setIsLiked] = useState(video.isLiked || false);
  const [likesCount, setLikesCount] = useState(video.likes);

  useEffect(() => {
    if (videoRef.current) {
      if (isActive) {
        videoRef.current.play().catch(e => console.log("Play interrupted", e));
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
        setIsPlaying(false);
      }
    }
  }, [isActive]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleDoubleTap = (e: React.MouseEvent) => {
    if (!isLiked) {
      setIsLiked(true);
      setLikesCount(prev => prev + 1);
    }
    setShowHeart(true);
    setTimeout(() => setShowHeart(false), 800);
  };

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <div 
      className="relative w-full h-full bg-black snap-start overflow-hidden flex items-center justify-center"
      onClick={togglePlay}
      onDoubleClick={handleDoubleTap}
    >
      {/* Background Blur for non-9:16 aspect ratio fill */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center blur-[100px] opacity-10"
        style={{ backgroundImage: `url(${video.thumbnail})` }}
      />

      <video
        ref={videoRef}
        className="relative z-10 w-full h-full object-contain pointer-events-none"
        src={video.url}
        loop
        playsInline
        muted={false}
      />

      {/* Double Tap Heart Animation */}
      {showHeart && (
        <div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none">
          <ICONS.Heart className="w-24 h-24 text-[#2E5BFF] fill-[#2E5BFF] animate-heart-pop drop-shadow-[0_0_15px_rgba(46,91,255,0.6)]" />
        </div>
      )}

      {/* Interaction Sidebar */}
      <div className="absolute right-4 bottom-28 z-30 flex flex-col items-center gap-7">
        <div className="relative mb-2">
          <div className="w-11 h-11 rounded-xl border border-white/20 overflow-hidden glass p-[1px]">
            <img src={video.creator.avatar} alt={video.creator.username} className="w-full h-full object-cover rounded-[10px]" />
          </div>
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#2E5BFF] rounded-full flex items-center justify-center border border-black">
            <ICONS.Plus className="w-2.5 h-2.5 text-white" />
          </div>
        </div>

        <button onClick={handleLikeClick} className="flex flex-col items-center group">
          <div className={`transition-all duration-200 group-active:scale-125 ${isLiked ? 'text-[#2E5BFF] fill-[#2E5BFF]' : 'text-white'}`}>
            <ICONS.Heart className={`w-7 h-7 ${isLiked ? 'fill-current' : ''}`} />
          </div>
          <span className="text-[10px] font-bold mt-1 text-white/90">{formatNumber(likesCount)}</span>
        </button>

        <button className="flex flex-col items-center group text-white">
          <ICONS.Comment className="w-7 h-7 group-active:scale-110 transition-transform" />
          <span className="text-[10px] font-bold mt-1 text-white/90">{formatNumber(video.comments)}</span>
        </button>

        <button className="flex flex-col items-center group text-white">
          <ICONS.Share className="w-7 h-7 group-active:scale-110 transition-transform" />
          <span className="text-[10px] font-bold mt-1 text-white/90">{formatNumber(video.shares)}</span>
        </button>

        {/* Brand record - sleek variant */}
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#2E5BFF] via-black to-[#F033FF] p-[2px] animate-[spin_5s_linear_infinite]">
          <div className="w-full h-full rounded-full overflow-hidden bg-black flex items-center justify-center">
             <div className="w-6 h-6 rounded-full overflow-hidden">
                <img src={video.thumbnail} className="w-full h-full object-cover" />
             </div>
          </div>
        </div>
      </div>

      {/* Bottom Info Section */}
      <div className="absolute left-0 bottom-0 w-full p-5 pb-14 z-20 bg-gradient-to-t from-black via-black/40 to-transparent">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="font-bold text-base tracking-tight">@{video.creator.username}</h3>
          <div className="w-3 h-3 bg-[#2E5BFF] rounded-full flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-2 h-2 fill-white"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
          </div>
        </div>
        <p className="text-sm line-clamp-2 mb-4 max-w-[80%] leading-relaxed text-white/90">
          {video.caption.split(' ').map((word, i) => 
            word.startsWith('#') ? <span key={i} className="text-[#F033FF] font-medium">{word} </span> : word + ' '
          )}
        </p>
        <div className="flex items-center gap-2 bg-white/5 backdrop-blur-md px-3 py-1.5 rounded-lg w-fit">
          <div className="w-3.5 h-3.5 text-[#2E5BFF]">
             <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
          </div>
          <div className="overflow-hidden whitespace-nowrap w-32">
            <div className="inline-block animate-[scroll-left_12s_linear_infinite] text-[10px] font-bold text-white/70 tracking-wide uppercase">
              {video.musicName}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scroll-left {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  );
};

export default VideoPlayer;
