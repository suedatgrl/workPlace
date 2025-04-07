// navigation/AppNavigator.js
import React, {useContext} from 'react'; //hook importu reactten edilmeli.
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthContext';

// Ekranları import edeceğiz (henüz oluşturmadık)
import HomeScreen from '../screens/HomeScreen';
import PostsScreen from '../screens/PostsScreen.js';
import ContactScreen from '../screens/ContactScreen';
import SavedPostsScreen from '../screens/SavedPostsScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import PostDetailScreen from '../screens/PostDetailScreen';
import Loading from '../components/Loading';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Ana Ekran Stack Navigator
function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Ana Sayfa" component={HomeScreen} />
    </Stack.Navigator>
  );
}

// Posts Stack Navigator
function PostsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Gönderiler" component={PostsScreen} />
      <Stack.Screen name="PostDetail" component={PostDetailScreen} options={{ title: 'Gönderi Detayı' }} />
    </Stack.Navigator>
  );
}

// İletişim Stack Navigator
function ContactStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="İletişim" component={ContactScreen} />
    </Stack.Navigator>
  );
}

// Kaydedilenler Stack Navigator
function SavedStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Kaydedilenler" component={SavedPostsScreen} />
      <Stack.Screen name="PostDetail" component={PostDetailScreen} options={{ title: 'Gönderi Detayı' }} />
    </Stack.Navigator>
  );
}

// Auth Stack Navigator (Giriş ve Kayıt)
function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}

// Tab Navigator
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Posts') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'Contact') {
            iconName = focused ? 'mail' : 'mail-outline';
          } else if (route.name === 'Saved') {
            iconName = focused ? 'bookmark' : 'bookmark-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} options={{ title: 'Ana Sayfa' }} />
      <Tab.Screen name="Posts" component={PostsStack} options={{ title: 'Gönderiler' }} />
      <Tab.Screen name="Contact" component={ContactStack} options={{ title: 'İletişim' }} />
      <Tab.Screen name="Saved" component={SavedStack} options={{ title: 'Kaydedilenler' }} />
    </Tab.Navigator>
  );
}

// Ana Navigator (Auth ve Main arasında geçiş yapacak)
export default function AppNavigator() {
  const { isLoggedIn, loading } = useContext(AuthContext);

  if (loading) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      {isLoggedIn ? <MainTabs /> : <AuthStack />}
    </NavigationContainer>
  );
}