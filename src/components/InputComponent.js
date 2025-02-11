import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const InputComponent = ({ placeholder, value, onChangeText, secureTextEntry, keyboardType, iconName }) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(secureTextEntry);

    return (
        <View style={styles.container}>
            {/* Left Icon */}
            <Icon name={iconName} size={24} color="#666" style={styles.icon} />

            {/* Text Input */}
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                placeholderTextColor="#999"
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={isPasswordVisible}
                keyboardType={keyboardType}
            />

            {/* Password Visibility Toggle */}
            {secureTextEntry && (
                <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                    <Icon name={isPasswordVisible ? 'visibility-off' : 'visibility'} size={24} color="#666" style={styles.eyeIcon} />
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 50,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 15,
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
    eyeIcon: {
        marginLeft: 10,
    },
});

export default InputComponent;

