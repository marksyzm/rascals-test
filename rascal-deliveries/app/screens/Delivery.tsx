import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native"
import {
  Delivery as DeliveryType,
  Period,
  Product,
  RootStackParamList,
} from "../types"
import {
  useCreateDeliveryMutation,
  useGetDeliveriesQuery,
} from "../api/deliveries"
import { useCallback, useMemo } from "react"
import DeliveryPeriod from "../components/DeliveryPeriod"
import { useAppSelector } from "../hooks/useAppSelector"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { useNavigation } from "@react-navigation/native"

const MAX_WEEKS = 4

type ProductNavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  "Delivery"
>

export default function Delivery({
  route: {
    params: { product },
  },
}: {
  route: { params: { product: Product } }
}) {
  const { data: deliveries } = useGetDeliveriesQuery()
  const [createDelivery] = useCreateDeliveryMutation()

  const navigation = useNavigation<ProductNavigationProps>()

  const userId = useAppSelector((state) => state.account.id)

  const { container, textSelected, column } = styles

  const now = useMemo(() => new Date(), [])
  const splitWeeks = useMemo(() => {
    const today = new Date(now)
    return Array.from(Array(MAX_WEEKS * 2)).map(() => {
      if (today.getDay() === 0) {
        today.setDate(today.getDate() + 1)
      }

      if (today.getDay() > 1 && today.getDay() < 4) {
        today.setDate(today.getDate() - today.getDay() + 1)
      }

      if (today.getDay() >= 4) {
        today.setDate(today.getDate() - today.getDay() + 4)
      }

      const thisDate = new Date(today)

      today.setDate(today.getDate() + 3)

      return thisDate
    })
  }, [now])

  const handlePressDeliveryPeriod = useCallback(
    async (period: Period, date: string) => {
      console.log("Period pressed", period, date)
      const response = await createDelivery({
        date,
        period,
        productId: product.id,
        userId: userId,
      })
      console.log("Delivery created", response.data)
      navigation.navigate("Complete", { product, delivery: response.data! })
    },
    [createDelivery, product, userId]
  )

  const deliveriesIndex: Record<string, DeliveryType> = useMemo(
    () =>
      deliveries?.reduce<Record<string, DeliveryType>>((acc, delivery) => {
        acc[`${delivery.date}-${delivery.period}`] = delivery
        return acc
      }, {}) || {},
    [deliveries, product]
  )
  console.log("deliveriesIndex", deliveriesIndex)
  const { width } = Dimensions.get("window")

  return (
    <>
      <View style={container}>
        <Text>
          You selected: <Text style={textSelected}>{product?.name}</Text>
        </Text>
      </View>
      <ScrollView
        pagingEnabled={true}
        horizontal={true}
        decelerationRate={0}
        showsHorizontalScrollIndicator={false}
      >
        {splitWeeks.map((splitWeek, index) => (
          <View style={[container, column, { width: width - 40 }]} key={index}>
            {Array.from(Array(3)).map((_day, index) => {
              const date = new Date(splitWeek)
              if (index > 0) {
                date.setDate(date.getDate() + index)
              }
              return (
                <DeliveryPeriod
                  key={index}
                  date={date}
                  onPress={handlePressDeliveryPeriod}
                  deliveriesIndex={deliveriesIndex}
                  productType={product?.type}
                />
              )
            })}
          </View>
        ))}
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    margin: 20,
    borderRadius: 10,
  },
  noPadding: {
    padding: 0,
  },
  textSelected: {
    fontWeight: "bold",
  },
  column: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
})
