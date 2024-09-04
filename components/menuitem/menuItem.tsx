import React from 'react'
import { Pressable, Text, TouchableOpacity, View } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';
import { colors } from '../../styles/colors';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { router } from 'expo-router';
import { useRouter } from 'expo-router';

export default function MenuItem({ text, icon, route }: any) {
    const router = useRouter();

    return (
        <View>
            <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between' }} onPress={() => router.push(route)}>
                <View className='flex-row items-center gap-2'>
                    <Text style={{ fontSize: hp(1.8) }} className='font-medium text-primary text-center'>{text}</Text>
                </View>
                <AntDesign name="right" size={22} color={colors.primary} />
            </TouchableOpacity>
        </View>
    )
}
