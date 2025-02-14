import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ChatlistScreen = ({ navigation }) => {
    const [chats, setChats] = useState([
        {
            id: '1',
            name: 'John Doe',
            message: 'Hey! How are you?',
            time: '10:30 AM',
            avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
            unread: 2,
        },
        {
            id: '2',
            name: 'Jane Smith',
            message: 'Let’s catch up later!',
            time: '9:15 AM',
            avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
            unread: 0,
        },
        {
            id: '3',
            name: 'Alex Johnson',
            message: 'See you soon! 😊',
            time: 'Yesterday',
            avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
            unread: 1,
        },
    ]);

    const renderChatItem = ({ item }) => (
        <TouchableOpacity style={styles.chatItem} onPress={() => navigation.navigate('ChatScreen', { user: item })}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <View style={styles.chatInfo}>
                <View style={styles.chatHeader}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.time}>{item.time}</Text>
                </View>
                <Text style={styles.message} numberOfLines={1}>{item.message}</Text>
            </View>
            {item.unread > 0 && (
                <View style={styles.unreadBadge}>
                    <Text style={styles.unreadText}>{item.unread}</Text>
                </View>
            )}
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#128C7E" barStyle="light-content" />
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Chats</Text>
                <View style={styles.headerIcons}>
                    <TouchableOpacity>
                        <Icon name="search" size={25} color="white" style={styles.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Icon name="more-vert" size={25} color="white" style={styles.icon} />
                    </TouchableOpacity>
                </View>
            </View>
            <FlatList
                data={chats}
                keyExtractor={(item) => item.id}
                renderItem={renderChatItem}
                contentContainerStyle={{ paddingBottom: 10 }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#128C7E', // WhatsApp green
        padding: 15,
        paddingTop: 50, // Adjust for status bar height
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'white',
    },
    headerIcons: {
        flexDirection: 'row',
    },
    icon: {
        marginLeft: 20,
    },
    chatItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    chatInfo: {
        flex: 1,
        marginLeft: 10,
    },
    chatHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    time: {
        fontSize: 12,
        color: 'gray',
    },
    message: {
        fontSize: 14,
        color: 'gray',
        marginTop: 3,
    },
    unreadBadge: {
        backgroundColor: 'green',
        width: 20,
        height: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    unreadText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
});

export default ChatlistScreen;
