export type Period = "AM" | "PM" | "EVE"
export type Size = "small" | "medium" | "large"

export interface Delivery {
  id: string // guid
  productId: string // guid
  userId: string // guid
  date: string // date
  period: Period
}

export interface Product {
  id: string // guid
  name: string
  type: Size
}

export interface User {
  id: string // guid
}

export type RootStackParamList = {
  Home: undefined
  Delivery: { product: Product }
  Complete: { product: Product; delivery: Delivery }
}
