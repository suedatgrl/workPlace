// screens/PostDetailScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PostDetailScreen({ route }) {
  const { post } = route.params;
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    // Gönderi kaydedilmiş mi kontrol et
    const checkIfSaved = async () => {
      try {
        const savedPosts = await AsyncStorage.getItem('savedPosts');
        if (savedPosts !== null) {
          const savedPostsArray = JSON.parse(savedPosts);
          setIsSaved(savedPostsArray.includes(post.id));
        }
      } catch (err) {
        console.error('Kaydedilen gönderiler kontrol edilirken hata:', err);
      }
    };

    checkIfSaved();
  }, [post.id]);

  // Gönderi kaydetme/kaldırma
  const toggleSavePost = async () => {
    try {
      const savedPosts = await AsyncStorage.getItem('savedPosts');
      let savedPostsArray = savedPosts !== null ? JSON.parse(savedPosts) : [];
      
      if (isSaved) {
        // Zaten kaydedilmişse, kaldır
        savedPostsArray = savedPostsArray.filter(id => id !== post.id);
      } else {
        // Kaydedilmemişse, ekle
        savedPostsArray.push(post.id);
      }
      
      await AsyncStorage.setItem('savedPosts', JSON.stringify(savedPostsArray));
      setIsSaved(!isSaved);
    } catch (err) {
      console.error('Gönderi kaydedilirken hata:', err);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{post.title}</Text>
        <View style={styles.metaContainer}>
          <Text style={styles.category}>{post.category}</Text>
          <Text style={styles.date}>{post.date}</Text>
        </View>
      </View>
      
      <View style={styles.contentContainer}>
        <Text style={styles.content}>{post.content}</Text>
      </View>
      
      <TouchableOpacity 
        style={[styles.saveButton, isSaved && styles.savedButton]} 
        onPress={toggleSavePost}
      >
        <Text style={styles.saveButtonText}>
          {isSaved ? 'Kaydedilenlerden Çıkar' : 'Bu Gönderiyi Kaydet'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e4e8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  category: {
    color: '#0066cc',
    fontSize: 16,
  },
  date: {
    color: '#666',
  },
  contentContainer: {
    padding: 20,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  saveButton: {
    margin: 20,
    padding: 15,
    backgroundColor: '#0066cc',
    borderRadius: 5,
    alignItems: 'center',
  },
  savedButton: {
    backgroundColor: '#666',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});