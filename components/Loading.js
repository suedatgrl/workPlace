// components/Loading.js
import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';

export default function Loading({ message = 'Yükleniyor...' }) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0066cc" />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  message: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
});