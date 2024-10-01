import React from "react"
import { render, fireEvent, waitFor } from "@testing-library/react-native"
import Home from "./Home"
import { useAppSelector } from "../hooks/useAppSelector"
import { useAppDispatch } from "../hooks/useAppDispatch"
import { useCreateUserMutation, useLazyGetUserQuery } from "../api/users"
import { useGetProductsQuery } from "../api/products"
import { useNavigation } from "@react-navigation/native"
import { setId } from "../slices/account"

jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
}))

jest.mock("../hooks/useAppSelector", () => ({
  useAppSelector: jest.fn(),
}))

jest.mock("../hooks/useAppDispatch", () => ({
  useAppDispatch: jest.fn(),
}))

jest.mock("../api/users", () => ({
  useCreateUserMutation: jest.fn(),
  useLazyGetUserQuery: jest.fn(),
}))

jest.mock("../api/products", () => ({
  useGetProductsQuery: jest.fn(),
}))

jest.mock("../slices/account", () => ({
  setId: jest.fn(),
}))

describe("Home Screen", () => {
  const mockNavigation = { navigate: jest.fn() }
  const mockDispatch = jest.fn()
  const mockCreateUserMutation = jest.fn(() => [
    jest.fn(() => ({ data: { id: "123" } })),
  ])
  const mockGetUser = jest.fn()

  const mockProducts = [
    { id: "1", name: "Product 1" },
    { id: "2", name: "Product 2" },
  ]

  beforeEach(() => {
    ;(useNavigation as jest.Mock).mockReturnValue(mockNavigation)
    ;(useAppSelector as jest.Mock).mockReturnValue({ id: null })
    ;(useAppDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch)
    ;(useCreateUserMutation as jest.Mock).mockReturnValue([
      mockCreateUserMutation,
    ])
    ;(useLazyGetUserQuery as jest.Mock).mockReturnValue([mockGetUser])
    ;(useGetProductsQuery as jest.Mock).mockReturnValue({
      data: mockProducts,
      error: null,
      status: "fulfilled",
    })
    mockCreateUserMutation.mockClear()
    mockDispatch.mockClear()
    mockNavigation.navigate.mockClear()
  })

  it("renders welcome message and products", () => {
    const { getByText } = render(<Home />)

    expect(getByText("Welcome to Rascal Deliveries!")).toBeTruthy()
    expect(getByText("Please choose a product below.")).toBeTruthy()
    expect(getByText("Product 1")).toBeTruthy()
    expect(getByText("Product 2")).toBeTruthy()
  })

  it.skip("creates a new user if no user ID exists", async () => {})

  it.skip("fetches user if ID exists", async () => {})

  it.skip("navigates to the Delivery screen when a product is pressed", () => {})
})
