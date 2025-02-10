import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const settingsOptions = [
    { id: '1', title: 'Account', icon: 'person' },
    { id: '2', title: 'Chat', icon: 'chat' },
    { id: '3', title: 'Notifications', icon: 'notifications' },
    { id: '4', title: 'Help', icon: 'help-outline' },
    { id: '5', title: 'Storage', icon: 'storage' },
    { id: '6', title: 'Invite Friend', icon: 'group-add' },
];

const SettingScreen = () => {
    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.item}>
            <View style={styles.iconContainer}>
                <Icon name={item.icon} size={24} color="#fff" />
            </View>
            <Text style={styles.text}>{item.title}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {/* Fixed Profile Section */}
            <View style={styles.profileContainer}>
                <Image
                    source={{ uri: 'https://randomuser.me/api/portraits/men/45.jpg' }}
                    style={styles.profileImage}
                />
                <Text style={styles.profileName}>John Doe</Text>
            </View>

            {/* Scrollable FlatList */}
            <View style={styles.flatListContainer}>
                <FlatList
                    data={settingsOptions}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    profileImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    profileName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginLeft: 15,
    },
    flatListContainer: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        minHeight: 70,  // Increased height for each item
        paddingVertical: 15, // Adjusted padding for better spacing
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#4CAF50',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        marginLeft: 15,
        color: '#333',
    },
    separator: {
        height: 1,
        backgroundColor: '#ddd',
        marginVertical: 5,
    },
});

export default SettingScreen;
