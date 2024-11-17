import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import Loading from '../components/loading/loading'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function TermsOfUse() {
  return (
    <View className='items-center mt-1 flex-1 px-8'>
      <Text style={{ fontSize: hp(2) }} className='font-Bold text-primary mb-2'>Termos de Uso - Mente Serena</Text>

      <Text style={{ fontSize: hp(1.5) }} className='font-light text-primary mb-6'>Última Atualização: 13/10/2024</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={{ fontSize: hp(1.5) }} className='font-regular text-primary text-justify mb-4'>Seja bem-vindo(a) ao Mente Serena. Ao utilizar nosso aplicativo, você concorda com os termos e condições descritos abaixo. Por favor, leia atentamente este documento antes de utilizar o aplicativo. Se não concordar com estes Termos de Uso, você não deve usar o Mente Serena.</Text>

        <Text style={{ fontSize: hp(1.5) }} className='font-semiBold text-primary text-justify mb-2'>1. Aceitação dos Termos</Text>
        <Text style={{ fontSize: hp(1.5) }} className='font-regular text-primary text-justify mb-3'>Ao acessar ou utilizar o Mente Serena, você concorda em cumprir e estar sujeito a estes Termos de Uso, bem como a nossa Política de Privacidade. O uso contínuo do aplicativo após quaisquer alterações aos Termos de Uso significa que você concorda com essas modificações.</Text>

        <Text style={{ fontSize: hp(1.5) }} className='font-semiBold text-primary text-justify mb-2'>2. Descrição do Serviço</Text>
        <Text style={{ fontSize: hp(1.5) }} className='font-regular text-primary text-justify mb-3'>O Mente Serena oferece um serviço digital de suporte à saúde mental que inclui meditações guiadas, exercícios respiratórios, monitoramento emocional, conteúdos educacionais e, em alguns casos, consultas com profissionais de saúde mental. O aplicativo não substitui tratamentos médicos ou psicológicos profissionais, servindo apenas como um recurso complementar.</Text>

        <Text style={{ fontSize: hp(1.5) }} className='font-semiBold text-primary text-justify mb-2'>3. Elegibilidade</Text>
        <Text style={{ fontSize: hp(1.5) }} className='font-regular text-primary text-justify mb-3'>Para utilizar o Mente Serena, você deve ter pelo menos 14 anos de idade e estar supervisionado por um responsável legal. Ao aceitar estes Termos de Uso, você confirma que tem a idade necessária ou o consentimento de um responsável para utilizar o aplicativo.</Text>

        <Text style={{ fontSize: hp(1.5) }} className='font-semiBold text-primary text-justify mb-2'>4. Uso do Aplicativo</Text>
        <Text style={{ fontSize: hp(1.5) }} className='font-regular text-primary text-justify'>Você concorda em utilizar o aplicativo Mente Serena de forma responsável, para os fins estabelecidos nestes Termos, e em conformidade com todas as leis e regulamentos aplicáveis. Está proibido:
        </Text>
        <Text style={{ fontSize: hp(1.5) }} className='font-semiBold text-primary text-justify mb-3'>
          Utilizar o aplicativo para finalidades ilegais ou prejudiciais.
          Interferir no funcionamento do aplicativo ou tentar acessá-lo de maneira não autorizada.
          Compartilhar sua conta com terceiros.
        </Text>

        <Text style={{ fontSize: hp(1.5) }} className='font-semiBold text-primary text-justify mb-2'>5. Conteúdo e Propriedade Intelectual</Text>
        <Text style={{ fontSize: hp(1.5) }} className='font-regular text-primary text-justify mb-3'>Todo o conteúdo disponibilizado no Mente Serena, incluindo textos, gráficos, logos, ícones, imagens, áudios e vídeos, é propriedade exclusiva da nossa equipe ou de nossos parceiros licenciados. Você não pode copiar, modificar, distribuir ou utilizar esses materiais sem autorização prévia por escrito.</Text>

        <Text style={{ fontSize: hp(1.5) }} className='font-semiBold text-primary text-justify mb-2'>6. Registro e Segurança da Conta</Text>
        <Text style={{ fontSize: hp(1.5) }} className='font-regular text-primary text-justify mb-3'>Para utilizar certas funcionalidades do aplicativo, você pode precisar criar uma conta e fornecer informações pessoais. Você é responsável por manter a segurança das suas credenciais de acesso e pela atividade que ocorre em sua conta. Caso perceba qualquer uso não autorizado de sua conta, entre em contato imediatamente com nossa equipe de suporte.</Text>

        <Text style={{ fontSize: hp(1.5) }} className='font-semiBold text-primary text-justify mb-2'>7. Assinaturas e Pagamentos</Text>
        <Text style={{ fontSize: hp(1.5) }} className='font-regular text-primary text-justify mb-3'>Algumas funcionalidades do Mente Serena são oferecidas através de planos de assinatura pagos ("Plano Premium"). Ao adquirir uma assinatura, você concorda com os termos de pagamento aplicáveis. Cancelamentos e renovações automáticas serão regidos pelos termos descritos no momento da compra.</Text>

        <Text style={{ fontSize: hp(1.5) }} className='font-semiBold text-primary text-justify mb-2'>8. Isenção de Responsabilidade</Text>
        <Text style={{ fontSize: hp(1.5) }} className='font-regular text-primary text-justify mb-3'>O Mente Serena não é um substituto para diagnóstico ou tratamento médico. Embora ofereçamos ferramentas para auxiliar na saúde mental, é importante procurar ajuda profissional em caso de necessidade. Não garantimos que o uso do aplicativo resultará em melhorias significativas na sua saúde mental.</Text>

        <Text style={{ fontSize: hp(1.5) }} className='font-semiBold text-primary text-justify mb-2'>9. Alterações nos Termos</Text>
        <Text style={{ fontSize: hp(1.5) }} className='font-regular text-primary text-justify mb-6'>Podemos alterar estes Termos de Uso a qualquer momento. Quando isso ocorrer, faremos uma comunicação no aplicativo ou via e-mail. O uso contínuo do Mente Serena após as alterações constituirá sua aceitação dos novos termos.</Text>

        <Text style={{ fontSize: hp(1.8) }} className='font-semiBold text-primary text-center mb-24'>Obrigado por utilizar o Mente Serena!</Text>
      </ScrollView>
    </View>
  )
}