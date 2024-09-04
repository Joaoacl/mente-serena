import React from 'react';
import { Pressable, Image, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function ExercisesCard({ imageSource, title, subTitle, route, backgroundColor }: any) {
    const router = useRouter();
    return (
        <View>
            <Pressable
                style={{ width: wp(90), height: hp(18), marginBottom: hp(2), backgroundColor }}
                className='rounded-3xl px-4 flex-col gap-4 items-center justify-center'
                onPress={() => router.push(route)}
            >
                <Image
                    source={imageSource}
                    style={{ width: 35, height: 35 }}
                    resizeMode='contain'
                />
                <View className='flex-col items-center'>
                    <Text
                        style={{ fontSize: hp(1.7) }}
                        className='font-semiBold text-white'
                    >
                        {title}
                    </Text>
                    <Text
                        style={{ fontSize: hp(1.5) }}
                        className='font-regular text-white'
                    >
                        {subTitle}
                    </Text>
                </View>
            </Pressable>
        </View>
    )
}