
import React, { useRef, useState, useEffect } from "react";
import { Heart, MessageCircle, Share2, Music, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface VideoCardProps {
  id: string;
  videoUrl: string;
  username: string;
  description: string;
  audioTrack: string;
  likes: number;
  comments: number;
  shares: number;
  userAvatar: string;
  isActive: boolean;
}

const VideoCard = ({
  id,
  videoUrl,
  username,
  description,
  audioTrack,
  likes,
  comments,
  shares,
  userAvatar,
  isActive
}: VideoCardProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [liked, setLiked] = useState(false);
  const [localLikes, setLocalLikes] = useState(likes);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    if (videoRef.current && !videoError) {
      if (isActive) {
        videoRef.current.play().catch(error => {
          console.log("Autoplay prevented:", error);
        });
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, [isActive, videoError]);

  const togglePlay = () => {
    if (videoRef.current && !videoError) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(error => {
          console.log("Play prevented:", error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleLike = () => {
    setLiked(!liked);
    setLocalLikes(prevLikes => liked ? prevLikes - 1 : prevLikes + 1);
  };

  const handleVideoError = () => {
    console.log("Video failed to load:", videoUrl);
    setVideoError(true);
  };

  const handleVideoLoad = () => {
    console.log("Video loaded successfully:", videoUrl);
    setVideoError(false);
  };

  return (
    <div className="relative w-full h-full bg-black overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full" onClick={togglePlay}>
        {videoError ? (
          <div className="w-full h-full flex items-center justify-center bg-gray-800">
            <div className="text-center text-white">
              <p className="text-lg mb-2">Video not available</p>
              <p className="text-sm text-gray-400">@{username}</p>
            </div>
          </div>
        ) : (
          <video 
            ref={videoRef}
            className="video-player"
            src={videoUrl}
            loop
            muted={false}
            playsInline
            preload="metadata"
            onError={handleVideoError}
            onLoadedData={handleVideoLoad}
            crossOrigin="anonymous"
          />
        )}
      </div>
      
      {/* Overlay for content */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
        <div className="flex items-end justify-between">
          {/* Left side - user info and description */}
          <div className="flex-1 text-white">
            <h4 className="font-bold text-lg">@{username}</h4>
            <p className="text-sm mb-2">{description}</p>
            <div className="flex items-center space-x-1 text-xs">
              <Music className="w-3 h-3" />
              <span className="truncate max-w-[200px]">{audioTrack}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right side action buttons */}
      <div className="absolute right-2 bottom-20 flex flex-col items-center space-y-4">
        {/* User Avatar */}
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-tiktok-gray overflow-hidden border-2 border-white mb-1 relative">
            <img src={userAvatar} alt={username} className="w-full h-full object-cover" />
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-tiktok-pink rounded-full flex items-center justify-center text-xs text-white">
              <User className="w-3 h-3" />
            </div>
          </div>
        </div>

        {/* Like button */}
        <div className="flex flex-col items-center">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-transparent hover:bg-white/10"
            onClick={handleLike}
          >
            <Heart
              className={cn("w-8 h-8", {
                "text-tiktok-pink fill-tiktok-pink animate-pulse-heart": liked,
                "text-white": !liked
              })}
            />
          </Button>
          <span className="text-white text-xs mt-1">{localLikes}</span>
        </div>

        {/* Comment button */}
        <div className="flex flex-col items-center">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-transparent hover:bg-white/10"
          >
            <MessageCircle className="w-8 h-8 text-white" />
          </Button>
          <span className="text-white text-xs mt-1">{comments}</span>
        </div>

        {/* Share button */}
        <div className="flex flex-col items-center">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-transparent hover:bg-white/10"
          >
            <Share2 className="w-8 h-8 text-white" />
          </Button>
          <span className="text-white text-xs mt-1">{shares}</span>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
