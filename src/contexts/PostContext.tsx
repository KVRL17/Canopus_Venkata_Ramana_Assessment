import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Post, PostContextType } from '../types';
import { useAuth } from './AuthContext';

const PostContext = createContext<PostContextType | undefined>(undefined);

export const usePost = () => {
  const context = useContext(PostContext);
  if (context === undefined) {
    throw new Error('usePost must be used within a PostProvider');
  }
  return context;
};

interface PostProviderProps {
  children: ReactNode;
}

export const PostProvider: React.FC<PostProviderProps> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    // Load posts from localStorage on mount
    const savedPosts = JSON.parse(localStorage.getItem('devbook_posts') || '[]');
    setPosts(savedPosts.sort((a: Post, b: Post) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
  }, []);

  const savePosts = (updatedPosts: Post[]) => {
    const sortedPosts = updatedPosts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    setPosts(sortedPosts);
    localStorage.setItem('devbook_posts', JSON.stringify(sortedPosts));
  };

  const createPost = async (title: string, content: string): Promise<boolean> => {
    if (!user) return false;
    
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newPost: Post = {
      id: `post-${Date.now()}`,
      title,
      content,
      authorId: user.id,
      authorName: user.username,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    const updatedPosts = [newPost, ...posts];
    savePosts(updatedPosts);
    setIsLoading(false);
    return true;
  };

  const updatePost = async (id: string, title: string, content: string): Promise<boolean> => {
    if (!user) return false;
    
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const updatedPosts = posts.map(post => 
      post.id === id && post.authorId === user.id
        ? { ...post, title, content, updatedAt: new Date().toISOString() }
        : post
    );
    
    savePosts(updatedPosts);
    setIsLoading(false);
    return true;
  };

  const deletePost = async (id: string): Promise<boolean> => {
    if (!user) return false;
    
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const updatedPosts = posts.filter(post => !(post.id === id && post.authorId === user.id));
    savePosts(updatedPosts);
    setIsLoading(false);
    return true;
  };

  const getUserPosts = (userId: string): Post[] => {
    return posts.filter(post => post.authorId === userId);
  };

  const value: PostContextType = {
    posts,
    createPost,
    updatePost,
    deletePost,
    getUserPosts,
    isLoading,
  };

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};