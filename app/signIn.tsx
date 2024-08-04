import { View, Text, Image, TextInput, TouchableOpacity, Alert, ActivityIndicator, Pressable } from 'react-native'
import React, { useRef, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar'
import { Feather } from '@expo/vector-icons';
import { colors } from '../styles/colors';
import InputLogin from '../components/input/inputLogin';
import Button from '../components/button/button';
import { useRouter } from 'expo-router';
import Loading from '../components/loading/loading';
import { useAuth } from '../context/authContext';

export default function SignIn() {

  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()

  const emailRef = useRef("")
  const passwordRef = useRef("")

  const handleLogin = async () => {
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert('Entrar', "Por favor preencha todos os campos!")
      return
    }

    //login process
    setLoading(true)

    const response = await login({
      email: emailRef.current,
      password: passwordRef.current
    })

    setLoading(false)

    if (!response.success) {
      Alert.alert('Entrar', response.msg)
    }
  }

  return (
    <View className='flex-1' style={{ backgroundColor: colors.white }}>
      <StatusBar style="dark" />
      <View style={{ paddingTop: hp(10), paddingHorizontal: wp(5) }} className='flex-1 gap-10'>
        {/*LOGO MENTE SERENA*/}
        <View className='items-center'>
          <Image style={{ height: hp(18) }} resizeMode='contain' source={require('../assets/images/Logo.png')} />
        </View>

        <View className='gap-2 px-2'>
          <Text style={{ fontSize: hp(3) }} className='font-Bold tracking-wider text-left text-primary '>Entrar</Text>

          {/* Inputs */}
          <View>
            <Text style={{ fontSize: hp(2) }} className='text-primary font-medium'>Email</Text>
            <View style={{ height: hp(6) }} className='flex-row gap-4 px-3 items-center rounded-2xl border-solid border-2 border-primary'>
              <Feather name="mail" size={hp(2.7)} color={colors.primary} />
              <TextInput
                onChangeText={value => emailRef.current = value}
                style={{ fontSize: hp(2) }}
                className='flex-1 font-regular text-neutral-700' placeholder='Digite seu email' placeholderTextColor={'gray'} />
            </View>
          </View>

          <View>
            <Text style={{ fontSize: hp(2) }} className='text-primary font-medium'>Senha</Text>
            <View style={{ height: hp(6) }} className='flex-row gap-4 px-3 items-center rounded-2xl border-solid border-2 border-primary'>
              <Feather name="lock" size={hp(2.7)} color={colors.primary} />
              <TextInput
                onChangeText={value => passwordRef.current = value}
                style={{ fontSize: hp(2) }}
                className='flex-1 font-regular text-neutral-700' placeholder='Digite sua senha' placeholderTextColor={'gray'}
                secureTextEntry={true} />
            </View>
          </View>
          <Text style={{ fontSize: hp(1.8) }} className='text-primary font-regular text-left'>Esqueceu sua senha?</Text>
        </View>
        <View className='px-2'>

          {/* Botão entrar */}
          <View>
            {
              loading ? (
                <View className='flex-row justify-center'>
                  <ActivityIndicator size="large" color={colors.primary} />
                </View>
              ) : (
                <Button text='Acessar' onPress={handleLogin} />
              )
            }
          </View>


          {/* Separador */}
          <View className="flex-row items-center my-4 w-full">
            <View className="flex-1 h-px bg-primary" />
            <Text style={{ fontSize: hp(2) }} className="mx-2 text-primary font-medium">OU</Text>
            <View className="flex-1 h-px bg-primary" />
          </View>

          {/* Botão cadastrar */}
          <Button text='Cadastre-se' onPress={() => router.push('/signUp')} />


          <Pressable className='items-center'>
            <Text style={{ fontSize: hp(1.7) }} className='pt-6 underline text-primary font-regular'>Termos de Uso</Text>
          </Pressable>

        </View>
      </View>
    </View>
  )
}