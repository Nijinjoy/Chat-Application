import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { StyleSheet, View } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import ChatlistScreen from '../screens/ChatListScreen';
import SettingScreen from '../screens/SettingScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SplashScreen from '../screens/SplashScreen';
import RegisterScreen from '../screens/RegisterScreen';
import LoginScreen from '../screens/LoginScreen';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size, focused }) => {
                    let iconName;
                    switch (route.name) {
                        case 'Chats':
                            iconName = 'chat';
                            break;
                        case 'Calls':
                            iconName = 'call';
                            break;
                        case 'Contacts':
                            iconName = 'people';
                            break;
                        case 'Settings':
                            iconName = 'settings';
                            break;
                        default:
                            iconName = 'circle';
                    }
                    return <Icon name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#2e7d32', // Active tab color
                tabBarInactiveTintColor: '#888', // Inactive tab color
                tabBarStyle: styles.tabBar,
                tabBarLabelStyle: styles.tabBarLabel,
                headerShown: false,
            })}
        >
            <Tab.Screen name="Chats" component={ChatlistScreen} />
            <Tab.Screen name="Calls" component={HomeScreen} />
            <Tab.Screen name="Contacts" component={ProfileScreen} />
            <Tab.Screen name="Settings" component={SettingScreen} />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    tabBar: {
        height: 60,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
        paddingBottom: 5,
    },
    tabBarLabel: {
        fontSize: 12,
        fontWeight: '500',
        marginBottom: 5,
    },
});

const Stack = createStackNavigator();

const Routes = () => {
    const [initialRoute, setInitialRoute] = useState('SplashScreen');

    useEffect(() => {
        const checkUserRegistration = async () => {
            try {
                const userRegistered = await AsyncStorage.getItem('userRegistered');
                setInitialRoute(userRegistered === 'true' ? 'Main' : 'RegisterScreen');
            } catch (error) {
                console.error('Error reading user registration status:', error);
                setInitialRoute('RegisterScreen'); // Fallback route
            }
        };
        checkUserRegistration();
    }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={initialRoute}>
                <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
                <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Main" component={BottomTabs} options={{ headerShown: false }} />
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Routes;
