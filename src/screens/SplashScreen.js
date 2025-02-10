import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        const userToken = await AsyncStorage.getItem('userToken');
        setTimeout(() => {
          if (userToken) {
            navigation.replace('Home'); // Navigate to Home if user is logged in
          } else {
            navigation.replace('WelcomeScreen'); // Navigate to WelcomeScreen if not registered
          }
        }, 2000); // Delay for 2 seconds
      } catch (error) {
        console.error("Error checking user status:", error);
        navigation.replace('WelcomeScreen');
      }
    };

    checkUserStatus();
  }, []);

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Chat App</Text>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.subtitle}>Loading...</Text>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
    marginTop: 10,
  },
});

export default SplashScreen;
