'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Instagram, Facebook } from 'lucide-react';

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const scheduledPosts = [
    { date: 15, platform: 'instagram', time: '14:00', content: 'New product launch' },
    { date: 16, platform: 'facebook', time: '10:30', content: 'Behind the scenes' },
    { date: 18, platform: 'pinterest', time: '16:00', content: 'Summer inspiration' },
    { date: 20, platform: 'instagram', time: '12:00', content: 'Customer spotlight' },
    { date: 22, platform: 'facebook', time: '15:30', content: 'Weekly roundup' },
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getPostsForDay = (day: number) => {
    return scheduledPosts.filter(post => post.date === day);
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return <Instagram size={12} className="text-pink-600" />;
      case 'facebook':
        return <Facebook size={12} className="text-blue-600" />;
      case 'pinterest':
        return <span className="text-xs">📌</span>;
      default:
        return null;
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Content Calendar</h2>
        <p className="text-gray-600 mt-2">Plan and visualize your posting schedule</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-900">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h3>
          <div className="flex gap-2">
            <button
              onClick={previousMonth}
              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextMonth}
              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2">
          {/* Day names */}
          {dayNames.map(day => (
            <div key={day} className="text-center font-semibold text-gray-700 py-2">
              {day}
            </div>
          ))}

          {/* Empty cells for days before month starts */}
          {Array.from({ length: startingDayOfWeek }).map((_, index) => (
            <div key={`empty-${index}`} className="aspect-square" />
          ))}

          {/* Calendar days */}
          {Array.from({ length: daysInMonth }).map((_, index) => {
            const day = index + 1;
            const posts = getPostsForDay(day);
            const isToday = day === new Date().getDate() &&
              currentDate.getMonth() === new Date().getMonth() &&
              currentDate.getFullYear() === new Date().getFullYear();

            return (
              <div
                key={day}
                className={`aspect-square border-2 rounded-lg p-2 transition-all hover:shadow-md ${
                  isToday ? 'border-primary-500 bg-primary-50' : 'border-gray-200'
                }`}
              >
                <div className={`text-sm font-semibold mb-1 ${isToday ? 'text-primary-600' : 'text-gray-700'}`}>
                  {day}
                </div>
                <div className="space-y-1">
                  {posts.map((post, idx) => (
                    <div
                      key={idx}
                      className="text-xs p-1 bg-gray-100 rounded flex items-center gap-1 overflow-hidden"
                      title={`${post.time} - ${post.content}`}
                    >
                      {getPlatformIcon(post.platform)}
                      <span className="truncate">{post.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Platform Legend</h4>
          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <Instagram size={16} className="text-pink-600" />
              <span className="text-sm text-gray-600">Instagram</span>
            </div>
            <div className="flex items-center gap-2">
              <Facebook size={16} className="text-blue-600" />
              <span className="text-sm text-gray-600">Facebook</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm">📌</span>
              <span className="text-sm text-gray-600">Pinterest</span>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Posts */}
      <div className="mt-8 bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Upcoming Posts</h3>
        <div className="space-y-3">
          {scheduledPosts.map((post, index) => (
            <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4">
                {getPlatformIcon(post.platform)}
                <div>
                  <p className="font-medium text-gray-900">{post.content}</p>
                  <p className="text-sm text-gray-500">
                    {monthNames[currentDate.getMonth()]} {post.date} at {post.time}
                  </p>
                </div>
              </div>
              <button className="px-4 py-2 text-sm font-medium text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                Edit
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
