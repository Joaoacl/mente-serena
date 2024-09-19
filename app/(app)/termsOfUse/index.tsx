import { View, Text } from 'react-native'
import React from 'react'
import Loading from '../../../components/loading/loading'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function TermsOfUse() {
  return (
    <View>
      <Text>TermsOfUse</Text>
      <View className='flex-1 items-center'>
      <Loading size={hp(6)}/>
      </View>
    </View>
  )
}