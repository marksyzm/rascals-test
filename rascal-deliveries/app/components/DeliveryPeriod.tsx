import { format } from "date-fns"
import { Pressable, StyleSheet, Text, View } from "react-native"
import { Delivery, Period, Size } from "../types"

const periods: Period[] = ["AM", "PM", "EVE"]

export default function DeliveryPeriod({
  date,
  onPress,
  deliveriesIndex,
  productType,
}: {
  date: Date
  onPress: (period: Period, date: string) => void
  deliveriesIndex: Record<string, Delivery>
  productType?: Size
}) {
  const { title, button, buttonFull, buttonUnavailable } = deliveryStyles
  return (
    <View>
      <Text style={title}>{format(date, "eee")}</Text>
      <Text style={title}>{format(date, "dd/MM/yy")}</Text>
      {periods.map((period) => {
        const styles: (
          | typeof button
          | typeof buttonFull
          | typeof buttonUnavailable
        )[] = [button]

        let disabled = false

        if (deliveriesIndex[`${format(date, "yyyy-MM-dd")}-${period}`]) {
          styles.push(buttonFull)
          disabled = true
        }

        if (productType === "large" && date.getDay() === 3) {
          styles.push(buttonUnavailable)
          disabled = true
        }

        return (
          <Pressable
            key={period}
            style={styles}
            disabled={disabled}
            onPress={() => onPress(period, format(date, "yyyy-MM-dd"))}
          >
            <Text>{period}</Text>
          </Pressable>
        )
      })}
    </View>
  )
}

const deliveryStyles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#aaffaa",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonFull: {
    backgroundColor: "#ffaaaa",
  },
  buttonUnavailable: {
    backgroundColor: "#f1f1f1",
  },
})
