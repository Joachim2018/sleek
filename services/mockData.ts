
import { Video, User } from '../types';

export const MOCK_USERS: User[] = [
  {
    id: 'u1',
    username: 'alex_vibes',
    displayName: 'Alex Rivers',
    avatar: 'https://picsum.photos/seed/alex/200/200',
    bio: 'Creating cinematic moments for your screen 🎥✨',
    followers: 12500,
    following: 342,
    totalLikes: 450000
  },
  {
    id: 'u2',
    username: 'cooking_with_jess',
    displayName: 'Chef Jessica',
    avatar: 'https://picsum.photos/seed/jess/200/200',
    bio: 'Fast recipes for busy people 🍔',
    followers: 89000,
    following: 120,
    totalLikes: 1200000
  }
];

export const MOCK_VIDEOS: Video[] = [
  {
    id: 'v1',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-girl-in-neon-light-32322-large.mp4',
    thumbnail: 'https://picsum.photos/seed/v1/400/700',
    caption: 'Neon dreams in the city night. Stay sleek. #neon #vibes #citylife',
    hashtags: ['neon', 'vibes', 'citylife'],
    creator: MOCK_USERS[0],
    likes: 4200,
    comments: 128,
    shares: 89,
    musicName: 'Midnight City - M83',
    isLiked: false
  },
  {
    id: 'v2',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-leaves-low-angle-shot-1579-large.mp4',
    thumbnail: 'https://picsum.photos/seed/v2/400/700',
    caption: 'Autumn is finally here 🍂 Best time of the year! #autumn #nature #peace',
    hashtags: ['autumn', 'nature', 'peace'],
    creator: MOCK_USERS[1],
    likes: 12400,
    comments: 450,
    shares: 310,
    musicName: 'Sweater Weather - The Neighbourhood',
    isLiked: true
  },
  {
    id: 'v3',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-waves-in-the-water-1164-large.mp4',
    thumbnail: 'https://picsum.photos/seed/v3/400/700',
    caption: 'Calming waves for your Monday morning. #beach #ocean #calm',
    hashtags: ['beach', 'ocean', 'calm'],
    creator: MOCK_USERS[0],
    likes: 8500,
    comments: 200,
    shares: 150,
    musicName: 'Original Audio - alex_vibes',
    isLiked: false
  }
];
