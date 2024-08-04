import { View, Text, Image, TextInput, TouchableOpacity, Alert, ActivityIndicator, Pressable, ScrollView } from 'react-native'
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

export default function SignUp() {

  const router = useRouter()
  const {register} = useAuth()
  const [loading, setLoading] = useState(false)

  const emailRef = useRef("")
  const passwordRef = useRef("")
  const confirmPasswordRef = useRef("")
  const userNameRef = useRef("")
  const profileRef = useRef("")

  const handleRegister = async () => {
    if (!emailRef.current || !passwordRef.current || !userNameRef.current) {
      Alert.alert('Entrar', "Por favor preencha todos os campos!")
      return
    } if (passwordRef.current != confirmPasswordRef.current) {
      Alert.alert('Cadastro', "Sua senha esta divergente!")
      return
    }

    //register process
    setLoading(true)

    let response = await register({
      email: emailRef.current,
      password: passwordRef.current,
      username: userNameRef.current,
      profileUrl: profileRef.current
  })

    setLoading(false)
    console.log('entrar response: ', response)
    console.log('resultado: ', response)
    if(!response.success){
      Alert.alert('Cadastro', response.msg)
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
          <Text style={{ fontSize: hp(2.8) }} className='font-Bold tracking-wider text-left text-primary '>Cadastrar-se</Text>

          {/* Inputs */}
          <View>
            <Text style={{ fontSize: hp(2) }} className='text-primary font-medium'>Nome</Text>
            <View style={{ height: hp(6) }} className='flex-row gap-4 px-3 items-center rounded-2xl border-solid border-2 border-primary'>
              <Feather name="user" size={hp(2.7)} color={colors.primary} />
              <TextInput
                onChangeText={value => userNameRef.current = value}
                style={{ fontSize: hp(2) }}
                className='flex-1 font-regular text-neutral-700' placeholder='Digite seu nome' placeholderTextColor={'gray'} />
            </View>
          </View>

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

          <View>
            <Text style={{ fontSize: hp(2) }} className='text-primary font-medium'>Confirmar senha</Text>
            <View style={{ height: hp(6) }} className='flex-row gap-4 px-3 items-center rounded-2xl border-solid border-2 border-primary'>
              <Feather name="lock" size={hp(2.7)} color={colors.primary} />
              <TextInput
                onChangeText={value => confirmPasswordRef.current = value}
                style={{ fontSize: hp(2) }}
                className='flex-1 font-regular text-neutral-700' placeholder='Confirmar senha' placeholderTextColor={'gray'} />
            </View>
          </View>

          {/* 
          <View>
            <Text style={{ fontSize: hp(2) }} className='text-primary font-medium'>Foto de Perfil</Text>
            <View style={{ height: hp(6) }} className='flex-row gap-4 px-3 items-center rounded-2xl border-solid border-2 border-primary'>
              <Feather name="image" size={hp(2.7)} color={colors.primary} />
              <TextInput
                onChangeText={value => profileRef.current = value}
                style={{ fontSize: hp(2) }}
                className='flex-1 font-regular text-neutral-700' placeholder='Profile url' placeholderTextColor={'gray'} />
            </View>
          </View>
          */}

        </View>
        <View className='px-2 gap-4'>

          {/* Botão cadastrar */}
          <View>
            {
              loading ? (
                <View className='flex-row justify-center'>
                  <ActivityIndicator size="large" color={colors.primary} />
                </View>
              ) : (
                <Button text='Cadastrar' onPress={handleRegister} />
              )
            }
          </View>

          {/* signIn text */}
          <View className='flex-row justify-center'>
            <Text style={{ fontSize: hp(1.7) }} className='font-regular text-primary'>Já possui uma conta? </Text>
            <Pressable onPress={() => router.push('/signIn')}>
              <Text style={{ fontSize: hp(1.7) }} className='font-semiBold text-primary underline'>Acesse aqui</Text>
            </Pressable>
          </View>

        </View>
      </View>
    </ScrollView>
  )
}