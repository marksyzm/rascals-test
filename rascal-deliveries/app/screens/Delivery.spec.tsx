import React from "react"
import { render, fireEvent, waitFor } from "@testing-library/react-native"
import Delivery from "./Delivery"
import { useNavigation } from "@react-navigation/native"
import {
  useCreateDeliveryMutation,
  useGetDeliveriesQuery,
} from "../api/deliveries"
import { useAppSelector } from "../hooks/useAppSelector"
import { Dimensions } from "react-native"

jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
}))

jest.mock("../api/deliveries", () => ({
  useCreateDeliveryMutation: jest.fn(),
  useGetDeliveriesQuery: jest.fn(),
}))

jest.mock("../hooks/useAppSelector", () => ({
  useAppSelector: jest.fn(),
}))

jest.spyOn(Dimensions, "get").mockReturnValue({ width: 400 } as any)

describe("Delivery Screen", () => {
  const mockNavigation = { navigate: jest.fn() }
  const mockCreateDelivery = jest.fn(async (data) => ({ data }))
  const mockUserId = "123"
  const mockProduct = {
    id: "1",
    name: "Test Product",
    type: "small",
  }

  beforeEach(() => {
    ;(useNavigation as jest.Mock).mockReturnValue(mockNavigation)
    ;(useCreateDeliveryMutation as jest.Mock).mockReturnValue([
      mockCreateDelivery,
    ])
    ;(useGetDeliveriesQuery as jest.Mock).mockReturnValue({
      data: [
        { date: "2023-10-01", period: "AM" },
        { date: "2023-10-02", period: "PM" },
      ],
    })
    ;(useAppSelector as jest.Mock).mockReturnValue(mockUserId)
    mockCreateDelivery.mockClear()
    mockNavigation.navigate.mockClear()
  })

  it("renders delivery periods for each week and handles selection", async () => {
    const { getAllByText } = render(
      <Delivery route={{ params: { product: mockProduct as any } }} />
    )

    const deliveryPeriods = getAllByText("AM")
    expect(deliveryPeriods.length).toBeGreaterThan(0)

    fireEvent.press(deliveryPeriods[0])

    await waitFor(() => {
      expect(mockCreateDelivery).toHaveBeenCalledWith({
        date: "2024-09-30",
        period: "AM",
        productId: "1",
        userId: "123",
      })

      expect(mockNavigation.navigate).toHaveBeenCalledWith("Complete", {
        product: mockProduct,
        delivery: expect.any(Object),
      })
    })
  })

  it("correctly builds the deliveries index", () => {
    const { getAllByText } = render(
      <Delivery route={{ params: { product: mockProduct as any } }} />
    )

    expect(getAllByText("AM").length).toBe(24)
    expect(getAllByText("PM").length).toBe(24)
    expect(getAllByText("EVE").length).toBe(24)
  })
})
