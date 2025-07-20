import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Users, MessageSquare } from 'lucide-react';
import { usePost } from '../contexts/PostContext';
import { useAuth } from '../contexts/AuthContext';
import PostCard from '../components/Posts/PostCard';

const Feed: React.FC = () => {
  const { posts } = usePost();
  const { user } = useAuth();

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg p-4 sm:p-6 text-white">
        <h1 className="text-xl sm:text-2xl font-bold mb-2">Welcome back, {user?.username}!</h1>
        <p className="text-purple-100 mb-3 sm:mb-4 text-sm sm:text-base">
          Share your latest development insights and discoveries with the community.
        </p>
        <Link
          to="/create"
          className="inline-flex items-center space-x-2 bg-white text-purple-600 px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-sm sm:text-base font-medium hover:bg-gray-100 transition-colors"
        >
          <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>Create New Post</span>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-3 sm:p-4">
          <div className="flex items-center space-x-3">
            <div className="p-1.5 sm:p-2 bg-blue-100 rounded-lg">
              <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs sm:text-sm text-gray-600">Total Posts</p>
              <p className="text-lg sm:text-xl font-semibold text-gray-900">{posts.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-3 sm:p-4">
          <div className="flex items-center space-x-3">
            <div className="p-1.5 sm:p-2 bg-green-100 rounded-lg">
              <Users className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
            </div>
            <div>
              <p className="text-xs sm:text-sm text-gray-600">Active Users</p>
              <p className="text-lg sm:text-xl font-semibold text-gray-900">
                {new Set(posts.map(post => post.authorId)).size}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-3 sm:p-4 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center space-x-3">
            <div className="p-1.5 sm:p-2 bg-purple-100 rounded-lg">
              <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-xs sm:text-sm text-gray-600">Your Posts</p>
              <p className="text-lg sm:text-xl font-semibold text-gray-900">
                {posts.filter(post => post.authorId === user?.id).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Posts Feed */}
      <div className="space-y-4">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Latest Posts</h2>
        {posts.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 p-6 sm:p-8 text-center">
            <MessageSquare className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-3 sm:mb-4" />
            <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">No posts yet</h3>
            <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
              Be the first to share your development insights with the community!
            </p>
            <Link
              to="/create"
              className="inline-flex items-center space-x-2 bg-purple-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-sm sm:text-base font-medium hover:bg-purple-700 transition-colors"
            >
              <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Create First Post</span>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Feed;