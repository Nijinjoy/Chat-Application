import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import SplashScreen from '../screens/SplashScreen';

const Routes = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false); // Hide SplashScreen after 4 seconds
        }, 4000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <NavigationContainer>
            {isLoading ? <SplashScreen /> : <AuthStack />}
        </NavigationContainer>
    );
};

export default Routes;

