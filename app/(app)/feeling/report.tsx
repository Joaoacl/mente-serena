import React, { useState } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '../../../styles/colors';
import Button from '../../../components/button/button';

export default function Report() {
    const [report, setReport] = useState('');
    const router = useRouter();

    const handleSaveReport = () => {
        if (!report.trim()) {
            Alert.alert('Atenção', 'Por favor, escreva seu relato.');
            return;
        }

        router.push({
            pathname: '/feeling/feelings',
            params: { report: JSON.stringify(report) }
        });
    };

    return (
        <View className='mt-1 flex-1 px-4'>
            <Text style={{ fontSize: hp(2) }} className='font-Bold text-primary text-center'>Relato do dia</Text>
            <Text style={{ fontSize: hp(1.7) }} className='font-regular text-primary mb-4 text-center'>Conte-nos o que quiser, vamos ouvir você!</Text>
            <View>
                <TextInput
                    placeholder="Escreva seu relato..."
                    placeholderTextColor={'gray'}
                    value={report}
                    onChangeText={setReport}
                    style={{ borderColor: colors.primary, borderWidth: 1.5, borderRadius: 10, padding: 10, height: 250 }}
                    multiline
                    maxLength={350}
                />
            </View>
            <View className='mt-6'>
                <Button text='Próximo' onPress={handleSaveReport} />
            </View>
        </View>
    );
}
