export interface User {
  id: string;
  username: string;
  email: string;
  createdAt: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

export interface PostContextType {
  posts: Post[];
  createPost: (title: string, content: string) => Promise<boolean>;
  updatePost: (id: string, title: string, content: string) => Promise<boolean>;
  deletePost: (id: string) => Promise<boolean>;
  getUserPosts: (userId: string) => Post[];
  isLoading: boolean;
}