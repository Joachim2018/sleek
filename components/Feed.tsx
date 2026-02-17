
import React, { useState, useEffect, useRef } from 'react';
import { Video } from '../types';
import VideoPlayer from './VideoPlayer';

interface FeedProps {
  videos: Video[];
}

const Feed: React.FC<FeedProps> = ({ videos }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const index = Math.round(containerRef.current.scrollTop / containerRef.current.clientHeight);
      if (index !== activeIndex) {
        setActiveIndex(index);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true });
    }
    return () => container?.removeEventListener('scroll', handleScroll);
  }, [activeIndex]);

  return (
    <div 
      ref={containerRef}
      className="h-[calc(100vh-64px)] w-full overflow-y-scroll snap-y snap-mandatory no-scrollbar bg-black"
    >
      {videos.map((video, index) => (
        <div key={video.id} className="h-full w-full snap-start">
          <VideoPlayer 
            video={video} 
            isActive={index === activeIndex} 
          />
        </div>
      ))}
    </div>
  );
};

export default Feed;
