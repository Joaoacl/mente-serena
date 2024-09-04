import { Stack } from "expo-router"
import CardHeader from "../../components/cardheader/cardHeader"

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="home" options={{ headerShown: false }} />
      {/* Outra rota aqui /exercises*/}
      <Stack.Screen name="exercisesDetails/index" options={{
        header: () => <CardHeader route={'/home'} />,
      }} />
      <Stack.Screen name="termsOfUse/index" options={{
        header: () => <CardHeader route={'/home'} />,
      }} />
    </Stack>
  )
}