'use client';

import { useState } from 'react';
import { Instagram, Facebook, Sparkles, Calendar, Clock, Hash } from 'lucide-react';

export default function ContentCreator() {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [generatedHashtags, setGeneratedHashtags] = useState<string[]>([]);

  const platforms: Array<{
    id: string;
    name: string;
    icon: React.ComponentType<any> | string;
    color: string;
    bg: string;
  }> = [
    { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'text-pink-600', bg: 'bg-pink-50' },
    { id: 'facebook', name: 'Facebook', icon: Facebook, color: 'text-blue-600', bg: 'bg-blue-50' },
    { id: 'pinterest', name: 'Pinterest', icon: '📌', color: 'text-red-600', bg: 'bg-red-50' },
  ];

  const categories = [
    'Fashion & Style',
    'Food & Recipes',
    'Travel & Adventure',
    'Technology',
    'Fitness & Health',
    'Business & Marketing',
    'Photography',
    'Home & Decor',
    'Art & Design',
    'Entertainment'
  ];

  const togglePlatform = (platformId: string) => {
    setSelectedPlatforms(prev =>
      prev.includes(platformId)
        ? prev.filter(id => id !== platformId)
        : [...prev, platformId]
    );
  };

  const generateContent = () => {
    const templates = [
      `🌟 Discover the latest trends in ${category}! Check out what's new and exciting. #trending #${category.toLowerCase().replace(/\s+/g, '')}`,
      `Ready to elevate your ${category} game? Here's what you need to know! 💡 #tips #${category.toLowerCase().replace(/\s+/g, '')}`,
      `Behind the scenes of ${category}! Join us on this incredible journey. 📸 #behindthescenes #authentic`,
      `Transform your ${category} experience with these expert insights! ✨ #expert #inspiration`,
      `The ultimate guide to ${category}! Save this for later. 🔖 #guide #mustread`
    ];
    const randomTemplate = templates[Math.floor(Math.random() * templates.length)];
    setContent(randomTemplate);
    generateHashtags();
  };

  const generateHashtags = () => {
    const hashtagSets = {
      'Fashion & Style': ['#fashion', '#style', '#ootd', '#fashionblogger', '#instafashion', '#fashionista', '#styleinspo', '#trendy', '#outfitoftheday', '#fashiongram'],
      'Food & Recipes': ['#foodie', '#foodporn', '#instafood', '#yummy', '#delicious', '#foodphotography', '#cooking', '#recipe', '#homemade', '#foodstagram'],
      'Travel & Adventure': ['#travel', '#wanderlust', '#adventure', '#explore', '#travelgram', '#vacation', '#traveling', '#instatravel', '#trip', '#tourism'],
      'Technology': ['#tech', '#technology', '#innovation', '#gadgets', '#digital', '#techlife', '#coding', '#programming', '#software', '#ai'],
      'Fitness & Health': ['#fitness', '#health', '#workout', '#gym', '#fitnessmotivation', '#healthy', '#exercise', '#fit', '#training', '#wellness'],
    };

    const defaultHashtags = ['#viral', '#trending', '#instagood', '#photooftheday', '#love', '#beautiful', '#happy', '#picoftheday', '#follow', '#instadaily'];
    const categoryHashtags = hashtagSets[category as keyof typeof hashtagSets] || defaultHashtags;
    setGeneratedHashtags(categoryHashtags);
  };

  const handleSchedulePost = () => {
    if (selectedPlatforms.length === 0 || !content || !scheduledDate || !scheduledTime) {
      alert('Please fill in all fields and select at least one platform');
      return;
    }
    alert(`Post scheduled successfully for ${selectedPlatforms.join(', ')} on ${scheduledDate} at ${scheduledTime}`);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Create Post</h2>
        <p className="text-gray-600 mt-2">Generate and schedule content across multiple platforms</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Platform Selection */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Platforms</h3>
            <div className="grid grid-cols-3 gap-4">
              {platforms.map((platform) => {
                const IconComponent = typeof platform.icon === 'string' ? null : platform.icon;
                const isSelected = selectedPlatforms.includes(platform.id);

                return (
                  <button
                    key={platform.id}
                    onClick={() => togglePlatform(platform.id)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      isSelected
                        ? `${platform.bg} border-current ${platform.color}`
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-2">
                      {IconComponent ? <IconComponent size={24} className={platform.color} /> : <span className="text-2xl">{platform.icon as string}</span>}
                      <span className="text-sm font-medium text-gray-900">{platform.name}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content Generation */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Content Generator</h3>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <button
              onClick={generateContent}
              disabled={!category}
              className="w-full mb-4 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-medium hover:from-primary-600 hover:to-primary-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Sparkles size={20} />
              Generate Content
            </button>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Post Content</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Your post content will appear here..."
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              />
              <div className="mt-2 text-sm text-gray-500">
                {content.length} / 2200 characters
              </div>
            </div>
          </div>

          {/* Scheduling */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Schedule Post</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Calendar size={16} />
                  Date
                </label>
                <input
                  type="date"
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Clock size={16} />
                  Time
                </label>
                <input
                  type="time"
                  value={scheduledTime}
                  onChange={(e) => setScheduledTime(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleSchedulePost}
                className="flex-1 px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
              >
                Schedule Post
              </button>
              <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                Post Now
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Hashtag Generator */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Hash size={20} />
              Viral Hashtags
            </h3>
            {generatedHashtags.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {generatedHashtags.map((tag, index) => (
                  <button
                    key={index}
                    onClick={() => setContent(prev => prev + ' ' + tag)}
                    className="px-3 py-1.5 bg-primary-50 text-primary-600 rounded-full text-sm font-medium hover:bg-primary-100 transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">Generate content to see hashtag suggestions</p>
            )}
          </div>

          {/* Best Times to Post */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Best Times to Post</h3>
            <div className="space-y-3">
              {[
                { platform: 'Instagram', time: '11:00 AM - 1:00 PM', color: 'text-pink-600' },
                { platform: 'Facebook', time: '1:00 PM - 3:00 PM', color: 'text-blue-600' },
                { platform: 'Pinterest', time: '8:00 PM - 11:00 PM', color: 'text-red-600' },
              ].map((item) => (
                <div key={item.platform} className="flex justify-between items-center">
                  <span className={`font-medium ${item.color}`}>{item.platform}</span>
                  <span className="text-sm text-gray-600">{item.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl p-6 text-white">
            <h3 className="text-lg font-semibold mb-2">Pro Tip</h3>
            <p className="text-sm text-primary-50">
              Posts with 5-10 hashtags get 2x more engagement than those without!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
