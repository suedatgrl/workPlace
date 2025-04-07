import React, { useContext, useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  Image, 
  ActivityIndicator,
  Animated
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PostContext } from '../context/PostContext';

export default function PostsScreen({ navigation }) {
  const { posts, loading, fetchPosts } = useContext(PostContext);
  const [refreshing, setRefreshing] = useState(false);
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true
    }).start();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchPosts();
    setRefreshing(false);
  };

  const renderItem = ({ item, index }) => {
    // Her bir öğe için farklı bir gecikme ile animasyon
    const itemFadeAnim = new Animated.Value(0);
    
    Animated.timing(itemFadeAnim, {
      toValue: 1,
      duration: 500,
      delay: index * 100, // Her öğe için kademeli animasyon
      useNativeDriver: true
    }).start();
    
    return (
      <Animated.View style={{ opacity: itemFadeAnim, transform: [{ translateY: itemFadeAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [50, 0]
      })}] }}>
        <TouchableOpacity 
          style={styles.postItem}
          onPress={() => navigation.navigate('PostDetail', { post: item })}
        >
          {item.image && (
            <Image 
              source={{ uri: item.image }} 
              style={styles.postImage}
              resizeMode="cover"
            />
          )}
          
          <View style={styles.postContent}>
            <Text style={styles.postTitle}>{item.title}</Text>
            <View style={styles.postMeta}>
              <Text style={styles.postCategory}>{item.category}</Text>
              <Text style={styles.postDate}>{item.date}</Text>
            </View>
            <Text numberOfLines={2} style={styles.postSummary}>
              {item.content}
            </Text>
            
            <View style={styles.readMoreContainer}>
              <Text style={styles.readMoreText}>Devamını oku</Text>
              <Ionicons name="chevron-forward" size={16} color="#0066cc" />
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  if (loading && !refreshing) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0066cc" />
      </View>
    );
  }

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        showsVerticalScrollIndicator={false}
      />
    </Animated.View>
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
  },
  listContainer: {
    padding: 15,
  },
  postItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  postImage: {
    height: 150,
    width: '100%',
  },
  postContent: {
    padding: 15,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  postMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  postCategory: {
    color: '#0066cc',
    fontWeight: '500',
    fontSize: 14,
  },
  postDate: {
    color: '#666',
    fontSize: 14,
  },
  postSummary: {
    color: '#555',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 10,
  },
  readMoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  readMoreText: {
    color: '#0066cc',
    fontWeight: '500',
    marginRight: 5,
  },
});