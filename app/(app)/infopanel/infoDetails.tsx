import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '../../../styles/colors';
import Loading from '../../../components/loading/loading';


type TipDetails = {
    title: string;
    text: string;
    description: string;
    text1: string;
};

export default function TipsDetails() {
    const [info, setInfo] = useState<TipDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const { id } = useLocalSearchParams();

    useEffect(() => {
        const fetchInfo = async () => {
            try {
                const docRef = doc(db, 'info', id as string);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setInfo(docSnap.data() as TipDetails);
                } else {
                    console.log("No such document!");
                }
                setLoading(false);
            } catch (error) {
                console.error("Error fetching document: ", error);
                setLoading(false);
            }
        };

        fetchInfo();
    }, [id]);

    if (loading) {
        return <View className="items-center">
            <Loading size={hp(10)} />
        </View>
    }

    if (!info) {
        return <Text>Informações não encontradas</Text>;
    }

    return (
        <View className='items-center mt-1 flex-1'>
            <Text style={{ fontSize: hp(2) }} className='font-Bold text-primary mb-4'>{info.title}</Text>
            <ScrollView>
                <View className='items-center px-7'>
                    <Text style={{ fontSize: hp(1.9) }} className='mb-4 text-justify font-regular text-primary'>{info.description}</Text>
                </View>
            </ScrollView>
        </View>
    );
};
