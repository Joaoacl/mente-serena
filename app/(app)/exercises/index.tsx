import { View, Text, ActivityIndicator, ListRenderItem, Image, Pressable, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ExercisesCard from '../../../components/cards/exercisesCard';
import { colors } from '../../../styles/colors';
import { useRouter } from 'expo-router';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import Loading from '../../../components/loading/loading';

type ExerciseData = {
    id: string;
    title: string;
    description: string;
    imageSource: string;
};

export default function Exercises() {

    const [data, setData] = useState<ExerciseData[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const handlePress = (id: string) => {
        router.push({
            pathname: '/exercises/exercisesDetails',
            params: { id },
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'exercises'));
                const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as ExerciseData[];
                setData(items);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data: ", error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const renderItem: ListRenderItem<ExerciseData> = ({ item }) => (
        <Pressable
            style={{ width: wp(90), height: hp(15), backgroundColor: colors.brown[100] }}
            className='rounded-3xl px-4 flex-col gap-2 items-center justify-center mb-4'
            onPress={() => handlePress(item.id)}
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
}