import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
    const navigation = useNavigation();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace('RegisterScreen'); // Navigate after 4 seconds
        }, 4000);

        return () => clearTimeout(timer); // Cleanup timeout on unmount
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Welcome to My App</Text>
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
        width: 200,
        height: 200,
        marginBottom: 20,
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
});
