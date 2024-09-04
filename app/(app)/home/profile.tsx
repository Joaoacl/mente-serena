import { View, Text, Pressable, TouchableOpacity } from 'react-native'
import React from 'react'
import { useAuth } from '../../../context/authContext'
import { colors } from '../../../styles/colors'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Image } from 'expo-image';
import MenuItem from '../../../components/menuitem/menuItem';

const blurhash =
  'LFIr1=e.0moJysjsIoR+WBof$$ja';

export default function Profile() {

  const { logout, user } = useAuth()
  const handleLogout = async () => {
    await logout()
  }

  return (
    <View className='mt-4'>
      {/* Foto perfil usuário */}
      <View className='flex-col items-center'>
        <Image
          style={{ height: hp(12), aspectRatio: 1, borderRadius: 100, borderWidth: 3, borderColor: colors.primary }}
          source={user?.profileUrl}
          placeholder={blurhash}
          contentFit="cover"
          transition={500}
        />
        <Text className='mt-2 text-primary font-semiBold text-center' style={{ fontSize: hp(2.2) }}>{user?.username}</Text>
      </View>

      <View className='px-8 mt-10'>
        <MenuItem text="Informações pessoais" />
        <View className="border-b border-primary mt-2 mb-2" />
        <MenuItem text="Segurança e Privacidade" />
        <View className="border-b border-primary mt-2 mb-2" />
        <MenuItem text="Ajuda e Suporte" />
        <View className="border-b border-primary mt-2 mb-2" />
        <MenuItem text="Termos de Uso" route="/(app)/termsOfUse" />
      </View>


      <View className='mt-40 items-center'>
        <TouchableOpacity style={{ backgroundColor: colors.primary, borderRadius: 10, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: hp(5.5), width: wp(35) }} onPress={handleLogout}>
          <Text style={{ fontSize: hp(2.1) }} className='text-white font-Bold tracking-wider mr-2'>
            Sair
          </Text>

          <MaterialIcons name="logout" size={24} color={colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  )
}