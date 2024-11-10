import { View, Text, ActivityIndicator, ListRenderItem, Image, Pressable, FlatList, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '../../../styles/colors';
import { useRouter } from 'expo-router';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import Loading from '../../../components/loading/loading';
import InfoCard from '../../../components/cards/infoCard';

interface InfoData {
  id: string;
  title: string;
  subtitle: string;
}

export default function InfoPanel() {

  const [info, setInfo] = useState<InfoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  const fetchInfo = async () => {
    const infoCollection = collection(db, 'info');
    const infoQuery = query(infoCollection, orderBy('date', 'desc')); 
    const infoSnapshot = await getDocs(infoQuery);
    const infoList = infoSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as InfoData[];
    setInfo(infoList);
    setLoading(false);
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchInfo();   
    setRefreshing(false); 
  };

  const renderInfo: ListRenderItem<InfoData> = ({ item }) => (
    <InfoCard title={item.title} text={item.subtitle} backgroundColor={colors.green[200]} route={`/infopanel/infoDetails?id=${item.id}`} />
  );

  return (
    <View className='items-center mt-1 flex-1'>
      <Text style={{ fontSize: hp(2) }} className='font-Bold text-primary mb-4'>Painel Infomátivo</Text>
      <View>
        {loading ? (
          <View className="items-center">
            <Loading size={hp(10)} />
          </View>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={info}
            renderItem={renderInfo}
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