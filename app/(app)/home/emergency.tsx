import { View, Text, Alert, TouchableOpacity } from 'react-native'
import React from 'react'
import * as Linking from 'expo-linking';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Image } from 'expo-image';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { colors } from '../../../styles/colors';
import { PanGestureHandler } from 'react-native-gesture-handler';
import LottieView from 'lottie-react-native';


export default function Emergency() {

  const blurhash = 'LFIr1=e.0moJysjsIoR+WBof$$ja';
  const phoneNumber = '188'

  const handleCall = () => {
    Linking.openURL(`tel:${phoneNumber}`).catch(err => {
      Alert.alert('Erro', 'Não foi possível iniciar a ligação.')
      console.error(err)
    });
  };

  return (
    <View className='items-center mt-1 flex-1'>
      <Text style={{ fontSize: hp(2) }} className='font-Bold text-primary mb-4'>Suporte de Emergência</Text>
      <View>
        {/* 
        <Image
          style={{ height: hp(14), aspectRatio: 1 }}
          source={require('../../../assets/images/emergencyCall.png')}
          placeholder={blurhash}
          contentFit="contain"
          transition={500}
        />
        */}

        <View style={{ height: hp(20), aspectRatio: 1 }}>
          <LottieView style={{ flex: 1 }} source={require('../../../assets/images/emergency.json')} resizeMode='cover' autoPlay loop />
        </View>
      </View>
      <View className='px-6 mt-6'>
        <Text style={{ fontSize: hp(1.8) }} className='text-center font-medium text-primary'>Se você está enfrentando uma crise de saúde mental e precisa de ajuda imediata, você não está sozinho. Há apoio disponível.</Text>

        <Text style={{ fontSize: hp(1.8) }} className='text-center font-medium text-primary mt-6'>Ligue para a linha de emergência: <Text className='underline font-Bold'>188</Text></Text>

        <Text style={{ fontSize: hp(1.8) }} className='text-center font-medium text-primary mt-6'>Pressione o botão abaixo para ligar agora. Estamos aqui para ouvir, apoiar e ajudar!</Text>
      </View>
      <View className='mt-16'>
        <TouchableOpacity onPress={handleCall}>
          <View style={{ height: hp(13), aspectRatio: 1 }}>
            <LottieView style={{ flex: 1 }} source={require('../../../assets/images/call.json')} resizeMode='cover' autoPlay loop />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}