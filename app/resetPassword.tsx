import { View, Text, ScrollView, Image, TextInput, Alert, Pressable } from 'react-native'
import React, { useRef, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Feather } from '@expo/vector-icons'
import { colors } from '../styles/colors'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Loading from '../components/loading/loading'
import Button from '../components/button/button'
import { useAuth } from '../context/authContext'
import { useRouter } from 'expo-router'

export default function ResetPassword() {

    const [loading, setLoading] = useState(false)
    const emailRef = useRef("")
    const { resetPassword } = useAuth()
    const router = useRouter()

    const handlePasswordReset = async () => {
        if (!emailRef.current) {
            Alert.alert('Redefinir senha', 'Por favor, insira seu e-mail');
            return;
        }

        setLoading(true)

        const response = await resetPassword(emailRef.current);
        if (response.success) {
            setLoading(false)
            Alert.alert('Redefinir senha', 'E-mail de redefinição enviado com sucesso!');
            
        } else {
            Alert.alert('Erro', response.msg);
        }
    }

    return (
        <ScrollView className='flex-1'
            style={{ backgroundColor: colors.white }} showsVerticalScrollIndicator={false}>

            <StatusBar style="dark" />
            <View style={{ paddingTop: hp(8), paddingHorizontal: wp(5) }} className='flex-1 gap-10'>
                {/*LOGO MENTE SERENA*/}
                <View className='items-center'>
                    <Image style={{ height: hp(14) }} resizeMode='contain' source={require('../assets/images/Logo.png')} />
                </View>

                <View className='gap-2 px-2'>
                    <Text style={{ fontSize: hp(2.5) }} className='font-Bold tracking-wider text-left text-primary '>Esqueceu sua senha?</Text>

                    {/* Inputs */}
                    <View>
                        <Text style={{ fontSize: hp(2) }} className='text-primary font-medium mb-2'>Vamos te enviar um email de recuperação</Text>
                        <View style={{ height: hp(6) }} className='flex-row gap-4 px-3 items-center rounded-2xl border-solid border-2 border-primary'>
                            <Feather name="mail" size={hp(2.7)} color={colors.primary} />
                            <TextInput
                                onChangeText={value => emailRef.current = value}
                                style={{ fontSize: hp(2) }}
                                className='flex-1 font-regular text-neutral-700' placeholder='Digite seu email' placeholderTextColor={'gray'} />
                        </View>
                    </View>
                    <View className='mt-3'>
                        {
                            loading ? (
                                <View className='flex-row justify-center'>
                                    <Loading size={hp(5)} />
                                </View>
                            ) : (
                                <Button text='Enviar' onPress={handlePasswordReset} />
                            )
                        }
                    </View>
                    <View className='items-center mt-3'>
                        <Pressable onPress={() => router.push('/signIn')}>
                            <Text style={{ fontSize: hp(2) }} className='text-primary font-medium mb-2 '>Fazer Login</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}