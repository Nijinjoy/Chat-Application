import React, { useEffect } from 'react';
import { View, Image, ImageBackground, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { appIcon, wallpaper } from '../assets/images';
import { colors } from '../constants/Colors';

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
    <ImageBackground source={wallpaper} style={styles.background}>
      <Image source={appIcon} style={styles.logo} resizeMode="contain" />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
  },
});

export default SplashScreen;

