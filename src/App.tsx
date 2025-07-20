import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { PostProvider } from './contexts/PostContext';
import Layout from './components/Layout/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import LoginForm from './components/Auth/LoginForm';
import SignupForm from './components/Auth/SignupForm';
import Feed from './pages/Feed';
import Profile from './pages/Profile';
import CreatePostForm from './components/Posts/CreatePostForm';

function App() {
  return (
    <AuthProvider>
      <PostProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/" element={
              <ProtectedRoute>
                <Layout>
                  <Feed />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Layout>
                  <Profile />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/create" element={
              <ProtectedRoute>
                <Layout>
                  <CreatePostForm />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </PostProvider>
    </AuthProvider>
  );
}

export default App;