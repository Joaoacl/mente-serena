import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { useReportDatabase, ReportDatabase } from '../../../database/useReportDatabase';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '../../../styles/colors';
import Loading from '../../../components/loading/loading';

export default function ReportDetails() {
  const { id } = useLocalSearchParams();
  const reportDatabase = useReportDatabase();
  const [report, setReport] = useState<ReportDatabase | null>(null);

  useEffect(() => {
    async function fetchReport() {
      if (id) {
        const response = await reportDatabase.getById(Number(id));
        console.log("Dados recuperados detalhes:", response);


        if (response && response.length > 0) {
          setReport(response[0]);
        }
      }
    }
    fetchReport();
  }, [id]);

  return (
    <View className='mt-1 flex-1 px-6'>
      {report ? (
        <View>
          <Text style={{ fontSize: hp(2) }} className='font-Bold text-primary mb-4 text-center'>Relato do dia <Text style={{ fontSize: hp(2), color: colors.primary }}>
            {report.date ? new Date(report.date).toLocaleDateString('pt-BR') : 'Data não disponível'}
          </Text></Text>
          
          <Text className='text-justify text-primary font-regular' style={{ fontSize: hp(1.8), color: colors.primary }}>{report.report || 'Sem relato'}</Text>

          <Text className='text-justify text-primary font-semiBold' style={{ fontSize: hp(1.8), marginTop: 20 }}>Sentimentos</Text>
          <Text className='text-justify text-primary font-medium' style={{ fontSize: hp(1.8), color: colors.primary }}>{report.feelings || 'Sem sentimentos registrados'}</Text>
    
        </View>
      ) : (
        <View className='flex-row justify-center'>
          <Loading size={hp(5)} />
        </View>
      )}
    </View>
  );
}
