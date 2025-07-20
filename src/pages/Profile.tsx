import React from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { User, Calendar, Edit3, MessageSquare } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { usePost } from '../contexts/PostContext';
import PostCard from '../components/Posts/PostCard';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const { getUserPosts } = usePost();

  if (!user) return null;

  const userPosts = getUserPosts(user.id);

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-start space-x-4">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">{user.username}</h1>
            <p className="text-gray-600">{user.email}</p>
            <div className="flex items-center space-x-1 mt-2 text-sm text-gray-500">
              <Calendar className="w-4 h-4" />
              <span>
                Joined {formatDistanceToNow(new Date(user.createdAt), { addSuffix: true })}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <MessageSquare className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Posts</p>
              <p className="text-2xl font-bold text-gray-900">{userPosts.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Edit3 className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Recent Activity</p>
              <p className="text-sm text-gray-900">
                {userPosts.length > 0
                  ? `Last post ${formatDistanceToNow(new Date(userPosts[0].createdAt), { addSuffix: true })}`
                  : 'No posts yet'
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* User Posts */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">Your Posts</h2>
          <Link
            to="/create"
            className="inline-flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-purple-700 transition-colors"
          >
            <Edit3 className="w-4 h-4" />
            <span>New Post</span>
          </Link>
        </div>

        {userPosts.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
            <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No posts yet</h3>
            <p className="text-gray-600 mb-4">
              Start sharing your development journey with your first post!
            </p>
            <Link
              to="/create"
              className="inline-flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-md font-medium hover:bg-purple-700 transition-colors"
            >
              <Edit3 className="w-4 h-4" />
              <span>Create First Post</span>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {userPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;