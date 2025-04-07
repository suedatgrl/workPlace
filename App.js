// App.js
import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppNavigator from './navigation/AppNavigator';

import { AuthProvider } from './context/AuthContext';
import { PostProvider } from './context/PostContext';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Kullanıcı oturum durumunu kontrol et
    const checkLoginStatus = async () => {
      try {
        const userToken = await AsyncStorage.getItem('userToken');
        setIsLoggedIn(userToken !== null);
      } catch (e) {
        console.log('Oturum durumu kontrolünde hata:', e);
      } finally {
        setIsLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  if (isLoading) {
    // Yükleme ekranı gösterilebilir
    return null;
  }

  return (
    <AuthProvider>
      <PostProvider>
        <AppNavigator isLoggedIn={isLoggedIn} />
        <StatusBar style="auto" />
      </PostProvider>
    </AuthProvider>
  );
  
}