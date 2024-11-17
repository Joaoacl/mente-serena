import { View, Text, Pressable, TouchableOpacity } from 'react-native'
import React from 'react'
import { useAuth } from '../../../context/authContext'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import HomeCard from '../../../components/cards/homeCard';
import { colors } from '../../../styles/colors';
import HomeCardAlter from '../../../components/cards/homeCardAlter';

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
          route="/(app)/exercises"
          backgroundColor={colors.brown[100]} />

        <HomeCard imageSource={require('../../../assets/icons/psychologyIcon.png')}
          title="Psicólogos Próximos"
          route="/(app)/psychologists"
          backgroundColor={colors.brown[200]} />

        <HomeCard imageSource={require('../../../assets/icons/videoIcon.png')}
          title="Vídeos de Autoajuda"
          route="/(app)/videos"
          backgroundColor={colors.green[100]} />

        <HomeCard imageSource={require('../../../assets/icons/infoIcon.png')}
          title="Painel Informátivo"
          route="/(app)/infopanel"
          backgroundColor={colors.green[200]} />

        <HomeCardAlter imageSource={require('../../../assets/icons/feelingIcon.png')}
          title="Como você está se sentindo?"
          route="/(app)/feeling"
          backgroundColor={colors.green[300]} />
      </View>


    </View>
  )
}