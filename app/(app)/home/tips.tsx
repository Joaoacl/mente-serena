import { View, Text, ActivityIndicator, ListRenderItem, Image, Pressable, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ExercisesCard from '../../../components/cards/exercisesCard';
import { colors } from '../../../styles/colors';
import { useRouter } from 'expo-router';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import Loading from '../../../components/loading/loading';
import TipsCard from '../../../components/cards/tipsCard';

interface TipData {
  id: string;
  title: string;
  text: string;
}

export default function Tips() {

  const [tips, setTips] = useState<TipData[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchTips = async () => {
      const tipsCollection = collection(db, 'tips');
      const tipsSnapshot = await getDocs(tipsCollection);
      const tipsList = tipsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as TipData[];
      setTips(tipsList);
      setLoading(false);
    };

    fetchTips();
  }, []);

  const renderTip: ListRenderItem<TipData> = ({ item }) => (
    <TipsCard title={item.title} text={item.text} backgroundColor={colors.green[300]} route={`/tipsDetails?id=${item.id}`} />
  );

  return (
    <View className='items-center mt-1 flex-1'>
      <Text style={{ fontSize: hp(2) }} className='font-Bold text-primary mb-4'>Dicas para seu Dia!</Text>
      <View>
        {loading ? (
          <View className="items-center">
            <Loading size={hp(10)} />
          </View>
        ) : (
          <FlatList
            data={tips}
            renderItem={renderTip}
            keyExtractor={(item) => item.id}
          />
        )}
      </View>
    </View>
  )
}