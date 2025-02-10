import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
    const [pageIndex, setPageIndex] = useState(0);

    const slides = [
        "Connect with your friends instantly and chat seamlessly.",
        "Share media, voice messages, and enjoy real-time conversations.",
        "Stay connected with secure and private messaging anytime, anywhere."
    ];

    const handleNext = () => {
        if (pageIndex < slides.length - 1) {
            setPageIndex(pageIndex + 1);
        } else {
            navigation.replace('RegisterScreen'); // Navigate to RegisterScreen after last slide
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to ChatApp</Text>
            <Text style={styles.subtitle}>{slides[pageIndex]}</Text>

            {/* Pagination Dots */}
            <View style={styles.paginationContainer}>
                {slides.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.dot,
                            { backgroundColor: index === pageIndex ? '#4CAF50' : 'gray' }
                        ]}
                    />
                ))}
            </View>

            <TouchableOpacity style={styles.button} onPress={handleNext}>
                <Text style={styles.buttonText}>{pageIndex < slides.length - 1 ? 'Next' : 'Get Started'}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#4CAF50',
        textAlign: 'center',
        marginBottom: 30,
    },
    subtitle: {
        fontSize: 18,
        color: 'gray',
        textAlign: 'center',
        marginBottom: 20,
    },
    paginationContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    button: {
        backgroundColor: '#4CAF50',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default WelcomeScreen;
