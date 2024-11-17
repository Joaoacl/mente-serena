import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useReportDatabase } from '../../../database/useReportDatabase'
import { colors } from '../../../styles/colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Button from '../../../components/button/button';
import { useAuth } from '../../../context/authContext';

const sentimentosList = ['Feliz', 'Triste', 'Ansioso', 'Calmo', 'Cansado', 'Motivado', 'Estressado',];

export default function Feelings() {
    const { report } = useLocalSearchParams();
    const [feelings, setFeelings] = useState<string[]>([]);
    const router = useRouter();
    const { user } = useAuth();

    const reportDatabase = useReportDatabase()

    const parsedReport = report ? JSON.parse(report as string) : '';

    const toggleSentimento = (sentimento: string) => {
        setFeelings(prev =>
            prev.includes(sentimento) ? prev.filter(s => s !== sentimento) : [...prev, sentimento]
        );
    };

    const handleSave = async () => {
        if (!user?.id) {
            Alert.alert('Erro', 'Usuário não autenticado.');
            return;
        }

        if (feelings.length === 0) {
            Alert.alert('Atenção', 'Por favor, selecione ao menos um sentimento.');
            return;
        }
        try {
            const feelingsString = feelings.join(', ');
            const currentDate = new Date().toISOString();

            const response = await reportDatabase.create({ report: parsedReport, feelings: feelingsString, date: currentDate, userId: user.id, })

            Alert.alert('Sucesso', 'Relato salvo com sucesso! ');

            //router.navigate('/feeling');
            const newReport = { id: response.insertedRowId, report: parsedReport, feelings: feelingsString, date: currentDate };
            router.navigate({
                pathname: '/feeling',
                params: { newReport: JSON.stringify(newReport) }
            });
        } catch (error) {
            console.log(error)
            Alert.alert('Erro', 'Não foi possível salvar o relato.');
        }
        //await salvarRelato(relato, sentimentos.join(', '));
    };

    return (
        <View className='mt-1 flex-1 px-4'>
            <Text style={{ fontSize: hp(2) }} className='font-Bold text-primary text-center'>Como você se sente?</Text>
            <Text style={{ fontSize: hp(1.7) }} className='font-regular text-primary mb-4 text-center'>Selecione os sentimentos que melhor descrevem como você está se sentindo</Text>

            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                {sentimentosList.map((sentimento, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => toggleSentimento(sentimento)}
                        style={{
                            paddingVertical: 10,
                            paddingHorizontal: 5,
                            backgroundColor: feelings.includes(sentimento) ? colors.primary : '#E0E0E0',
                            margin: 5,
                            borderRadius: 10,
                            minWidth: wp(25),
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Text className='font-regular' style={{ color: feelings.includes(sentimento) ? 'white' : 'black', fontSize: hp(1.8) }}>
                            {sentimento}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <View className='mt-6'>
                <Button text="Salvar Relato" onPress={handleSave} />
            </View>
        </View>
    );
}
