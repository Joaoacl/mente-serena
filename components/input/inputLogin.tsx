import { View, Text, TextInput } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons'
import { colors } from '../../styles/colors'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

interface InputLoginProps {
  text: string,
  icon: any,
  placeholder: string,
  onChangeText: () => void
}

export default function InputLogin(props: InputLoginProps) {
  return (
    <View>
      <Text style={{ fontSize: hp(2) }} className='text-primary font-medium mb-1'>{props.text}</Text>
      <View style={{ height: hp(7) }} className='flex-row gap-4 px-3 items-center rounded-2xl border-solid border-2 border-primary'>
        <Feather name={props.icon} size={hp(2.7)} color={colors.primary} />
        <TextInput
          onChangeText={props.onChangeText}
          style={{ fontSize: hp(2) }} className='flex-1 font-normal text-neutral-700' placeholder={props.placeholder} placeholderTextColor={'gray'} />
      </View>
    </View>
  )
}