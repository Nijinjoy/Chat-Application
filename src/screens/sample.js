import React, { useEffect, useRef } from 'react';
import { View, Image, ImageBackground, StyleSheet, ActivityIndicator, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../services/firebaseConfig';
import { appIcon, wallpaper } from '../assets/images';
import { colors } from '../constants/Colors';

const SplashScreen = () => {
    const navigation = useNavigation();
    const fadeAnim = useRef(new Animated.Value(0)).current; // Fade animation
    const timeoutRef = useRef(null); // Prevent duplicate timeouts

    useEffect(() => {
        // Start fade-in animation
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            timeoutRef.current = setTimeout(() => {
                try {
                    if (user) {
                        navigation.replace("ChatListScreen"); // User is logged in
                    } else {
                        navigation.replace("RegisterScreen"); // User not registered
                    }
                } catch (error) {
                    console.error("Navigation Error:", error);
                }
      }, 2000); // Delay for splash effect
    });

      // Cleanup: Unsubscribe & clear timeout
      return () => {
          unsubscribe();
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
      };
  }, [navigation, fadeAnim]);

    return (
      <ImageBackground source={wallpaper} style={styles.background}>
          <Animated.View style={[styles.logoContainer, { opacity: fadeAnim }]}>
              <Image source={appIcon} style={styles.logo} resizeMode="contain" />
          </Animated.View>
          {/* <ActivityIndicator size="large" color="white" style={styles.loader} /> */}
      </ImageBackground>
  );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: colors.green,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoContainer: {
        alignItems: 'center',
    },
    logo: {
        width: 100,
        height: 100,
    },
    loader: {
        marginTop: 20,
    },
});

export default SplashScreen;
