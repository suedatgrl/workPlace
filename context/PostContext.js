import React, { createContext, useState, useEffect } from 'react';
import { postsAPI } from '../services/api';

export const PostContext = createContext({
  posts: [],
  savedPosts: [],
  loading: true,
  fetchPosts: () => {},
  fetchSavedPosts: () => {},
  savePost: () => {},
  removeSavedPost: () => {}
});

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // İlk yükleme
  useEffect(() => {
    fetchPosts();
    fetchSavedPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const postsData = await postsAPI.getPosts();
      setPosts(postsData);
    } catch (error) {
      console.error('Fetch posts error:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSavedPosts = async () => {
    try {
      const savedPostsData = await postsAPI.getSavedPosts();
      setSavedPosts(savedPostsData);
    } catch (error) {
      console.error('Fetch saved posts error:', error);
    }
  };

  const savePost = async (postId) => {
    try {
      await postsAPI.savePost(postId);
      fetchSavedPosts(); // Kaydedilen gönderiler listesini güncelle
      return { success: true };
    } catch (error) {
      console.error('Save post error:', error);
      return { success: false, error };
    }
  };

  const removeSavedPost = async (postId) => {
    try {
      await postsAPI.removeSavedPost(postId);
      setSavedPosts(savedPosts.filter(post => post.id !== postId));
      return { success: true };
    } catch (error) {
      console.error('Remove saved post error:', error);
      return { success: false, error };
    }
  };

  const value = {
    posts,
    savedPosts,
    loading,
    fetchPosts,
    fetchSavedPosts,
    savePost,
    removeSavedPost
  };

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};