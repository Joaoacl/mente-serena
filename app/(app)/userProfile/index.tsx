import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, Alert, ScrollView } from 'react-native'
import { useAuth } from '../../../context/authContext'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Loading from '../../../components/loading/loading'
import Button from '../../../components/button/button'
import { MaskedTextInput } from 'react-native-mask-text'

export default function ProfileScreen() {
    const { user, updateUserProfile } = useAuth()
    const [name, setName] = useState(user?.username || '')
    const [email, setEmail] = useState(user?.email || '')
    const [phone, setPhone] = useState('')
    const [birthDate, setBirthDate] = useState('')
    const [loading, setLoading] = useState(false)
    

    useEffect(() => {
        if (user) {
            setPhone(user.phone || '')
            setBirthDate(user.birthDate || '')
        }
    }, [user])

    const handleSave = async () => {
        if (!user || !user.id) {
            Alert.alert('Erro', 'Usuário não encontrado')
            return
        }

        setLoading(true)
        const updates = {
            username: name,
            phone,
            birthDate,
        };

        const result = await updateUserProfile(user.id, updates)
        if (result.success) {
            Alert.alert('Perfil', "Perfil atualizado com sucesso!")
        } else {
            console.error(result.error)
            Alert.alert('Perfil', "Erro ao atualizar perfil.")
        }
        setLoading(false)
    }

    return (
        <View className='flex-1'>
            <View className='items-center mt-1'>
                <Text style={{ fontSize: hp(2) }} className='font-Bold text-primary mb-2'>Informações Pessoais</Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Campo de Nome */}
                <View className='px-4'>
                    <Text style={{ fontSize: hp(2) }} className='text-primary font-medium'>Nome</Text>
                    <View style={{ height: hp(6) }} className='flex-row gap-4 px-3 items-center rounded-2xl border-solid border-2 border-primary mb-2'>
                        <TextInput
                            value={name}
                            onChangeText={setName}
                            style={{ fontSize: hp(2), color: '#4A4A4A' }}
                            className='flex-1 font-regular'
                            placeholder='Nome'
                            placeholderTextColor='gray'
                        />
                    </View>
                </View>

                {/* Campo de Email */}
                <View className='px-4'>
                    <Text style={{ fontSize: hp(2) }} className='text-primary font-medium'>Email</Text>
                    <View style={{ height: hp(6) }} className='flex-row gap-4 px-3 items-center rounded-2xl border-solid border-2 border-primary mb-2'>
                        <TextInput
                            value={email}
                            editable={false}
                            style={{ fontSize: hp(2) }}
                            className='flex-1 font-regular text-neutral-500'
                            placeholder='Email'
                            placeholderTextColor='gray'
                        />
                    </View>
                </View>

                {/* Campo de Telefone com Máscara */}
                <View className='px-4'>
                    <Text style={{ fontSize: hp(2) }} className='text-primary font-medium'>Telefone</Text>
                    <View style={{ height: hp(6) }} className='flex-row gap-4 px-3 items-center rounded-2xl border-solid border-2 border-primary mb-2'>
                        <MaskedTextInput
                            mask="(99) 99999-9999"
                            value={phone}
                            onChangeText={(text) => setPhone(text)}
                            style={{
                                fontSize: hp(2),
                                flex: 1,
                                width: '100%',
                                color: '#4A4A4A'
                            }}
                            className='flex-1 font-regular text-neutral-500'
                            placeholder='(ddd) + número'
                            placeholderTextColor='gray'
                            keyboardType='numeric'
                        />
                    </View>
                </View>

                {/* Campo de Data de Nascimento com Máscara */}
                <View className='px-4'>
                    <Text style={{ fontSize: hp(2) }} className='text-primary font-medium'>Data de Nascimento</Text>
                    <View style={{ height: hp(6) }} className='flex-row gap-4 px-3 items-center rounded-2xl border-solid border-2 border-primary mb-2'>
                        <MaskedTextInput
                            mask="99/99/9999"
                            value={birthDate}
                            onChangeText={(text) => setBirthDate(text)}
                            style={{
                                fontSize: hp(2),
                                flex: 1,
                                width: '100%',
                                color: '#4A4A4A'
                            }}
                            className='flex-1 font-regular text-neutral-500'
                            placeholder='DD/MM/AAAA'
                            placeholderTextColor='gray'
                            keyboardType='numeric'
                        />
                    </View>
                </View>

                {/* Botão de Salvar */}
                <View className='px-4 mt-6'>
                    {loading ? (
                        <View className='flex-row justify-center'>
                            <Loading size={hp(5)} />
                        </View>
                    ) : (
                        <Button text='Salvar' onPress={handleSave} />
                    )}
                </View>
            </ScrollView>
        </View>
    );
}
