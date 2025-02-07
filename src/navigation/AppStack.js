import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatListScreen from '../screens/ChatListScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CallScreen from '../screens/CallScreen';
import SettingScreen from '../screens/SettingScreen';
import { Ionicons } from '@expo/vector-icons';

// Stack for chat screens
const ChatStack = createNativeStackNavigator();
const ChatStackScreen = () => (
    <ChatStack.Navigator>
        <ChatStack.Screen name="ChatList" component={ChatListScreen} options={{ headerShown: false }} />
        {/* Add other chat-related screens if needed */}
    </ChatStack.Navigator>
);

const Tab = createBottomTabNavigator();

const AppStack = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ color, size }) => {
                    let iconName;
                    if (route.name === 'Chats') iconName = 'chatbubbles';
                    else if (route.name === 'Calls') iconName = 'call';
                    else if (route.name === 'Profile') iconName = 'person';
                    else if (route.name === 'Settings') iconName = 'settings';

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
        >
            <Tab.Screen name="Chats" component={ChatStackScreen} />
            <Tab.Screen name="Calls" component={CallsScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
            <Tab.Screen name="Settings" component={SettingScreen} />
        </Tab.Navigator>
    );
};

export default AppStack;
