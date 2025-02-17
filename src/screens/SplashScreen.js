import React, { useEffect, useState } from 'react';
import { View, Image, ImageBackground, StyleSheet, Animated, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { appIcon, wallpaper } from '../assets/images';
import { colors } from '../constants/Colors';

const SplashScreen = () => {
  const navigation = useNavigation();
  const [progress] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: false,
    }).start();

    const timer = setTimeout(() => {
      navigation.replace('RegisterScreen');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation, progress]);

  return (
    <ImageBackground source={wallpaper} style={styles.background}>
      <View style={styles.logoContainer}>
        <Image source={appIcon} style={styles.logo} resizeMode="contain" />
        <Text style={styles.appName}>ConvoSpace</Text>
      </View>
      <Animated.View
        style={[
          styles.progressBar,
          {
            width: progress.interpolate({
              inputRange: [0, 1],
              outputRange: ['0%', '50%'],
            }),
          },
        ]}
      />
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
    marginBottom: 100,
  },
  logo: {
    width: 100,
    height: 100,
  },
  progressBar: {
    position: 'absolute',
    bottom: 20,
    left: '25%',
    width: '50%',
    height: 5,
    backgroundColor: 'white',
    borderRadius: 2.5,
  },
  appName: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 20,
  },
});

export default SplashScreen;


