import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { colors } from '../../styles/colors'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useRouter } from 'expo-router';

interface ButtonProps {
  text: string
  onPress: () => void
}

export default function Button({text, onPress}: ButtonProps) {
  return (
    <View>
      <TouchableOpacity style={{ backgroundColor: colors.primary, borderRadius: 10, justifyContent: 'center', alignItems: 'center', height: hp(5.5) }} onPress={onPress}>
        <Text style={{ fontSize: hp(2.1) }} className='text-white font-Bold tracking-wider'>
          {text}
        </Text>
      </TouchableOpacity>
    </View>
  )
}