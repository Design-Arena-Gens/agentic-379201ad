'use client';

import { useState } from 'react';
import { Instagram, Facebook, Plus, Check, X } from 'lucide-react';

export default function Accounts() {
  const [accounts, setAccounts] = useState([
    {
      id: 1,
      platform: 'instagram',
      name: '@fashionista_official',
      connected: true,
      followers: 5240,
      posts: 342
    },
    {
      id: 2,
      platform: 'facebook',
      name: 'Fashionista Page',
      connected: true,
      followers: 4320,
      posts: 289
    },
    {
      id: 3,
      platform: 'pinterest',
      name: 'Fashionista Boards',
      connected: true,
      followers: 3180,
      posts: 456
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);

  const platformOptions: Array<{
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

  const getPlatformDetails = (platformId: string) => {
    return platformOptions.find(p => p.id === platformId);
  };

  const handleDisconnect = (accountId: number) => {
    if (confirm('Are you sure you want to disconnect this account?')) {
      setAccounts(accounts.filter(acc => acc.id !== accountId));
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Connected Accounts</h2>
          <p className="text-gray-600 mt-2">Manage your social media connections</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center gap-2"
        >
          <Plus size={20} />
          Add Account
        </button>
      </div>

      {/* Connected Accounts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {accounts.map((account) => {
          const platform = getPlatformDetails(account.platform);
          if (!platform) return null;

          const IconComponent = typeof platform.icon === 'string' ? null : platform.icon;

          return (
            <div key={account.id} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg ${platform.bg}`}>
                  {IconComponent ? <IconComponent size={24} className={platform.color} /> : <span className="text-2xl">{platform.icon as string}</span>}
                </div>
                {account.connected && (
                  <div className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                    <Check size={12} />
                    Connected
                  </div>
                )}
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-1">{platform.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{account.name}</p>

              <div className="flex gap-4 mb-4 pb-4 border-b border-gray-200">
                <div>
                  <p className="text-2xl font-bold text-gray-900">{account.followers.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">Followers</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{account.posts}</p>
                  <p className="text-xs text-gray-500">Posts</p>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                  Settings
                </button>
                <button
                  onClick={() => handleDisconnect(account.id)}
                  className="px-4 py-2 border border-red-300 text-red-600 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add New Account Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Add Account</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <p className="text-gray-600 mb-6">Select a platform to connect your account</p>

            <div className="space-y-3">
              {platformOptions.map((platform) => {
                const IconComponent = typeof platform.icon === 'string' ? null : platform.icon;
                const isConnected = accounts.some(acc => acc.platform === platform.id);

                return (
                  <button
                    key={platform.id}
                    onClick={() => {
                      if (!isConnected) {
                        alert(`Connecting to ${platform.name}... (Demo)`);
                        setShowAddModal(false);
                      }
                    }}
                    disabled={isConnected}
                    className={`w-full flex items-center justify-between p-4 rounded-lg border-2 transition-all ${
                      isConnected
                        ? 'border-gray-200 bg-gray-50 cursor-not-allowed'
                        : 'border-gray-300 hover:border-primary-400 hover:bg-primary-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {IconComponent ? <IconComponent size={24} className={platform.color} /> : <span className="text-2xl">{platform.icon as string}</span>}
                      <span className="font-medium text-gray-900">{platform.name}</span>
                    </div>
                    {isConnected ? (
                      <span className="text-sm text-gray-500">Connected</span>
                    ) : (
                      <span className="text-sm text-primary-600 font-medium">Connect</span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                By connecting your accounts, you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Account Stats */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Account Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4">
            <p className="text-4xl font-bold text-gray-900">{accounts.length}</p>
            <p className="text-gray-600 mt-2">Connected Accounts</p>
          </div>
          <div className="text-center p-4">
            <p className="text-4xl font-bold text-gray-900">
              {accounts.reduce((sum, acc) => sum + acc.followers, 0).toLocaleString()}
            </p>
            <p className="text-gray-600 mt-2">Total Followers</p>
          </div>
          <div className="text-center p-4">
            <p className="text-4xl font-bold text-gray-900">
              {accounts.reduce((sum, acc) => sum + acc.posts, 0)}
            </p>
            <p className="text-gray-600 mt-2">Total Posts</p>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="mt-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl p-6 text-white">
        <h3 className="text-xl font-bold mb-2">Pro Tips</h3>
        <ul className="space-y-2 text-sm text-primary-50">
          <li>• Connect multiple accounts to manage all your content from one place</li>
          <li>• Regularly review account permissions and security settings</li>
          <li>• Use different content strategies for each platform to maximize engagement</li>
        </ul>
      </div>
    </div>
  );
}
