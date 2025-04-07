// screens/SavedPostsScreen.js
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  ActivityIndicator 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SavedPostsScreen({ navigation }) {
  const [savedPosts, setSavedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // Ekran her odaklandığında kaydedilen gönderileri yeniden yükle
      loadSavedPosts();
    });

    return unsubscribe;
  }, [navigation]);

  const loadSavedPosts = async () => {
    try {
      setLoading(true);
      // Kaydedilen gönderi ID'lerini al
      const savedPostIds = await AsyncStorage.getItem('savedPosts');
      const savedPostIdsArray = savedPostIds ? JSON.parse(savedPostIds) : [];
      
      if (savedPostIdsArray.length === 0) {
        setSavedPosts([]);
        setLoading(false);
        return;
      }
      
      // Normalde API'den gönderileri çekeceğiz
      // const response = await axios.get('https://api.example.com/posts');
      // const allPosts = response.data;
      
      // Mock veri
      const mockPosts = [
        {
          id: '1',
          title: 'React Native Nedir?',
          content: 'React Native, Facebook tarafından geliştirilen, geliştiricilerin JavaScript kullanarak native mobil uygulamalar oluşturmasına olanak tanıyan açık kaynaklı bir mobil uygulama çerçevesidir.',
          date: '2023-06-15',
          category: 'Teknoloji',
        },
        {
          id: '2',
          title: 'API Entegrasyonu Nasıl Yapılır?',
          content: 'Bu yazıda, React Native uygulamalarında API entegrasyonunun temellerini ve en iyi uygulamaları inceleyeceğiz.',
          date: '2023-07-02',
          category: 'Yazılım',
        },
        {
          id: '3',
          title: 'Async Storage Kullanımı',
          content: 'AsyncStorage, React Native\'de yerel depolama için kullanılan bir API\'dir. Bu yazıda, AsyncStorage kullanımını ve avantajlarını ele alacağız.',
          date: '2023-07-20',
          category: 'React Native',
        },
        {
          id: '4',
          title: 'React Native\'de Animasyonlar',
          content: 'Animasyonlar, kullanıcı deneyimini iyileştirmek için harika bir yoldur. Bu yazıda, React Native\'de animasyonların nasıl uygulanacağını öğreneceğiz.',
          date: '2023-08-05',
          category: 'UI/UX',
        },
        {
          id: '5',
          title: 'React Native ile Performans Optimizasyonu',
          content: 'Bu yazıda, React Native uygulamalarında performans sorunlarını nasıl belirleyeceğinizi ve çözeceğinizi ele alacağız.',
          date: '2023-08-18',
          category: 'Performans',
        },
      ];
      
      // Sadece kaydedilen gönderileri filtreleme
      const filteredPosts = mockPosts.filter(post => 
        savedPostIdsArray.includes(post.id)
      );
      
      setSavedPosts(filteredPosts);
      setLoading(false);
    } catch (error) {
      console.error('Kaydedilen gönderiler getirilirken hata:', error);
      setLoading(false);
    }
  };

  const removeSavedPost = async (postId) => {
    try {
      const savedPostIds = await AsyncStorage.getItem('savedPosts');
      const savedPostIdsArray = savedPostIds ? JSON.parse(savedPostIds) : [];
      
      const updatedSavedPosts = savedPostIdsArray.filter(id => id !== postId);
      await AsyncStorage.setItem('savedPosts', JSON.stringify(updatedSavedPosts));
      
      // Güncellenmiş listeyi göster
      setSavedPosts(savedPosts.filter(post => post.id !== postId));
    } catch (error) {
      console.error('Gönderi kaldırılırken hata:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (savedPosts.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.noPostsText}>Henüz kaydedilmiş gönderiniz yok.</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.postItem}
      onPress={() => navigation.navigate('PostDetail', { post: item })}
    >
      <View style={styles.postHeader}>
        <Text style={styles.postTitle}>{item.title}</Text>
        <TouchableOpacity
          onPress={() => removeSavedPost(item.id)}
          style={styles.removeButton}
        >
          <Text style={styles.removeButtonText}>Kaldır</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.postCategory}>{item.category}</Text>
      <Text style={styles.postDate}>{item.date}</Text>
      <Text style={styles.postSummary} numberOfLines={2}>
        {item.content}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={savedPosts}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noPostsText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  listContainer: {
    padding: 10,
  },
  postItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  removeButton: {
    backgroundColor: '#ff6b6b',
    padding: 5,
    borderRadius: 5,
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 12,
  },
  postCategory: {
    color: '#0066cc',
    fontSize: 14,
    marginBottom: 5,
  },
  postDate: {
    color: '#666',
    fontSize: 12,
    marginBottom: 8,
  },
  postSummary: {
    color: '#333',
    fontSize: 14,
    lineHeight: 20,
  },
});