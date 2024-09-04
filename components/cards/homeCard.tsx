import React from 'react';
import { Pressable, Image, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function HomeCard({ imageSource, title, route, backgroundColor }: any) {
  const router = useRouter();
  return (
    <View>
      <Pressable
        style={{ width: wp(40), height: hp(20), marginBottom: hp(3.5), backgroundColor }}
        className='rounded-3xl px-4 flex-col gap-12 justify-center'
        onPress={() => router.push(route)}
      >
        <Image
          source={imageSource}
          style={{ width: 35, height: 35 }}
          resizeMode='contain'
        />
        <Text
          style={{ fontSize: hp(1.7) }}
          className='font-medium mr-8 text-white'
        >
          {title}
        </Text>
      </Pressable>
    </View>
  )
}