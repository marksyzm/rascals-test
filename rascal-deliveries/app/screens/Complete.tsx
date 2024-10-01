import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { Delivery, Product, RootStackParamList } from "../types"
import { useNavigation } from "@react-navigation/native"
import { Pressable, StyleSheet, Text, View } from "react-native"
import { useCallback } from "react"

type ProductNavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>

const deliveryPeriodToFriendlyName = (period: string) => {
  switch (period) {
    case "AM":
      return "Morning"
    case "afternoon":
      return "Afternoon"
    case "evening":
      return "Evening"
    default:
      "Unknown"
  }
}

export default function Complete({
  route: {
    params: { delivery, product },
  },
}: {
  route: { params: { delivery: Delivery; product: Product } }
}) {
  const { container, header, textBold, center, button, text } = styles
  const navigation = useNavigation<ProductNavigationProps>()

  const goHome = useCallback((product: Product) => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Home" }],
    })
  }, [])

  return (
    <View style={container}>
      <Text style={[header, text]}>Your item Shipped!</Text>
      <Text style={text}>
        Your <Text style={textBold}>{product.name}</Text> will be with you on{" "}
        <Text style={textBold}>{delivery.date} </Text>
        {delivery.period ? (
          <>
            in the <Text>{deliveryPeriodToFriendlyName(delivery.period)}</Text>
          </>
        ) : null}
      </Text>
      <View style={center}>
        <Pressable style={button} onPress={() => goHome(product)}>
          <Text>Order Another</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#e1e1e1",
    margin: 20,
    borderRadius: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  text: {
    textAlign: "center",
  },
  textBold: {
    fontWeight: "bold",
  },
  center: {
    alignItems: "center",
  },
  button: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },
})
