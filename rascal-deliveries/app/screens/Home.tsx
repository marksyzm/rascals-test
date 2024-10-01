import { Platform, Pressable, StyleSheet, Text, View } from "react-native"
import { useAppSelector } from "../hooks/useAppSelector"
import { useCallback, useEffect } from "react"
import { useCreateUserMutation, useLazyGetUserQuery } from "../api/users"
import { setId } from "../slices/account"
import { useAppDispatch } from "../hooks/useAppDispatch"
import { useGetProductsQuery } from "../api/products"
import { Product, RootStackParamList } from "../types"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"

type ProductNavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  "Delivery"
>

export default function Home() {
  const { container, header, button } = styles
  const { id } = useAppSelector((state) => state.account)
  const dispatch = useAppDispatch()

  const { data: products, error, status, endpointName } = useGetProductsQuery()
  const [createUserMutation] = useCreateUserMutation()
  const [getUser] = useLazyGetUserQuery()
  const navigation = useNavigation<ProductNavigationProps>()

  console.log("Products", Platform.OS, products)

  const createUser = useCallback(async () => {
    const response = await createUserMutation()
    if (response.data) {
      dispatch(setId(response.data.id))
      console.log("User created", Platform.OS, response.data)
    }
  }, [dispatch, createUserMutation])

  console.log(error, status, endpointName)

  useEffect(() => {
    if (!id) {
      createUser()
    } else {
      console.log("User exists", Platform.OS, id)
      getUser({ id }).catch(() => createUser())
    }
  }, [id, createUserMutation, dispatch])

  const handleProductPress = useCallback((product: Product) => {
    console.log("Product pressed", product)

    navigation.navigate("Delivery", { product })
  }, [])

  return (
    <View style={container}>
      <Text style={header}>Welcome to Rascal Deliveries!</Text>
      <Text>Please choose a product below.</Text>
      {products?.map((product) => (
        <Pressable
          style={button}
          key={product.id}
          onPress={() => handleProductPress(product)}
        >
          <Text>{product.name}</Text>
        </Pressable>
      ))}
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
  button: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
})
