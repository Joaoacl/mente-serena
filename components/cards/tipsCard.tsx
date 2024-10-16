import React from 'react';
import { Pressable, Image, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function TipsCard({ title, text, route, backgroundColor }: any) {
    const router = useRouter();
    return (
        <View>
            <Pressable
                style={{ width: wp(90), height: hp(20), marginBottom: hp(2), backgroundColor }}
                className='rounded-3xl p-5 flex-col items-start justify-start'
                onPress={() => router.push(route)}
            >
                <View className='flex-col'>
                    <Text
                        style={{ fontSize: hp(1.7) }}
                        className='font-semiBold text-white mb-1'
                    >
                        {title}
                    </Text>
                    <Text
                        style={{ fontSize: hp(1.6) }}
                        className='font-regular text-white text-justify'
                    >
                        {text}
                    </Text>
                </View>
            </Pressable>
        </View>
    )
}