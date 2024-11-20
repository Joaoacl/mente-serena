import { View, Text, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { Slot, useRouter, useSegments, SplashScreen } from 'expo-router'
import "../global.css"
import { AuthContextProvider, useAuth } from '../context/authContext'
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold, Poppins_300Light } from '@expo-google-fonts/poppins'
import { SQLiteProvider } from 'expo-sqlite'
import { initializeDatabase } from '../database/initializeDatabase'


const MainLayout = () => {
    const { isAuthenticated, loading } = useAuth();
    const segments = useSegments();
    const router = useRouter();

    useEffect(() => {
        if (loading) return;

        const inApp = segments[0] === '(app)';
        if (isAuthenticated && !inApp) {
            router.replace('/home');
        } else if (!isAuthenticated) {
            router.replace('/signIn');
        }
    }, [isAuthenticated, loading]);

    return (
        <Slot />
    );
};


export default function RootLayout() {

    {/* FontFamily */ }
    const [fontsLoaded, fontError] = useFonts({
        Poppins_300Light,
        Poppins_400Regular,
        Poppins_500Medium,
        Poppins_600SemiBold,
        Poppins_700Bold,
    })

    useEffect(() => {
        if (fontsLoaded || fontError) {
            SplashScreen.hideAsync()
        }
    }, [fontsLoaded, fontError])

    if (!fontsLoaded && !fontError) {
        return null
    }

    return (
        <AuthContextProvider>
            <SQLiteProvider databaseName='menteSerena.db' onInit={initializeDatabase}>
                <MainLayout />
            </SQLiteProvider>
        </AuthContextProvider>
    )
}