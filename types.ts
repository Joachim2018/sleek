
export interface User {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  bio?: string;
  followers: number;
  following: number;
  totalLikes: number;
  isFollowing?: boolean;
}

export interface Video {
  id: string;
  url: string;
  thumbnail: string;
  caption: string;
  hashtags: string[];
  creator: User;
  likes: number;
  comments: number;
  shares: number;
  isLiked?: boolean;
  musicName?: string;
}

export interface Comment {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  text: string;
  likes: number;
  timestamp: string;
}

export type TabType = 'foryou' | 'following';
