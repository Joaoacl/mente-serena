import { View, Text, Alert, TouchableOpacity } from 'react-native'
import React from 'react'
import * as Linking from 'expo-linking';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Image } from 'expo-image';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors } from '../../../styles/colors';

export default function Emergency() {

  const blurhash =
    'LFIr1=e.0moJysjsIoR+WBof$$ja';

  const handleCall = () => {
    const phoneNumber = '188'
    Linking.openURL(`tel:${phoneNumber}`).catch(err => {
      Alert.alert('Erro', 'Não foi possível iniciar a ligação.')
      console.error(err)
    });
  };

  return (
    <View className='items-center mt-1 flex-1'>
      <Text style={{ fontSize: hp(2) }} className='font-Bold text-primary mb-4'>Suporte de Emergência</Text>
      <View>
        <Image
          style={{ height: hp(14), aspectRatio: 1 }}
          source={require('../../../assets/images/emergencyIcon.png')}
          placeholder={blurhash}
          contentFit="contain"
          transition={500}
        />
      </View>
      <View className='px-6 mt-6'>
        <Text style={{ fontSize: hp(1.8) }} className='text-center font-medium text-primary'>Se você está enfrentando uma crise de saúde mental e precisa de ajuda imediata, você não está sozinho. Há apoio disponível.</Text>

        <Text style={{ fontSize: hp(1.8) }} className='text-center font-medium text-primary mt-6'>Ligue para a linha de emergência: <Text className='underline font-Bold'>188</Text></Text>

        <Text style={{ fontSize: hp(1.8) }} className='text-center font-medium text-primary mt-6'>Pressione o botão abaixo para ligar agora. Estamos aqui para ouvir, apoiar e ajudar!</Text>
      </View>
      <View className='mt-12'>
        <TouchableOpacity style={{
          width: 70,
          height: 70,
          backgroundColor: colors.primary,
          borderRadius: 50,
          justifyContent: 'center',
          alignItems: 'center',
          shadowColor: colors.secondary,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 3.84,
          elevation: 5,
        }} onPress={handleCall}>
          <Ionicons name="call" size={hp(5)} color={colors.secondary} />
        </TouchableOpacity>
      </View>
    </View>
  )
}