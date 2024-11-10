import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import Loading from '../../../components/loading/loading'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function PolicyAndPrivacy() {
    return (
        <View className='items-center mt-1 flex-1 px-8'>
            <Text style={{ fontSize: hp(2) }} className='font-Bold text-primary mb-2 text-center'>Política de Privacidade - Mente Serena</Text>

            <Text style={{ fontSize: hp(1.5) }} className='font-light text-primary mb-6'>Última Atualização: 21/10/2024</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={{ fontSize: hp(1.5) }} className='font-regular text-primary text-justify mb-4'>A sua privacidade é importante para nós. Esta Política de Privacidade explica como o aplicativo Mente Serena coleta, usa, compartilha e protege suas informações pessoais. Recomendamos que você leia esta política com atenção para entender nossos processos de coleta e uso de dados</Text>

                <Text style={{ fontSize: hp(1.5) }} className='font-semiBold text-primary text-justify mb-2'>1. Informações que coletamos</Text>
                <Text style={{ fontSize: hp(1.5) }} className='font-regular text-primary text-justify mb-3'>Informações que você nos fornece, Dados de registro : Quando você cria uma conta, coletamos informações como nome, e-mail, senha, telefone e dados de nascimento.
                </Text>

                <Text style={{ fontSize: hp(1.5) }} className='font-semiBold text-primary text-justify mb-2'>2. Como Usamos Suas Informações</Text>
                <Text style={{ fontSize: hp(1.5) }} className='font-regular text-primary text-justify mb-3'>Usamos suas informações para criar e gerenciar sua conta, fornecer suporte ao cliente e personalizar sua experiência no aplicativo.
                    Podemos usar seu e-mail e telefone para enviar notificações importantes, atualizações, dicas de bem-estar e outros conteúdos relacionados ao aplicativo.
                </Text>

                <Text style={{ fontSize: hp(1.5) }} className='font-semiBold text-primary text-justify mb-2'>3. Compartilhamento de Informações com Terceiros</Text>
                <Text style={{ fontSize: hp(1.5) }} className='font-regular text-primary text-justify mb-3'>Podemos compartilhar suas informações com provedores terceirizados que nos auxiliam a operar o aplicativo, como serviços de hospedagem, análise de dados e suporte técnico. Podemos divulgar suas informações exigidas por lei, regulamentação ou processo legal. Não compartilhemos suas informações pessoais com terceiros para fins de marketing sem seu consentimento explícito.</Text>

                <Text style={{ fontSize: hp(1.5) }} className='font-semiBold text-primary text-justify mb-2'>4. Segurança de Suas Informações</Text>
                <Text style={{ fontSize: hp(1.5) }} className='font-regular text-primary text-justify mb-3'>Adotamos medidas de segurança rigorosas para proteger suas informações pessoais contra acesso não autorizado, alteração, divulgação ou destruição. Isso inclui o uso de criptografia, autenticação em duas etapas e restrição de acesso aos seus dados.
                </Text>


                <Text style={{ fontSize: hp(1.5) }} className='font-semiBold text-primary text-justify mb-2'>5. Seus Direitos</Text>
                <Text style={{ fontSize: hp(1.5) }} className='font-regular text-primary text-justify mb-3'>Você pode acessar e atualizar suas informações pessoais a qualquer momento por meio das configurações do seu perfil no aplicativo. Se desejar excluir sua conta e todos os dados associados, você pode fazer essa solicitação nas configurações do aplicativo ou entrar em contato conosco.
                </Text>

                <Text style={{ fontSize: hp(1.5) }} className='font-semiBold text-primary text-justify mb-2'>6. Alterações nesta Política de Privacidade</Text>
                <Text style={{ fontSize: hp(1.5) }} className='font-regular text-primary text-justify mb-3'>Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos você sobre quaisquer alterações importantes por meio do aplicativo ou por e-mail.</Text>

                <Text style={{ fontSize: hp(1.5) }} className='font-semiBold text-primary text-justify mb-2'>7. Consentimento</Text>
                <Text style={{ fontSize: hp(1.5) }} className='font-regular text-primary text-justify mb-3'>Ao utilizar o aplicativo "Mente Serena", você concorda com esta Política de Privacidade e autoriza a coleta, uso e compartilhamento de suas informações conforme descrito acima.
                </Text>

                <Text style={{ fontSize: hp(1.8) }} className='font-semiBold text-primary text-center mb-24'>Obrigado por utilizar o Mente Serena!</Text>
            </ScrollView>
        </View>
    )
}