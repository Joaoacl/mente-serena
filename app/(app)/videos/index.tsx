import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, Pressable, ScrollView, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importar AsyncStorage
import axios from 'axios';
import Loading from '../../../components/loading/loading';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '../../../styles/colors';

type VideoData = {
  id: string
  title: string
  thumbnailUrl: string
  videoUrl: string
};

export default function AutoAjudaVideos() {
  const [videos, setVideos] = useState<VideoData[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>('Ansiedade')

  const categories = ['Ansiedade', 'Preocupação', 'Desânimo', 'Depressão', 'Pânico']

  const fetchVideos = async (query: string) => {
    setLoading(true)
    setError(null)

    // Verifica se a busca já está no cache
    const cachedData = await AsyncStorage.getItem(query)
    if (cachedData) {
      console.log(`Dados em cache encontrados para ${query}`)
      setVideos(JSON.parse(cachedData)) // Usa os dados do cache
      setLoading(false)
      return
    }


    try {
      console.log(`Buscando vídeos para a categoria: ${query}`)
      const response = await axios.get(`https://www.googleapis.com/youtube/v3/search`, {
        params: {
          part: 'snippet',
          q: `${query} autoajuda`,
          type: 'video',
          maxResults: 5,
          order: 'relevance',
          videoDuration: 'medium',
          fields: 'items(id/videoId,snippet/title,snippet/thumbnails/default/url)',
          key: '',
        },
      })

      console.log('Resposta da API:', response.data)

      const videoItems = response.data.items.map((item: any) => {
        //const thumbnails = item.snippet.thumbnails;

        //const thumbnailUrl = thumbnails.maxres?.url || thumbnails.high?.url || thumbnails.medium?.url || thumbnails.default?.url;

        return {
          id: item.id.videoId,
          title: item.snippet.title,
          //thumbnailUrl: thumbnailUrl,
          videoUrl: `https://www.youtube.com/watch?v=${item.id.videoId}`,

        };
      });

      await AsyncStorage.setItem(query, JSON.stringify(videoItems)) // Cacheia os vídeos
      setVideos(videoItems) // Atualiza o estado com os vídeos obtidos
      setLoading(false)
    } catch (error) {
      console.error('Erro ao buscar vídeos:', error);
      setError('Falha ao carregar vídeos. Tente novamente mais tarde.')
      setLoading(false)
    }
  };

  const clearCacheForCategory = async (category: string) => {
    try {
      await AsyncStorage.removeItem(category)
      console.log(`Cache para a categoria "${category}" foi limpo.`);

    } catch (error) {
      console.error('Erro ao buscar vídeos:', error)
      setError('Falha ao carregar vídeos. Tente novamente mais tarde.')
      setLoading(false)
    }
  };

  const onRefresh = async () => {
    if (selectedCategory) {
      setRefreshing(true)
      await clearCacheForCategory(selectedCategory)
      await fetchVideos(selectedCategory) 
      setRefreshing(false)
    }
  };

  // Este efeito será disparado sempre que uma nova query de busca for definida
  useEffect(() => {
    if (selectedCategory) {
      fetchVideos(selectedCategory)
    }
  }, [selectedCategory])

  const renderVideo = ({ item }: { item: VideoData }) => (
    <Pressable style={{width: wp(92), height: hp(28), borderRadius: 12,
    }} className='bg-green-100 rounded-2xl mb-3' onPress={() => console.log('Abrir vídeo', item.videoUrl)}>
      <Image source={{ uri: `https://i.ytimg.com/vi/${item.id}/hqdefault.jpg` }} style={{ width: '100%', height: hp(20), resizeMode: 'cover', borderTopLeftRadius: 12, borderTopRightRadius: 12}} />
      <Text className='text-left font-medium p-2 text-white' style={{ fontSize: hp(1.5), height: hp(7), overflow: 'hidden', }} numberOfLines={2}>{item.title}</Text>
    </Pressable>
  );

  return (
    <View className='flex-1'>
      <View className='items-center mt-1'>
        <Text style={{ fontSize: 18 }} className='font-Bold text-primary mb-4'>
          Vídeos de Autoajuda
        </Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} pagingEnabled={false} style={{ paddingHorizontal: hp(1), }}>
          {categories.map((category) => (
            <Pressable className='flex-1 mb-6 ml-2'
              key={category}
              style={{
                backgroundColor: selectedCategory === category ? colors.green[200] : colors.green[100],

                padding: 10,
                borderRadius: 10,
                height: hp(5),
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => {
                // Verifica se a categoria já está selecionada para evitar requisições desnecessárias
                if (selectedCategory !== category) {
                  setSelectedCategory(category)
                  setSearchQuery(category)      
                }
              }}
            >
              <Text className='text-white font-medium' style={{ fontSize: hp(1.5) }}>{category}</Text>
            </Pressable>
          ))}
          <View style={{ width: hp(3) }} />
        </ScrollView>

        {error ? (
          <Text>{error}</Text> 
        ) : loading ? (
          <View className="items-center justify-center">
            <Loading size={hp(10)} />
          </View>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={videos}
            renderItem={renderVideo}
            keyExtractor={(item) => item.id}
            refreshControl={
              <RefreshControl
                refreshing={refreshing} 
                onRefresh={onRefresh}
              />
            }
            contentContainerStyle={{
              paddingBottom: hp(20)
            }}
          />
        )}
      </View>
    </View>
  )
}
