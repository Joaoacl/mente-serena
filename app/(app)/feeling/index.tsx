import { View, Text, FlatList, ActivityIndicator, RefreshControl, Pressable, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Button from '../../../components/button/button';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useReportDatabase, ReportDatabase } from '../../../database/useReportDatabase';
import { colors } from '../../../styles/colors';
import Loading from '../../../components/loading/loading';
import { Href } from 'expo-router';
import { useAuth } from '../../../context/authContext';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function Feeling() {
    const router = useRouter();
    const reportDatabase = useReportDatabase();
    const { user } = useAuth();
    const { newReport } = useLocalSearchParams();
    const [relatos, setRelatos] = useState<ReportDatabase[]>([]);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);


    async function list() {
        if (user?.id) {
            setLoading(true);
            try {
                const response = await reportDatabase.getByUserId(user.id);
                setRelatos(response);
            } catch (error) {
                console.error("Erro ao buscar relatos:", error);
            } finally {
                setLoading(false);
            }
        }
    }

    useEffect(() => {
        if (newReport) {
            const parsedNewReport = JSON.parse(newReport as string);
            setRelatos((prevRelatos) => [parsedNewReport, ...prevRelatos]);
        }
    }, [newReport]);

    useEffect(() => {
        list();
    }, [user]);

    const onRefresh = async () => {
        setRefreshing(true);
        try {
            await list();
        } catch (error) {
            console.error("Erro ao recarregar relatos:", error);
        } finally {
            setRefreshing(false);
        }
    };

    const renderItem = ({ item }: { item: ReportDatabase }) => (
        <Pressable onPress={() => router.push(`/feeling/reportDetails?id=${item.id}` as Href)}>
            <View style={{
                marginBottom: hp(2),
                padding: 15,
                backgroundColor: colors.shadePrimary,
                borderRadius: 10,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 5,
                elevation: 1,
                height: hp(24),
                justifyContent: 'space-between'
            }}>
                <View className='flex-row items-center justify-between'>
                    <View style={{
                        borderRadius: 10,
                        alignItems: 'center',
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.1,
                        shadowRadius: 3,
                        elevation: 5,
                    }}>
                        <Text style={{ fontSize: 18 }}>{item.emotion}</Text>
                    </View>
                    <Text style={{ fontSize: hp(1.6), fontWeight: 'bold', color: colors.ligth }}>
                        {new Date(item.date).toLocaleDateString('pt-BR', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                        })}</Text>
                </View>

                <Text className='font-semiBold' style={{ fontSize: hp(1.8), color: colors.ligth }}>Relato</Text>
                <Text
                    style={{ fontSize: hp(1.7), color: colors.ligth }}
                    className='font-regular text-justify'
                    numberOfLines={3}
                    ellipsizeMode='tail'>{item.report}</Text>

                <Text className='font-semiBold' style={{ fontSize: hp(1.8), color: colors.ligth, marginTop: 5 }}>Sentimentos</Text>
                <Text
                    style={{ fontSize: hp(1.7), color: colors.ligth }}
                    className='font-medium'
                    numberOfLines={1}
                    ellipsizeMode='tail'>{item.feelings || "Nenhum sentimento registrado"}</Text>
            </View>
        </Pressable>
    );

    return (
        <View className='mt-1 flex-1 px-4'>
            <Text style={{ fontSize: hp(2) }} className='font-Bold text-primary mb-4 text-center'>Como está se sentindo</Text>

            <View className='items-center'>
                <TouchableOpacity style={{ backgroundColor: colors.primary, borderRadius: 10, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: hp(5.5), width: '100%' }} onPress={() => router.push('/feeling/report')}>
                    <Text style={{ fontSize: hp(2.1) }} className='text-white font-Bold tracking-wider mr-2'>
                        Adicionar relato
                    </Text>

                    <MaterialCommunityIcons name="pencil-plus" size={24} color={colors.white}/>
                </TouchableOpacity>
            </View>

           

            <View className='mt-4'>
                <Text style={{ fontSize: hp(1.8) }} className='text-primary font-medium'>Meus relatos</Text>
            </View>

            {loading ? (
                <View className='flex-row justify-center'>
                    <Loading size={hp(5)} />
                </View>
            ) : (
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={relatos}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={{ paddingVertical: 10 }}
                    ListEmptyComponent={<View><Text className='text-primary text-center font-regular' style={{ marginTop: 20 }}>Você ainda não adicionou nenhum relato</Text><Text className='text-primary text-center font-medium'>Aproveite para fazer seu primeiro!</Text></View>
                    }
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            colors={[colors.primary]}
                        />
                    }
                />
            )}
        </View>
    );
}
