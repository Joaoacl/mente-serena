import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '../../../styles/colors';
import Loading from '../../../components/loading/loading';


type TipDetails = {
    title: string;
    text: string;
};

export default function TipsDetails() {
    const [tip, setTip] = useState<TipDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const { id } = useLocalSearchParams(); // Obtem o ID do exercício da rota

    useEffect(() => {
        const fetchTip = async () => {
            try {
                const docRef = doc(db, 'tips', id as string);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setTip(docSnap.data() as TipDetails);
                } else {
                    console.log("No such document!");
                }
                setLoading(false);
            } catch (error) {
                console.error("Error fetching document: ", error);
                setLoading(false);
            }
        };

        fetchTip();
    }, [id]);

    if (loading) {
        return <View className="items-center">
            <Loading size={hp(10)} />
        </View>
    }

    if (!tip) {
        return <Text>Dica não encontrada</Text>;
    }

    return (
        <View className='items-center mt-1 flex-1'>
            <Text style={{ fontSize: hp(2) }} className='font-Bold text-primary mb-4'>{tip.title}</Text>
            <View className='items-center px-6'>
                <Text style={{ fontSize: hp(2) }} className='mb-4 text-justify font-regular text-primary'>{tip.text}</Text>
            </View>
        </View>
    );
};
