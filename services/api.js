import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
//E-posta: demo@example.com
//Şifre: password

// Gerçek API URL'iniz - mock data kullanacağımız için şimdilik ihtiyacımız yok
// const API_URL = 'https://api.example.com';

const apiClient = axios.create({
  // baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API istek öncesi token ekleme
apiClient.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Mock veri fonksiyonları
const getMockPosts = () => {
  return [
    {
      id: '1',
      title: 'React Native Temelleri',
      content: 'React Native, React kullanarak native mobil uygulamalar geliştirebileceğiniz bir JavaScript framework\'üdür. Temel React konseptlerinin üzerine kurulmuştur ancak HTML elementleri yerine native UI bileşenlerini kullanır. React Native\'in "bir kez öğren, her yerde yaz" felsefesi, web geliştiricilerinin mobil uygulama dünyasına kolayca adım atmasını sağlar.\n\nReact Native ile bir componenti bir kez yazıp hem iOS hem de Android platformlarında kullanabilirsiniz. Bu, geliştirme sürecini hızlandırır ve kod tabanınızın bakımını kolaylaştırır. Ayrıca, native modüller sayesinde gerektiğinde platform özelinde kod da yazabilirsiniz.',
      date: '2025-04-01',
      category: 'Eğitim',
      image: 'https://reactnative.dev/img/tiny_logo.png'
    },
    {
      id: '2',
      title: 'Async/Await ile API İstekleri',
      content: 'Modern JavaScript\'te async/await yapısı, Promise\'lerin daha okunabilir ve yönetilebilir bir şekilde kullanılmasını sağlar. React Native uygulamalarında API istekleri yaparken bu yapıyı kullanmak, kodunuzun daha temiz ve anlaşılır olmasına yardımcı olur.\n\nBir async fonksiyonu içinde await anahtar kelimesi kullanıldığında, JavaScript o Promise çözümlenene kadar bekler ve sonucu döndürür. Bu, callback hell\'den kaçınmanıza ve senkron kod yazar gibi asenkron kod yazmanıza olanak tanır. Hata yönetimi için try/catch blokları kullanabilirsiniz.',
      date: '2025-04-02',
      category: 'JavaScript',
      image: 'https://www.javascripttutorial.net/wp-content/uploads/2022/01/javascript-async-await.svg'
    },
    {
      id: '3',
      title: 'React Navigation Kullanımı',
      content: 'React Navigation, React Native uygulamalarında ekranlar arasında gezinmeyi sağlayan popüler bir kütüphanedir. Stack Navigator, Tab Navigator ve Drawer Navigator gibi farklı navigasyon türlerini destekler.\n\nNavigasyon yapınızı oluştururken, önce ihtiyacınıza en uygun navigator türünü seçmelisiniz. Örneğin, arka arkaya açılan ekranlar için Stack Navigator, alt sekmeler için Tab Navigator kullanabilirsiniz. Navigatorlar iç içe kullanılarak karmaşık navigasyon yapıları oluşturulabilir.',
      date: '2025-04-03',
      category: 'UI/UX',
      image: 'https://reactnavigation.org/img/spiro.svg'
    },
    {
      id: '4',
      title: 'Mobil Uygulama Animasyonları',
      content: 'Animasyonlar, kullanıcı deneyimini iyileştirmek ve uygulamanıza profesyonel bir görünüm kazandırmak için önemlidir. React Native\'in Animated API\'si, performanslı animasyonlar oluşturmanıza olanak tanır.\n\nTemel animasyon türleri arasında timing, spring ve decay bulunur. Bu animasyonları kullanarak öğelerin konumunu, boyutunu, opaklığını ve daha birçok özelliğini değiştirebilirsiniz. Karmaşık animasyonlar için kompozisyon kullanabilir veya LayoutAnimation API\'sini tercih edebilirsiniz.',
      date: '2025-04-04',
      category: 'Tasarım',
      image: 'https://miro.medium.com/max/1400/1*Gh4eaAQU432ZQH7qsVbJ_A.gif'
    },
    {
      id: '5',
      title: 'Context API ile State Yönetimi',
      content: 'Context API, React Native uygulamalarında global state yönetimi için kullanılan güçlü bir araçtır. Redux gibi ek kütüphanelere ihtiyaç duymadan, component ağacının farklı seviyelerindeki componentler arasında veri paylaşımı yapmanızı sağlar.\n\nContext oluşturmak için React.createContext() fonksiyonunu kullanabilirsiniz. Ardından, Context.Provider component\'i ile değerleri sağlayabilir ve useContext hook\'u ile bu değerlere erişebilirsiniz. Bu yaklaşım, prop drilling sorununu ortadan kaldırır ve kodunuzun daha temiz olmasını sağlar.',
      date: '2025-04-05',
      category: 'React',
      image: 'https://miro.medium.com/max/1400/1*Yo1ktw5TjLBXIoKI0jE9XQ.png'
    }
  ];
};

// API servis fonksiyonları
export const authAPI = {
  login: async (email, password) => {
    // Mock login
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Demo kullanıcı
        if (email === 'demo@example.com' && password === 'password') {
          resolve({ 
            token: 'mock-jwt-token',
            user: {
              id: 1,
              name: 'Demo User',
              email: 'demo@example.com'
            }
          });
        } else {
          reject({ message: 'Geçersiz e-posta veya şifre' });
        }
      }, 1000);
    });
  },
  
  register: async (name, email, password) => {
    // Mock register
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ 
          success: true, 
          message: 'Kayıt başarılı'
        });
      }, 1000);
    });
  },
  
  logout: async () => {
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('userData');
  }
};

export const postsAPI = {
  getPosts: async () => {
    // Mock data
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(getMockPosts());
      }, 1000);
    });
  },
  
  getPostById: async (id) => {
    // Mock data
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const posts = getMockPosts();
        const post = posts.find(p => p.id === id);
        if (post) {
          resolve(post);
        } else {
          reject({ message: 'Gönderi bulunamadı' });
        }
      }, 500);
    });
  },
  
  getSavedPosts: async () => {
    try {
      const savedPostIds = await AsyncStorage.getItem('savedPosts');
      const savedPostIdsArray = savedPostIds ? JSON.parse(savedPostIds) : [];
      
      if (savedPostIdsArray.length === 0) return [];
      
      const allPosts = getMockPosts();
      return allPosts.filter(post => savedPostIdsArray.includes(post.id));
    } catch (error) {
      console.error('Saved posts error:', error);
      return [];
    }
  },
  
  savePost: async (postId) => {
    try {
      const savedPostIds = await AsyncStorage.getItem('savedPosts');
      const savedPostIdsArray = savedPostIds ? JSON.parse(savedPostIds) : [];
      
      if (!savedPostIdsArray.includes(postId)) {
        savedPostIdsArray.push(postId);
        await AsyncStorage.setItem('savedPosts', JSON.stringify(savedPostIdsArray));
      }
      
      return { success: true };
    } catch (error) {
      console.error('Save post error:', error);
      return { success: false, error };
    }
  },
  
  removeSavedPost: async (postId) => {
    try {
      const savedPostIds = await AsyncStorage.getItem('savedPosts');
      const savedPostIdsArray = savedPostIds ? JSON.parse(savedPostIds) : [];
      
      const updatedArray = savedPostIdsArray.filter(id => id !== postId);
      await AsyncStorage.setItem('savedPosts', JSON.stringify(updatedArray));
      
      return { success: true };
    } catch (error) {
      console.error('Remove saved post error:', error);
      return { success: false, error };
    }
  }
};

export default {
  authAPI,
  postsAPI
};