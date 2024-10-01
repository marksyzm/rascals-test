import React from "react"
import { render, fireEvent } from "@testing-library/react-native"
import "@testing-library/react-native/extend-expect"
import DeliveryPeriod from "./DeliveryPeriod"
import { format } from "date-fns"

jest.mock("date-fns", () => ({
  format: jest.fn(),
}))

describe("DeliveryPeriod Component", () => {
  const mockOnPress = jest.fn()
  const mockDate = new Date(2023, 9, 1)
  const mockDeliveriesIndex = {
    "2023-10-01-AM": { isDelivered: true },
  }

  beforeEach(() => {
    mockOnPress.mockClear()
    ;(format as jest.Mock).mockImplementation((date, formatString) => {
      if (formatString === "eee") return "Sun"
      if (formatString === "dd/MM/yy") return "01/10/23"
      if (formatString === "yyyy-MM-dd") return "2023-10-01"
      return ""
    })
  })

  it("renders correctly with default values", () => {
    const { getByText } = render(
      <DeliveryPeriod
        date={mockDate}
        onPress={mockOnPress}
        deliveriesIndex={{}}
        productType="small"
      />
    )

    expect(getByText("Sun")).toBeTruthy()
    expect(getByText("01/10/23")).toBeTruthy()

    expect(getByText("AM")).toBeTruthy()
    expect(getByText("PM")).toBeTruthy()
    expect(getByText("EVE")).toBeTruthy()
  })

  it("disables a period if it exists in deliveriesIndex", () => {
    const { getByText } = render(
      <DeliveryPeriod
        date={mockDate}
        onPress={mockOnPress}
        deliveriesIndex={mockDeliveriesIndex as any}
        productType="small"
      />
    )

    const amButton = getByText("AM")
    const pmButton = getByText("PM")
    const eveButton = getByText("EVE")

    expect(amButton).toBeDisabled()
    expect(pmButton).not.toBeDisabled()
    expect(eveButton).not.toBeDisabled()
  })

  it("disables all periods on Wednesdays for large products", () => {
    const wednesdayDate = new Date(2023, 9, 4)
    ;(format as jest.Mock).mockImplementation((date, formatString) => {
      if (formatString === "eee") return "Wed"
      if (formatString === "dd/MM/yy") return "04/10/23"
      if (formatString === "yyyy-MM-dd") return "2023-10-04"
      return ""
    })

    const { getByText } = render(
      <DeliveryPeriod
        date={wednesdayDate}
        onPress={mockOnPress}
        deliveriesIndex={{}}
        productType="large"
      />
    )

    const amButton = getByText("AM")
    const pmButton = getByText("PM")
    const eveButton = getByText("EVE")

    expect(amButton).toBeDisabled()
    expect(pmButton).toBeDisabled()
    expect(eveButton).toBeDisabled()
  })

  it("calls onPress with correct parameters when a period is pressed", () => {
    const { getByText } = render(
      <DeliveryPeriod
        date={mockDate}
        onPress={mockOnPress}
        deliveriesIndex={{}}
        productType="small"
      />
    )

    const pmButton = getByText("PM")
    fireEvent.press(pmButton)

    expect(mockOnPress).toHaveBeenCalledWith("PM", "2023-10-01")
  })
})
