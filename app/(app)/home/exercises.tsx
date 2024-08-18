import { View, Text } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ExercisesCard from '../../../components/cards/exercisesCard';
import { colors } from '../../../styles/colors';

export default function Exercises() {
  return (
    <View className='items-center mt-1'>
      <Text style={{ fontSize: hp(2) }} className='font-semiBold text-primary mb-4'>Exercícios Mentais</Text>
      <View>
        <ExercisesCard imageSource={require('../../../assets/icons/guruIcon.png')}
          title="Exercícios Mentais"
          subTitle="Meditação Guiada"
          route="/home/exercises"
          backgroundColor={colors.brown[100]} />

        <ExercisesCard imageSource={require('../../../assets/icons/meditationIcon.png')}
          title="Relaxamento"
          subTitle="Exercícios de Respiração"
          route="/home/exercises"
          backgroundColor={colors.brown[100]} />
      </View>
    </View>
  )
}