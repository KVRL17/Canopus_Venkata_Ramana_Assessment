import React, { useState, useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';
import { Post } from '../../types';
import { usePost } from '../../contexts/PostContext';

interface EditPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: Post;
}

const EditPostModal: React.FC<EditPostModalProps> = ({ isOpen, onClose, post }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const { updatePost, isLoading } = usePost();

  useEffect(() => {
    if (isOpen) {
      setTitle(post.title);
      setContent(post.content);
      setError('');
    }
  }, [isOpen, post]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    if (!content.trim()) {
      setError('Content is required');
      return;
    }

    if (content.length > 300) {
      setError('Content must be 300 characters or less');
      return;
    }

    const success = await updatePost(post.id, title.trim(), content.trim());
    if (success) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-3 sm:p-4 z-50">
      <div className="bg-white rounded-lg max-w-sm sm:max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-200">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Edit Post</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-3 sm:space-y-4">
          <div>
            <label htmlFor="title" className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
              placeholder="Enter post title"
              maxLength={100}
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
              Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={5}
              className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-sm sm:text-base"
              placeholder="What's on your mind?"
              maxLength={300}
            />
            <div className="flex justify-between mt-1 text-xs sm:text-sm">
              <span className="text-gray-500">
                {content.length}/300 characters
              </span>
              {content.length > 300 && (
                <span className="text-red-500">Too long!</span>
              )}
            </div>
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-3 sm:p-4">
              <div className="text-xs sm:text-sm text-red-700">{error}</div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-3 sm:pt-4">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || content.length > 300}
              className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Updating...</span>
                </>
              ) : (
                <span>Update Post</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPostModal;