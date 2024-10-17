import { View, Text, ActivityIndicator, ListRenderItem, Image, Pressable, FlatList, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '../../../styles/colors';
import { useRouter } from 'expo-router';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
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
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  const fetchTips = async () => {
    const tipsCollection = collection(db, 'tips');
    const tipsQuery = query(tipsCollection, orderBy('date', 'desc')); 
    const tipsSnapshot = await getDocs(tipsQuery);
    const tipsList = tipsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as TipData[];
    setTips(tipsList);
    setLoading(false);
  };

  useEffect(() => {
    fetchTips();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchTips();   
    setRefreshing(false); 
  };

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
            showsVerticalScrollIndicator={false}
            data={tips}
            renderItem={renderTip}
            keyExtractor={(item) => item.id}
            refreshControl={
              <RefreshControl
                refreshing={refreshing} 
                onRefresh={onRefresh}
                colors={[colors.primary]}
              />
            }
            contentContainerStyle={{
              paddingBottom: hp(6),
            }}
          />
        )}
      </View>
    </View>
  )
}