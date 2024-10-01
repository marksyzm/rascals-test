import React from "react"
import { render, fireEvent } from "@testing-library/react-native"
import Complete from "./Complete"
import { useNavigation } from "@react-navigation/native"

jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
}))

describe("Complete Screen", () => {
  const mockNavigation = {
    reset: jest.fn(),
  }

  const mockDelivery = {
    date: "2023-10-01",
    period: "AM",
  }

  const mockProduct = {
    name: "Test Product",
  }

  beforeEach(() => {
    ;(useNavigation as jest.Mock).mockReturnValue(mockNavigation)
    mockNavigation.reset.mockClear()
  })

  it("renders the delivery and product information correctly", () => {
    const { getByText } = render(
      <Complete
        route={{
          params: {
            delivery: mockDelivery as any,
            product: mockProduct as any,
          },
        }}
      />
    )

    expect(getByText("Your item Shipped!")).toBeTruthy()

    expect(getByText("Test Product")).toBeTruthy()
    expect(getByText("2023-10-01")).toBeTruthy()

    expect(getByText("Morning")).toBeTruthy()
  })

  it("does not display period if it is missing", () => {
    const { queryByText } = render(
      <Complete
        route={{
          params: {
            delivery: { date: "2023-10-01", period: "" } as any,
            product: mockProduct as any,
          },
        }}
      />
    )

    expect(queryByText("Morning")).toBeNull()
    expect(queryByText("Afternoon")).toBeNull()
    expect(queryByText("Evening")).toBeNull()
  })

  it("navigates to the Home screen when the button is pressed", () => {
    const { getByText } = render(
      <Complete
        route={{
          params: {
            delivery: mockDelivery as any,
            product: mockProduct as any,
          },
        }}
      />
    )

    const button = getByText("Order Another")
    fireEvent.press(button)

    expect(mockNavigation.reset).toHaveBeenCalledWith({
      index: 0,
      routes: [{ name: "Home" }],
    })
  })
})
