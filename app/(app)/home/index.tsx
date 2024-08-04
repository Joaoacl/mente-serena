import { View, Text, Pressable, TouchableOpacity } from 'react-native'
import React from 'react'
import { useAuth } from '../../../context/authContext'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import HomeCard from '../../../components/cards/homeCard';
import { colors } from '../../../styles/colors';

export default function Home() {
  
  const { user } = useAuth()
 
  console.log('user data: ', user)

  return (
    <View className='flex-1 bg-white'>

      {user && (
        <View className='px-6'>
          <Text style={{ fontSize: hp(1.5) }} className='text-primary font-medium'>Olá <Text className='font-semiBold'>{user.username}</Text>,</Text>
          <View>
            <Text style={{ fontSize: hp(1.5) }} className='text-primary font-medium'>Bem vindo(a) de volta!</Text>
          </View>
        </View>
      )}

      <View className='flex-row justify-between flex-wrap'
        style={{ paddingHorizontal: hp(3), marginTop: hp(3) }}>

        <HomeCard imageSource={require('../../../assets/icons/exercisesIcon.png')}
          title="Exercícios Mentais"
          route="/home/exercises"
          backgroundColor={colors.brown[100]} />

        <HomeCard imageSource={require('../../../assets/icons/psychologyIcon.png')}
          title="Psicólogos Próximos"
          route="/home/"
          backgroundColor={colors.brown[200]} />

        <HomeCard imageSource={require('../../../assets/icons/videoIcon.png')}
          title="Vídeos de Autoajuda"
          route="/home/exercises"
          backgroundColor={colors.green[100]} />

        <HomeCard imageSource={require('../../../assets/icons/infoIcon.png')}
          title="Painel Informátivo"
          route="/home/"
          backgroundColor={colors.green[200]} />
      </View>


    </View>
  )
}