import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, ListRenderItem, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '../../../styles/colors';
import Loading from '../../../components/loading/loading';


type ExerciseData = {
    id: string
    title: string
};

export default function ExerciseDetails() {
    const [exercise, setExercise] = useState<ExerciseData | null>(null);
    const [loading, setLoading] = useState(true);
    const { id } = useLocalSearchParams(); // Obtem o ID do exercício da rota
    const router = useRouter()

    useEffect(() => {
        const fetchExercise = async () => {
            try {
                const docRef = doc(db, 'exercises', id as string);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setExercise(docSnap.data() as ExerciseData);
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

    const routeMap: { [key: string]: string } = {
        'relaxamento': '/exercises/relaxation',
        'bem-estar emocional': '/exercises/emotional',
        'meditação': '/exercises/meditation',
    };
    
    const handlePress = (title: string) => {
        const route = routeMap[title.toLowerCase()]
        if (route) {
            router.push(route)
        } else {
            console.log('Exercício não encontrado')
        }
    };

    const renderItem: ListRenderItem<ExerciseData> = ({ item }) => (
        <Pressable
            style={{ width: wp(90), height: hp(15), backgroundColor: colors.brown[100] }}
            className='rounded-3xl px-4 flex-col gap-2 items-center justify-center mb-4'
            onPress={() => handlePress(item.title)}
        >
            <Image
                source={{ uri: item.imageSource }}
                style={{ width: 35, height: 35 }}
                className='items-center'
            />
            <View className='items-center'>
                <Text className='font-bold text-white' style={{ fontSize: hp(2) }}>{item.title}</Text>
                <Text className='text-white' style={{ fontSize: hp(1.5) }}>{item.description}</Text>
            </View>
        </Pressable>
    );

    return (
        <View className='items-center mt-1 flex-1'>
            <Text style={{ fontSize: hp(2) }} className='font-Bold text-primary mb-4'>Exercícios Mentais</Text>
            <View>
                {loading ? (
                    <View className="items-center">
                        <Loading size={hp(10)} />
                    </View>
                ) : (
                    <FlatList
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                    />
                )}
            </View>
        </View>
    )
};

