import { View, Text, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { Slot, useRouter, useSegments, SplashScreen } from 'expo-router'
import "../global.css"
import { AuthContextProvider, useAuth } from '../context/authContext'
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold, Poppins_300Light } from '@expo-google-fonts/poppins'


const MainLayout = () => {
    const { isAuthenticated } = useAuth()
    const segments = useSegments()
    const router = useRouter()

    useEffect(() => {
        //verifica se o usuário está autenticado
        if (typeof isAuthenticated == 'undefined') return
        const inApp = segments[0] == '(app)'
        if (isAuthenticated && !inApp) {
            //redireciona para home
            router.replace('/home/')
        } else if (isAuthenticated == false) {
            //redireciona para signIn
            router.replace('/signIn')
        }
    }, [isAuthenticated])

    return <Slot />
}

export default function RootLayout() {

    {/* FontFamily */}
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
            <MainLayout />
        </AuthContextProvider>
    )
}