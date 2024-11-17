import { Stack } from "expo-router"
import CardHeader from "../../components/cardheader/cardHeader"

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="home" options={{ headerShown: false }} />
      {/* Outra rota aqui /exercises*/}
      <Stack.Screen name="exercises/index" options={{
        header: () => <CardHeader route={'/home'} />,
      }} />
      <Stack.Screen name="exercises/relaxation" options={{
        header: () => <CardHeader route={'/home'} />,
      }} />
      <Stack.Screen name="exercises/emotional" options={{
        header: () => <CardHeader route={'/home'} />,
      }} />
      <Stack.Screen name="exercises/meditation" options={{
        header: () => <CardHeader route={'/home'} />,
      }} />
      {/* Outra rota aqui /psychologists*/}
      <Stack.Screen name="psychologists/index" options={{
        header: () => <CardHeader route={'/home'} />,
      }} />
      {/* Outra rota aqui /videos*/}
      <Stack.Screen name="videos/index" options={{
        header: () => <CardHeader route={'/home'} />,
      }} />
      {/* Outra rota aqui /infopanel*/}
      <Stack.Screen name="infopanel/index" options={{
        header: () => <CardHeader route={'/home'} />,
      }} />
      <Stack.Screen name="infopanel/infoDetails" options={{
        header: () => <CardHeader route={'/home'} />,
      }} />
      {/* Outra rota aqui /termsOfUse*/}
      <Stack.Screen name="termsOfUse/index" options={{
        header: () => <CardHeader route={'/home'} />,
      }} />
      {/* Outra rota aqui /policyAndPrivacy*/}
      <Stack.Screen name="policyAndPrivacy/index" options={{
        header: () => <CardHeader route={'/home'} />,
      }} />
       {/* Outra rota aqui /support*/}
       <Stack.Screen name="support/index" options={{
        header: () => <CardHeader route={'/home'} />,
      }} />
      {/* Outra rota aqui /tripsDetails*/}
      <Stack.Screen name="tipsDetails/index" options={{
        header: () => <CardHeader route={'/home'} />,
      }} />
      {/* Outra rota aqui /userProfile*/}
      <Stack.Screen name="userProfile/index" options={{
        header: () => <CardHeader route={'/home'} />,
      }} />
      {/* Outra rota aqui /feeling*/}
      <Stack.Screen name="feeling/index" options={{
        header: () => <CardHeader route={'/home'} />,
      }} />
      {/* Outra rota aqui /feeling/report*/}
      <Stack.Screen name="feeling/report" options={{
        header: () => <CardHeader route={'/home'} />,
      }} />
      {/* Outra rota aqui /feeling/feelings*/}
       <Stack.Screen name="feeling/feelings" options={{
        header: () => <CardHeader route={'/home'} />,
      }} />
      {/* Outra rota aqui /feeling/reportDetails*/}
      <Stack.Screen name="feeling/reportDetails" options={{
        header: () => <CardHeader route={'/home'} />,
      }} />
    </Stack>
  )
}