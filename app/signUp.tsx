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
import * as ImagePicker from 'expo-image-picker';
//import { storage } from '../firebaseConfig';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

export default function SignUp() {

  const router = useRouter()
  const { register } = useAuth()
  const [loading, setLoading] = useState(false)
  const [profileImage, setProfileImage] = useState<any>(null)

  const emailRef = useRef("")
  const passwordRef = useRef("")
  const confirmPasswordRef = useRef("")
  const userNameRef = useRef("")
  const profileRef = useRef("")


  const handleRegister = async () => {
    if (!emailRef.current || !passwordRef.current || !userNameRef.current || !profileRef.current) {
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
      profileUrl: profileRef.current,
    })

    setLoading(false)
    console.log('entrar response: ', response)
    console.log('resultado: ', response)
    if (!response.success) {
      Alert.alert('Cadastro', response.msg)
    }

  }

  //Escolher a imagem
  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("Permissão para acessar a galeria é necessária!");
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    })

    if (!result.canceled && result.assets.length > 0) {
      setProfileImage(result.assets[0].uri) // Armazena o URI da imagem no estado
      profileRef.current = result.assets[0].uri;

    }
  };


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
                className='flex-1 font-regular text-neutral-700' placeholder='Confirmar senha' placeholderTextColor={'gray'}
                secureTextEntry={true} />
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

          <View className="mt-1">
            <Text style={{ fontSize: hp(2) }} className='text-primary font-medium'>Foto de Perfil</Text>
            <View className=''>
              {profileImage && <Image source={{ uri: profileImage }} style={{ width: 60, height: 60, borderRadius: 50, marginTop: 5, borderWidth: 2, borderColor: colors.primary }} />}
            </View>
            <TouchableOpacity style={{ flexDirection: 'row', gap: 4, alignItems: 'center', justifyContent: 'center', marginTop: 5 }} onPress={pickImage} >
              <Feather name="image" size={hp(2.7)} color={colors.primary} />
              <Text style={{ fontSize: hp(2) }} className='flex-1 font-regular text-neutral-600'>
                {profileImage ? "Alterar foto de perfil" : "Selecionar foto de perfil"}
              </Text>
            </TouchableOpacity>

          </View>

        </View>
        <View className='px-2 gap-4'>

          {/* Botão cadastrar */}
          <View>
            {
              loading ? (
                <View className='flex-row justify-center'>
                  <Loading size={hp(5)} />
                </View>
              ) : (
                <Button text='Cadastrar' onPress={handleRegister} />
              )
            }
          </View>

          {/* signIn text */}
          <View className='flex-row justify-center mb-10'>
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