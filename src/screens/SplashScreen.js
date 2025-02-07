import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
    const navigation = useNavigation();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.navigate('RegisterScreen'); // Navigate after 4 seconds
        }, 4000);

        return () => clearTimeout(timer); // Cleanup timeout on unmount
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Text>SplashScreen</Text>
        </View>
    );
};

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    image: {
        width: 250,
        height: 250,
    },
});
