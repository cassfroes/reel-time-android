
import React, { useState, useRef, useEffect } from "react";
import VideoCard from "@/components/VideoCard";
import BottomNavigation from "@/components/BottomNavigation";
import { toast } from "@/components/ui/sonner";

// Mock data for videos with working video URLs
const mockVideos = [
  {
    id: "1",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    username: "traveller",
    description: "Exploring hidden trails in Bali 🌴🌺 #travel #bali #adventure",
    audioTrack: "Tropical Vibes - Summer Beats",
    likes: 245,
    comments: 37,
    shares: 12,
    userAvatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: "2",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    username: "makeupArtist",
    description: "Silver galaxy makeup look ✨👄 #makeup #beauty #tutorial",
    audioTrack: "Space Odyssey - Cosmic Dreams",
    likes: 1204,
    comments: 89,
    shares: 45,
    userAvatar: "https://randomuser.me/api/portraits/women/65.jpg"
  },
  {
    id: "3",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    username: "basketballKing",
    description: "Saturday practice slam dunks 🏀 #sports #dunk",
    audioTrack: "Court Vibes - Bounce",
    likes: 876,
    comments: 56,
    shares: 23,
    userAvatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: "4",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    username: "nightSky",
    description: "Northern lights are magical ❄️🌌 #aurora #travel #nature",
    audioTrack: "Arctic Dreams - Night Sky",
    likes: 2435,
    comments: 132,
    shares: 87,
    userAvatar: "https://randomuser.me/api/portraits/women/22.jpg"
  },
];

const VideoFeed = () => {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const feedRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    // Display welcome toast
    toast("Welcome to TikTok Clone", {
      description: "Swipe up to see more videos!",
    });
    
    const handleScroll = () => {
      if (!feedRef.current) return;
      
      const feedHeight = feedRef.current.clientHeight;
      const scrollPosition = feedRef.current.scrollTop;
      
      // Calculate which video is in view based on scroll position
      const index = Math.round(scrollPosition / feedHeight);
      setActiveVideoIndex(index);
    };

    const currentFeedRef = feedRef.current;
    if (currentFeedRef) {
      currentFeedRef.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (currentFeedRef) {
        currentFeedRef.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const handleVideoRef = (el: HTMLDivElement | null, index: number) => {
    if (el) {
      videoRefs.current[index] = el;
    }
  };

  return (
    <div className="w-full h-screen bg-tiktok-dark text-white overflow-hidden">
      {/* Main content area */}
      <div 
        ref={feedRef}
        className="w-full h-[calc(100vh-56px)] overflow-y-scroll snap-y snap-mandatory"
      >
        {mockVideos.map((video, index) => (
          <div 
            key={video.id}
            ref={(el) => handleVideoRef(el, index)}
            className="w-full h-full snap-start snap-always"
          >
            <div className="video-container">
              <VideoCard
                {...video}
                isActive={index === activeVideoIndex}
              />
            </div>
          </div>
        ))}
      </div>
      <BottomNavigation activeTab="home" />
    </div>
  );
};

export default VideoFeed;
