import { Stack } from "expo-router"
import CardHeader from "../../components/cardheader/cardHeader"

export default function Layout() {
    return (
        <Stack>
            <Stack.Screen name="termsOfUse" options={{
                header: () => <CardHeader route={'/home'} />,
            }} />
            {/* Outra rota aqui /exercises*/}
        </Stack>
    )
}