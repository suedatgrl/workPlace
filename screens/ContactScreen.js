// screens/ContactScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ContactScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  // Form doğrulama
  const validate = () => {
    let newErrors = {};
    
    if (!name) newErrors.name = 'İsim gerekli';
    if (!email) newErrors.email = 'E-posta gerekli';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Geçerli bir e-posta adresi girin';
    if (!message) newErrors.message = 'Mesaj gerekli';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form gönderme
  const handleSubmit = () => {
    if (validate()) {
      // Burada normalde API'ye gönderim yapılacak
      // axios.post('https://api.example.com/contact', { name, email, message });
      
      Alert.alert(
        'Teşekkürler!',
        'Mesajınız gönderildi. En kısa sürede size dönüş yapacağız.',
        [{ text: 'Tamam' }]
      );
      
      // Formu temizle
      setName('');
      setEmail('');
      setMessage('');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.contactInfo}>
        <Text style={styles.sectionTitle}>İletişim Bilgilerim</Text>
        
        <View style={styles.infoItem}>
          <Ionicons name="mail-outline" size={24} color="#0066cc" style={styles.infoIcon} />
          <Text style={styles.infoText}>ornek@email.com</Text>
        </View>
        
        <View style={styles.infoItem}>
          <Ionicons name="call-outline" size={24} color="#0066cc" style={styles.infoIcon} />
          <Text style={styles.infoText}>+90 123 456 7890</Text>
        </View>
        
        <View style={styles.infoItem}>
          <Ionicons name="location-outline" size={24} color="#0066cc" style={styles.infoIcon} />
          <Text style={styles.infoText}>İstanbul, Türkiye</Text>
        </View>
        
        <View style={styles.socialLinks}>
          <Ionicons name="logo-github" size={28} color="#333" style={styles.socialIcon} />
          <Ionicons name="logo-linkedin" size={28} color="#0077b5" style={styles.socialIcon} />
          <Ionicons name="logo-twitter" size={28} color="#1da1f2" style={styles.socialIcon} />
        </View>
      </View>
      
      <View style={styles.formContainer}>
        <Text style={styles.sectionTitle}>Bana Mesaj Gönder</Text>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>İsim</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Adınız Soyadınız"
          />
          {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
        </View>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>E-posta</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="ornek@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
        </View>
        
       
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Mesaj</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={message}
            onChangeText={setMessage}
            placeholder="Mesajınızı buraya yazın..."
            multiline
            numberOfLines={5}
            textAlignVertical="top"
          />
          {errors.message && <Text style={styles.errorText}>{errors.message}</Text>}
        </View>
        
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Gönder</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  contactInfo: {
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
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  infoIcon: {
    marginRight: 10,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
  },
  socialLinks: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  socialIcon: {
    marginHorizontal: 15,
  },
  formContainer: {
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
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  textArea: {
    height: 120,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 5,
  },
  submitButton: {
    backgroundColor: '#0066cc',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});