import { SafeAreaView, StyleSheet, Text, View } from "react-native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Home from "./screens/Home"
import { RootStackParamList } from "./types"
import Delivery from "./screens/Delivery"
import Complete from "./screens/Complete"

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Delivery" component={Delivery} />
        <Stack.Screen
          name="Complete"
          options={{ headerBackVisible: false }}
          component={Complete}
        />
      </Stack.Navigator>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
  },
})
