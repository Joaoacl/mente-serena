import React from 'react';
import { View, Text, ScrollView, Pressable, Linking, Alert } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { colors } from '../../../styles/colors';
import { useRouter } from 'expo-router';

export default function HelpSupportScreen() {

    const router = useRouter();


    const openLink = async (url: string) => {
        const supported = await Linking.canOpenURL(url);
    
        if (supported) {
            try {
                await Linking.openURL(url);
            } catch (error) {
                Alert.alert('Erro', 'Não foi possível abrir o link.');
            }
        } else {
            Alert.alert('Erro', 'Nenhum aplicativo encontrado para abrir este link.');
        }
    };
    

    return (
        <View className='mt-1 flex-1 px-4'>
            <View className='items-center mt-1'>
                <Text style={{ fontSize: hp(2) }} className='font-Bold text-primary mb-4'>Ajuda e Suporte</Text>
            </View>



            {/* Seção de Formulário de Suporte */}
            <View className='mb-4 bg-gray-200 p-6 rounded-2xl'>

                <Text style={{ fontSize: hp(2) }} className='font-medium text-primary mb-2'>
                    Fale Conosco
                </Text>

                <Pressable
                    onPress={() => openLink('mailto:suporte@menteserena.com')}
                    className='bg-primary rounded-2xl p-3 items-center flex-row justify-center gap-2 mb-4'
                >
                    <MaterialCommunityIcons name="email-send-outline" size={24} color={colors.white} />
                    <Text style={{ fontSize: hp(1.8) }} className='text-white font-medium'>
                        Enviar Pergunta por E-mail
                    </Text>
                </Pressable>

                <Pressable
                    onPress={() => openLink('https://wa.me/5517981717281')}
                    className='bg-primary rounded-2xl p-3 items-center flex-row justify-center gap-2'
                >
                    <MaterialCommunityIcons name="whatsapp" size={24} color={colors.white} />
                    <Text style={{ fontSize: hp(1.8) }} className='text-white font-medium'>
                        Abrir Chat no WhatsApp
                    </Text>
                </Pressable>

            </View>

            {/* Links Úteis */}
            <View className='mb-6 bg-gray-200 p-6 rounded-2xl'>
                <Text style={{ fontSize: hp(2) }} className='font-medium text-primary mb-2'>
                    Links Úteis
                </Text>
                <Pressable onPress={() => openLink('https://blog.menteserena.com')}>
                    <Text style={{ fontSize: hp(1.8) }} className='text-neutral-500 mb-2'>
                        Visite nosso Blog para Dicas e Artigos
                    </Text>
                </Pressable>
                <Pressable onPress={() => router.push("/(app)/policyAndPrivacy")}>
                    <Text style={{ fontSize: hp(1.8) }} className='text-neutral-500 mb-2'>
                        Política de Privacidade
                    </Text>
                </Pressable>
                <Pressable onPress={() => router.push("/(app)/termsOfUse")}>
                    <Text style={{ fontSize: hp(1.8) }} className='text-neutral-500'>
                        Termos de Uso
                    </Text>
                </Pressable>
            </View>

        </View>
    );
}
