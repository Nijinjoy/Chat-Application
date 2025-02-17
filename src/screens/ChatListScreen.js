import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, StatusBar, Animated, Alert } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ChatlistScreen = ({ navigation }) => {
    const [chats, setChats] = useState([
        { id: '1', name: 'John Doe', message: 'Hey! How are you?', time: '10:30 AM', avatar: 'https://randomuser.me/api/portraits/men/1.jpg', unread: 2 },
        { id: '2', name: 'Jane Smith', message: 'Let’s catch up later!', time: '9:15 AM', avatar: 'https://randomuser.me/api/portraits/women/2.jpg', unread: 0 },
        { id: '3', name: 'Alex Johnson', message: 'See you soon! 😊', time: 'Yesterday', avatar: 'https://randomuser.me/api/portraits/men/3.jpg', unread: 1 },
    ]);

    const [archivedChats, setArchivedChats] = useState([]);
    const [showArchived, setShowArchived] = useState(false);

    // Delete Chat
    const deleteChat = (id) => {
        setChats(chats.filter(chat => chat.id !== id));
    };

    // Archive Chat
    const archiveChat = (id) => {
        const chatToArchive = chats.find(chat => chat.id === id);
        if (chatToArchive) {
            setChats(chats.filter(chat => chat.id !== id));
            setArchivedChats([chatToArchive, ...archivedChats]);
        }
    };

    // Unarchive Chat
    const unarchiveChat = (id) => {
        const chatToUnarchive = archivedChats.find(chat => chat.id === id);
        if (chatToUnarchive) {
            setArchivedChats(archivedChats.filter(chat => chat.id !== id));
            setChats([chatToUnarchive, ...chats]);
        }
    };

    // Render Right Swipe Actions (Delete)
    const renderRightActions = (progress, dragX, id) => {
        const scale = dragX.interpolate({
            inputRange: [-100, 0],
            outputRange: [1, 0],
            extrapolate: 'clamp',
        });

        return (
            <TouchableOpacity onPress={() => deleteChat(id)} style={styles.deleteButton}>
                <Animated.View style={{ transform: [{ scale }] }}>
                    <Icon name="delete" size={30} color="white" />
                </Animated.View>
            </TouchableOpacity>
        );
    };

    // Render Chat Item
    const renderChatItem = ({ item }, isArchived = false) => (
        <Swipeable renderRightActions={(progress, dragX) => renderRightActions(progress, dragX, item.id)}>
            <TouchableOpacity
                style={styles.chatItem}
                onPress={() => navigation.navigate('ChatScreen', { user: item })}
                onLongPress={() => isArchived ? unarchiveChat(item.id) : archiveChat(item.id)}
            >
                <Image source={{ uri: item.avatar }} style={styles.avatar} />
                <View style={styles.chatInfo}>
                    <View style={styles.chatHeader}>
                        <Text style={styles.name}>{item.name}</Text>
                        <Text style={styles.time}>{item.time}</Text>
                    </View>
                    <Text style={styles.message} numberOfLines={1}>{item.message}</Text>
                </View>
                {item.unread > 0 && !isArchived && (
                    <View style={styles.unreadBadge}>
                        <Text style={styles.unreadText}>{item.unread}</Text>
                    </View>
                )}
            </TouchableOpacity>
        </Swipeable>
    );

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#128C7E" barStyle="light-content" />

            {/* Header */}
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

            {/* Archived Chats Section */}
            {archivedChats.length > 0 && (
                <TouchableOpacity style={styles.archiveHeader} onPress={() => setShowArchived(!showArchived)}>
                    <Icon name="archive" size={20} color="gray" />
                    <Text style={styles.archiveText}>
                        {showArchived ? 'Hide Archived Chats' : `Archived Chats (${archivedChats.length})`}
                    </Text>
                    <Icon name={showArchived ? 'expand-less' : 'expand-more'} size={20} color="gray" />
                </TouchableOpacity>
            )}

            {/* Archived Chats List */}
            {showArchived && (
                <FlatList
                    data={archivedChats}
                    keyExtractor={(item) => item.id}
                    renderItem={(item) => renderChatItem(item, true)}
                />
            )}

            {/* Regular Chats List */}
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
        backgroundColor: '#128C7E',
        padding: 15,
        paddingTop: 50,
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
    archiveHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f1f1f1',
        padding: 10,
        marginBottom: 5,
    },
    archiveText: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
        fontWeight: 'bold',
        color: 'gray',
    },
    chatItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        backgroundColor: 'white',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    chatInfo: {
        // flex: 1,
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
    deleteButton: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        height: '100%',
    },
});

export default ChatlistScreen;
