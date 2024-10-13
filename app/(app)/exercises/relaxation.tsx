// app/exercises/relaxamento.tsx
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Bar } from 'react-native-progress';
import LottieView from 'lottie-react-native';
import { colors } from '../../../styles/colors';
import { useRouter } from 'expo-router';

export default function Relaxamento() {

    const router = useRouter();

    const steps = [
        {
            title: "Introdução",
            description: "Este exercício guiado irá ajudar você a diminuir o estresse e a ansiedade, promovendo uma sensação de paz e equilíbrio. Comece encontrando um local confortável onde você possa sentar ou deitar tranquilamente.",
            duration: "Vamos lá!",
        },
        {
            title: "Respiração Profunda",
            description: "Sente-se confortavelmente com a coluna ereta ou deite-se. Feche os olhos e coloque uma mão sobre o abdômen e a outra sobre o peito. Inspire profundamente pelo nariz por 4 segundos, segure por 6 segundos, e expire lentamente pela boca por 6 segundos. Repita o ciclo por 1 a 2 minutos.",
            duration: "Passo 1",
        },
        {
            title: "Respiração Alternada",
            description: "Sente-se confortavelmente e feche os olhos. Com a mão direita, bloqueie a narina direita. Inspire pela narina esquerda por 4 segundos, bloqueie a narina esquerda e expire pela narina direita. Continue alternando por 1 a 2 minutos.",
            duration: "Passo 2",
        },
        {
            title: "Relaxamento Progressivo",
            description: "Comece focando nos pés, tensionando e relaxando cada parte do corpo até chegar à face. Permita que todos os músculos do corpo estejam em um estado de calma total.",
            duration: "Passo 3",
        },
        {
            title: "Respiração 4-7-8",
            description: "Inspire pelo nariz contando até 4, segure a respiração por 7 segundos e expire lentamente pela boca contando até 8. Repita o ciclo por 4 a 6 vezes.",
            duration: "Passo 4",
        },
        {
            title: "Visualização Guiada",
            description: "Imagine um local calmo e relaxante, como uma praia tranquila. Foque nos detalhes desse ambiente por alguns minutos.",
            duration: "Passo 5",
        },
        {
            title: "Encerramento",
            description: "Foque em sua respiração, mexa os dedos das mãos e pés suavemente. Quando estiver pronto, abra os olhos e levante-se lentamente.",
            duration: "Passo 6",
        },
        {
            title: "Parabéns!",
            description: "Você completou o exercício de relaxamento com sucesso! Continue praticando regularmente para manter sua mente e corpo em equilíbrio.",
            duration: "",
        },
    ];

    const [currentStep, setCurrentStep] = useState(0);

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            router.navigate('/(app)/exercises')
        }
    };

    const progress = (currentStep + 1) / steps.length; // Cálculo do progresso

    return (
        <View className='items-center mt-1 flex-1'>
            <Text style={{ fontSize: hp(2) }} className='text-primary font-semiBold mb-4'>{steps[currentStep].title}</Text>
            {/* Animação do Lottie */}
            {currentStep === 0 && (
                <View style={{ height: hp(20), aspectRatio: 1 }}>
                    <LottieView style={{ flex: 1 }} source={require('../../../assets/images/relaxing.json')} resizeMode='cover' autoPlay loop />
                </View>
            )}
             {currentStep === steps.length - 1 && (
                <View style={{ height: hp(20), aspectRatio: 1 }}>
                    <LottieView style={{ flex: 1 }} source={require('../../../assets/images/check.json')} resizeMode='cover' autoPlay loop />
                </View>
            )}

            <View className='items-center mt-4 px-10'>
                <Text style={{ fontSize: hp(1.9) }} className='text-primary font-regular text-justify'>{steps[currentStep].description}</Text>
            </View>

            <View className='items-center' style={{
                position: 'absolute', bottom: 50
            }}>

                <Text style={{ fontSize: hp(1.4) }} className='text-primary font-regular text-justify'>{steps[currentStep].duration}</Text>

                {/* Barra de Progresso */}
                <Bar
                    progress={progress}
                    width={wp('85%')}
                    color={colors.brown[100]} // Cor da barra
                    className='my-6'
                />

                <TouchableOpacity style={{
                    backgroundColor: colors.brown[100], borderRadius: 10, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: hp(5.5), width: wp(80), marginTop: 10
                }} onPress={handleNext} >
                    <Text style={{ fontSize: hp(2.1) }} className='text-white font-Bold tracking-wider'>
                        {currentStep === 0 ? "Iniciar" : currentStep === steps.length - 1 ? "Finalizar" : "Próximo"}
                    </Text>

                </TouchableOpacity>
            </View>
        </View >
    );
};



