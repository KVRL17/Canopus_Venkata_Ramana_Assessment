import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Edit2, Trash2, User, Clock } from 'lucide-react';
import { Post } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { usePost } from '../../contexts/PostContext';
import EditPostModal from './EditPostModal';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { user } = useAuth();
  const { deletePost } = usePost();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const isOwner = user?.id === post.authorId;

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      setIsDeleting(true);
      await deletePost(post.id);
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-3 sm:mb-4">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 line-clamp-2 pr-2">{post.title}</h3>
          {isOwner && (
            <div className="flex space-x-1 sm:space-x-2 ml-2 sm:ml-4 flex-shrink-0">
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="p-1 sm:p-1.5 text-gray-400 hover:text-blue-600 transition-colors"
                title="Edit post"
              >
                <Edit2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="p-1 sm:p-1.5 text-gray-400 hover:text-red-600 transition-colors disabled:opacity-50"
                title="Delete post"
              >
                <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </div>
          )}
        </div>
        
        <p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4 whitespace-pre-wrap leading-relaxed">{post.content}</p>
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs sm:text-sm text-gray-500 space-y-2 sm:space-y-0">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="flex items-center space-x-1">
              <User className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="truncate max-w-24 sm:max-w-none">{post.authorName}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</span>
              <span className="sm:hidden">{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true }).replace(' ago', '')}</span>
            </div>
          </div>
          {post.updatedAt !== post.createdAt && (
            <span className="text-xs text-gray-400 self-start sm:self-auto">
              <span className="hidden sm:inline">Edited {formatDistanceToNow(new Date(post.updatedAt), { addSuffix: true })}</span>
              <span className="sm:hidden">Edited</span>
            </span>
          )}
        </div>
      </div>

      <EditPostModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        post={post}
      />
    </>
  );
};

export default PostCard;