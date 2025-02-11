import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import InputComponent from '../components/InputComponent';
import {
    validateUsername,
    validateEmail,
    validatePassword,
    validateConfirmPassword,
} from '../utils/validation';

const RegisterScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = () => {
        if (!validateUsername(username)) {
            Alert.alert('Error', 'Username must be at least 3 characters long');
            return;
        }
        if (!validateEmail(email)) {
            Alert.alert('Error', 'Enter a valid email address');
            return;
        }
        if (!validatePassword(password)) {
            Alert.alert(
                'Error',
                'Password must be 8-20 characters long and include at least one uppercase letter, one number, and one special character.'
            );
            return;
        }
        if (!validateConfirmPassword(password, confirmPassword)) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }

        Alert.alert('Success', 'Registration successful');
        navigation.replace('LoginScreen');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Register</Text>

            <InputComponent
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                keyboardType="default"
                iconName="person"
            />

            <InputComponent
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                iconName="email"
            />

            <InputComponent
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                iconName="lock"
            />

            <InputComponent
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                iconName="lock"
            />

            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                <Text style={styles.loginText}>Already have an account? Login</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#4CAF50',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    loginText: {
        marginTop: 15,
        fontSize: 16,
        color: '#4CAF50',
    },
});

export default RegisterScreen;

