import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
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
                tabBarIcon: ({ color, size }) => {
                    let iconName;
                    switch (route.name) {
                        case 'Chats':
                            iconName = 'chat-bubble-outline';
                            break;
                        case 'Calls':
                            iconName = 'call';
                            break;
                        case 'Contacts':
                            iconName = 'people-outline';
                            break;
                        case 'Settings':
                            iconName = 'settings';
                            break;
                        default:
                            iconName = 'circle';
                    }
                    return <Icon name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#2e7d32', // WhatsApp-like green color
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: {
                    height: 60,
                    backgroundColor: 'white',
                    borderTopWidth: 1,
                    borderTopColor: '#ddd',
                },
                // tabBarShowLabel: false, 
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


const Stack = createStackNavigator();

const Routes = () => {
    const [initialRoute, setInitialRoute] = useState('SplashScreen');

    useEffect(() => {
        const checkUserRegistration = async () => {
            try {
                const userRegistered = await AsyncStorage.getItem('userRegistered');
                if (userRegistered === 'true') {
                    setInitialRoute('Main'); 
                } else {
                    setInitialRoute('WelcomeScreen'); 
                }
            } catch (error) {
                console.error('Error reading user registration status:', error);
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

