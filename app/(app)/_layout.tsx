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
      {/* Outra rota aqui /termsOfUse*/}
      <Stack.Screen name="termsOfUse/index" options={{
        header: () => <CardHeader route={'/home'} />,
      }} />
    </Stack>
  )
}