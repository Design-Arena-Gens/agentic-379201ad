'use client';

import { useState } from 'react';
import { TrendingUp, Users, Heart, MessageCircle, Instagram, Facebook } from 'lucide-react';

export default function Dashboard() {
  const [posts] = useState([
    {
      id: 1,
      platform: 'instagram',
      content: '🌟 New product launch alert! Check out our latest collection #NewArrivals #Fashion',
      scheduled: '2024-05-15 14:00',
      status: 'scheduled',
      engagement: { likes: 0, comments: 0, shares: 0 }
    },
    {
      id: 2,
      platform: 'facebook',
      content: 'Behind the scenes of our photoshoot today! 📸 #BTS #ContentCreation',
      scheduled: '2024-05-14 10:30',
      status: 'published',
      engagement: { likes: 234, comments: 45, shares: 12 }
    },
    {
      id: 3,
      platform: 'pinterest',
      content: 'Summer inspiration board 🌺 Pin your favorites! #SummerVibes #Inspiration',
      scheduled: '2024-05-14 16:00',
      status: 'published',
      engagement: { likes: 567, comments: 23, shares: 89 }
    },
  ]);

  const stats = [
    { label: 'Total Reach', value: '24.5K', change: '+12.5%', icon: TrendingUp, color: 'text-green-600' },
    { label: 'Followers', value: '12.8K', change: '+8.3%', icon: Users, color: 'text-blue-600' },
    { label: 'Engagement', value: '4.2K', change: '+15.7%', icon: Heart, color: 'text-pink-600' },
    { label: 'Comments', value: '892', change: '+5.2%', icon: MessageCircle, color: 'text-purple-600' },
  ];

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return <Instagram size={16} className="text-pink-600" />;
      case 'facebook':
        return <Facebook size={16} className="text-blue-600" />;
      case 'pinterest':
        return <div className="text-red-600 text-sm">📌</div>;
      default:
        return null;
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-gray-600 mt-2">Overview of your social media performance</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-gray-50 ${stat.color}`}>
                  <Icon size={24} />
                </div>
                <span className="text-green-600 text-sm font-medium">{stat.change}</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
              <p className="text-gray-600 text-sm mt-1">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Posts */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900">Recent Posts</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {posts.map((post) => (
            <div key={post.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100">
                      {getPlatformIcon(post.platform)}
                      <span className="text-sm font-medium text-gray-700 capitalize">
                        {post.platform}
                      </span>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        post.status === 'published'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {post.status}
                    </span>
                  </div>
                  <p className="text-gray-900 mb-2">{post.content}</p>
                  <p className="text-sm text-gray-500">Scheduled: {post.scheduled}</p>
                  {post.status === 'published' && (
                    <div className="flex items-center gap-6 mt-4 text-sm text-gray-600">
                      <span className="flex items-center gap-2">
                        <Heart size={16} /> {post.engagement.likes}
                      </span>
                      <span className="flex items-center gap-2">
                        <MessageCircle size={16} /> {post.engagement.comments}
                      </span>
                      <span className="flex items-center gap-2">
                        <TrendingUp size={16} /> {post.engagement.shares}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
