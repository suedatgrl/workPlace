// screens/LoginScreen.js
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  // Form doğrulama
  const validate = () => {
    let newErrors = {};
    
    if (!email) newErrors.email = 'E-posta gerekli';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Geçerli bir e-posta adresi girin';
    if (!password) newErrors.password = 'Şifre gerekli';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Giriş yapma
  const handleLogin = async () => {
    if (validate()) {
      try {
        // Normalde API'ye istek yapılır, burada simüle ediyoruz
        // const response = await axios.post('https://api.example.com/login', { email, password });
        
        // Simüle edilmiş başarılı giriş
        // Gerçek uygulamada API'den dönen token kaydedilir
        await AsyncStorage.setItem('userToken', 'dummy-token');
        
        // App.js'deki useEffect hook'u bunu algılayacak ve NavigationContainer'ı güncelleyecek
        // Burada manuel olarak App.js'deki state'i güncellemek için bir yol ekleyebiliriz
        // Örneğin: navigation.reset({...}) ya da bir context'i güncellemek gibi
        
        // Geçici çözüm: Uygulamayı yeniden başlatmak
        Alert.alert(
          'Giriş Başarılı',
          'Uygulamaya giriş yaptınız.',
          [
            { 
              text: 'Tamam', 
              onPress: () => {
                // Uygulamayı yeniden başlatmak için App.js'e sinyal gönderiyoruz
                // Gerçek uygulamada daha iyi bir çözüm kullanılmalı
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'Login' }]
                });
              }
            }
          ]
        );
      } catch (error) {
        Alert.alert('Hata', 'Giriş yapılırken bir hata oluştu. Lütfen bilgilerinizi kontrol edin.');
        console.error(error);
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/logo.png')} // Logo resminizi assets klasörüne ekleyin
            style={styles.logo}
          />
          <Text style={styles.appName}>Portfolyo App</Text>
        </View>
        
        <View style={styles.formContainer}>
          <Text style={styles.title}>Giriş Yap</Text>
          
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
            <Text style={styles.label}>Şifre</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="********"
              secureTextEntry
            />
            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
          </View>
          
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Giriş Yap</Text>
          </TouchableOpacity>
          
          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Hesabınız yok mu?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.signupLink}>Üye Ol</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 40,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
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
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 5,
  },
  loginButton: {
    backgroundColor: '#0066cc',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signupText: {
    color: '#666',
  },
  signupLink: {
    color: '#0066cc',
    fontWeight: 'bold',
    marginLeft: 5,
  },
});