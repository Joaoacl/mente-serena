import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '../../../styles/colors';


type ExerciseDetails = {
    title: string;
    description: string;
    imageSource: string;
    content: string;
};

export default function ExerciseDetails() {
    const [exercise, setExercise] = useState<ExerciseDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const { id } = useLocalSearchParams(); // Obtem o ID do exercício da rota

    useEffect(() => {
        const fetchExercise = async () => {
            try {
                const docRef = doc(db, 'exercises', id as string);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setExercise(docSnap.data() as ExerciseDetails);
                } else {
                    console.log("No such document!");
                }
                setLoading(false);
            } catch (error) {
                console.error("Error fetching document: ", error);
                setLoading(false);
            }
        };

        fetchExercise();
    }, [id]);

    if (loading) {
        return <View className='flex-row justify-center'>
            <ActivityIndicator size="large" color={colors.primary} />
        </View>
    }

    if (!exercise) {
        return <Text>Exercício não encontrado</Text>;
    }

    return (
        <View className='flex-1 p-4'>

            <Text className='font-bold text-2xl mb-2'>{exercise.title}</Text>
            <Text className='text-lg mb-4'>{exercise.description}</Text>
            <Text className='text-base'>{exercise.content}</Text>
        </View>
    );
};

