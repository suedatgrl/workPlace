// screens/HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../assets/profile.png')} // Profil resminizi assets klasörüne ekleyin
          style={styles.profileImage}
        />
        <Text style={styles.name}>Adınız Soyadınız</Text>
        <Text style={styles.title}>React Native Geliştirici</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Hakkımda</Text>
        <Text style={styles.paragraph}>
          Merhaba! Ben React Native ile mobil uygulama geliştiren bir yazılım geliştiricisiyim.
          Bu portfolyo uygulaması, React Native ve API entegrasyonu becerilerimi göstermek için tasarlanmıştır.
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