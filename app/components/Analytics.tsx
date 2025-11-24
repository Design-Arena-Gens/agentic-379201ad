'use client';

import { TrendingUp, Users, Heart, Eye, MessageCircle, Share2 } from 'lucide-react';

export default function Analytics() {
  const performanceData = [
    { platform: 'Instagram', followers: 5240, growth: '+12.5%', engagement: '4.8%', reach: 12500 },
    { platform: 'Facebook', followers: 4320, growth: '+8.3%', engagement: '3.2%', reach: 9800 },
    { platform: 'Pinterest', followers: 3180, growth: '+15.7%', engagement: '6.1%', reach: 15200 },
  ];

  const topPosts = [
    {
      platform: 'Instagram',
      content: 'Summer collection launch 🌺',
      likes: 1250,
      comments: 89,
      shares: 45,
      reach: 8900
    },
    {
      platform: 'Pinterest',
      content: 'DIY Home decor ideas',
      likes: 2100,
      comments: 124,
      shares: 567,
      reach: 15600
    },
    {
      platform: 'Facebook',
      content: 'Behind the scenes photoshoot',
      likes: 890,
      comments: 67,
      shares: 34,
      reach: 6700
    },
  ];

  const engagementByDay = [
    { day: 'Mon', value: 65 },
    { day: 'Tue', value: 78 },
    { day: 'Wed', value: 90 },
    { day: 'Thu', value: 72 },
    { day: 'Fri', value: 85 },
    { day: 'Sat', value: 95 },
    { day: 'Sun', value: 82 },
  ];

  const maxEngagement = Math.max(...engagementByDay.map(d => d.value));

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Analytics</h2>
        <p className="text-gray-600 mt-2">Track your social media performance and insights</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Reach', value: '37.5K', icon: Eye, color: 'bg-blue-500' },
          { label: 'Total Followers', value: '12.7K', icon: Users, color: 'bg-green-500' },
          { label: 'Engagement Rate', value: '4.7%', icon: Heart, color: 'bg-pink-500' },
          { label: 'Growth Rate', value: '+12.2%', icon: TrendingUp, color: 'bg-purple-500' },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center mb-4`}>
                <Icon size={24} className="text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">{stat.value}</h3>
              <p className="text-gray-600 text-sm mt-1">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Platform Performance */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Platform Performance</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Platform</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Followers</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Growth</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Engagement</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Reach</th>
              </tr>
            </thead>
            <tbody>
              {performanceData.map((data, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <span className="font-medium text-gray-900">{data.platform}</span>
                  </td>
                  <td className="py-4 px-4 text-gray-700">{data.followers.toLocaleString()}</td>
                  <td className="py-4 px-4">
                    <span className="text-green-600 font-medium">{data.growth}</span>
                  </td>
                  <td className="py-4 px-4 text-gray-700">{data.engagement}</td>
                  <td className="py-4 px-4 text-gray-700">{data.reach.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Engagement Chart */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Weekly Engagement</h3>
          <div className="space-y-4">
            {engagementByDay.map((item) => (
              <div key={item.day} className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-700 w-12">{item.day}</span>
                <div className="flex-1 bg-gray-100 rounded-full h-8 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-primary-500 to-primary-600 h-full rounded-full flex items-center justify-end px-3"
                    style={{ width: `${(item.value / maxEngagement) * 100}%` }}
                  >
                    <span className="text-xs font-medium text-white">{item.value}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Posts */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Top Performing Posts</h3>
          <div className="space-y-4">
            {topPosts.map((post, index) => (
              <div key={index} className="p-4 rounded-lg border border-gray-200 hover:border-primary-300 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-700 mb-2">
                      {post.platform}
                    </span>
                    <p className="text-gray-900 font-medium">{post.content}</p>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-2 text-sm">
                  <div className="flex items-center gap-1 text-gray-600">
                    <Heart size={14} />
                    <span>{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <MessageCircle size={14} />
                    <span>{post.comments}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <Share2 size={14} />
                    <span>{post.shares}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <Eye size={14} />
                    <span>{post.reach}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Best Times */}
      <div className="mt-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl p-6 text-white">
        <h3 className="text-xl font-bold mb-4">Optimal Posting Times</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
            <p className="text-primary-100 text-sm mb-1">Instagram</p>
            <p className="text-lg font-semibold">11:00 AM - 1:00 PM</p>
            <p className="text-primary-100 text-xs mt-1">Peak engagement time</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
            <p className="text-primary-100 text-sm mb-1">Facebook</p>
            <p className="text-lg font-semibold">1:00 PM - 3:00 PM</p>
            <p className="text-primary-100 text-xs mt-1">Peak engagement time</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
            <p className="text-primary-100 text-sm mb-1">Pinterest</p>
            <p className="text-lg font-semibold">8:00 PM - 11:00 PM</p>
            <p className="text-primary-100 text-xs mt-1">Peak engagement time</p>
          </div>
        </div>
      </div>
    </div>
  );
}
