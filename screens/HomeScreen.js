import React, { useEffect } from 'react';
import { StyleSheet, Text, ScrollView, Image, View, Animated } from 'react-native';
import AnimatedCard from '../components/AnimatedCard';

export default function HomeScreen() {
  const headerOpacity = new Animated.Value(0);
  const headerTranslate = new Animated.Value(-50);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(headerOpacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(headerTranslate, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Animated.View 
        style={[
          styles.header, 
          { 
            opacity: headerOpacity,
            transform: [{ translateY: headerTranslate }] 
          }
        ]}
      >
        <Image
          source={require('../assets/profile.png')}
          style={styles.profileImage}
        />
        <Text style={styles.name}>Süeda Tıngıl</Text>
        <Text style={styles.title}>React Native Geliştirici</Text>
      </Animated.View>

      <View style={styles.cardsContainer}>
        <AnimatedCard 
          title="Mobil Uygulama Geliştirici" 
          description="React Native ile iOS ve Android uygulamaları geliştiriyorum."
          icon="phone-portrait-outline"
          delay={300}
        />
        
        <AnimatedCard 
          title="UI/UX Tasarımcı" 
          description="Kullanıcı dostu arayüzler tasarlıyor ve uyguluyorum."
          icon="color-palette-outline"
          delay={400}
        />
        
        <AnimatedCard 
          title="API Uzmanı" 
          description="RESTful API entegrasyonları ve backend bağlantıları yapıyorum."
          icon="code-slash-outline"
          delay={500}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Hakkımda</Text>
        <Text style={styles.paragraph}>
          Merhaba! Ben React Native ile mobil uygulama geliştiren bir yazılım geliştiricisiyim.
          Bu portfolyo uygulaması, React Native ve API entegrasyonu becerilerimi göstermek için tasarlanmıştır.
          Kullanıcı dostu arayüzler ve performanslı uygulamalar geliştirmek için sürekli yeni teknolojiler öğreniyorum.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Becerilerim</Text>
        <View style={styles.skillsContainer}>
          <View style={styles.skillItem}>
            <Text style={styles.skillText}>React Native</Text>
          </View>
          <View style={styles.skillItem}>
            <Text style={styles.skillText}>JavaScript</Text>
          </View>
          <View style={styles.skillItem}>
            <Text style={styles.skillText}>API Entegrasyonu</Text>
          </View>
          <View style={styles.skillItem}>
            <Text style={styles.skillText}>UI Tasarımı</Text>
          </View>
          <View style={styles.skillItem}>
            <Text style={styles.skillText}>Redux</Text>
          </View>
          <View style={styles.skillItem}>
            <Text style={styles.skillText}>Context API</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Projelerim</Text>
        <View style={styles.projectItem}>
          <Text style={styles.projectTitle}>Portfolyo Uygulaması</Text>
          <Text style={styles.projectDesc}>
            React Native ve Expo ile geliştirilmiş kişisel bir portfolyo uygulaması.
            Kullanıcı girişi, AsyncStorage, API entegrasyonu gibi özellikleri içerir.
          </Text>
        </View>
        
        <View style={styles.projectItem}>
          <Text style={styles.projectTitle}>Web Sitesi Projesi</Text>
          <Text style={styles.projectDesc}>
            HTML, CSS ve JavaScript kullanarak geliştirilmiş kişisel web sitesi.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e4e8',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  title: {
    fontSize: 16,
    color: '#666',
  },
  cardsContainer: {
    padding: 15,
  },
  section: {
    padding: 20,
    backgroundColor: '#fff',
    marginBottom: 15,
    borderRadius: 5,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e4e8',
    paddingBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  skillItem: {
    backgroundColor: '#e1e4e8',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  skillText: {
    color: '#333',
    fontWeight: '500',
  },
  projectItem: {
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e4e8',
  },
  projectTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  projectDesc: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});