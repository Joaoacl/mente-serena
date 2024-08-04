import { View, Text, Platform, Pressable } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image'
import { useAuth } from '../../context/authContext';


const blurhash =
    'LFIr1=e.0moJysjsIoR+WBof$$ja';

const ios = Platform.OS == 'ios'
export default function HomeHeader() {

    const { user } = useAuth()
    const { top } = useSafeAreaInsets()

    return (
        <View style={{ paddingTop: ios ? top : top + 12 }} className='flex-row justify-between px-6 pb-6 bg-white'>
            <View>
                <Image
                    style={{ height: hp(4.3), aspectRatio: 2 }}
                    source={require('../../assets/images/Logo.png')}
                    placeholder={blurhash}
                    contentFit="cover"
                    transition={500}
                />
            </View>
            {/* Foto perfil usuário */}
            
            <View className='px-1'>
                <Image
                    style={{ height: hp(4.3), aspectRatio: 1, borderRadius: 100 }}
                    source={user?.profileUrl}
                    placeholder={blurhash}
                    contentFit="cover"
                    transition={500}
                />
            </View>
        </View>
    )
}