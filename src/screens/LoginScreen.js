import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';

const LoginScreen = () => {
    const user = useSelector((state) => state.user.user);
    console.log("Redux State:", user);

    useEffect(() => {
        console.log("User Details from Redux:", user);
    }, [user]);

    return (
        <View>
            <Text>Welcome, {user?.username || 'Guest'}!</Text>
            <Text>Email: {user?.email}</Text>
            <Text>UID: {user?.uid}</Text>
        </View>
    )
}

export default LoginScreen
