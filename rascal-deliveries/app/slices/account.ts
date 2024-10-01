import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { persistReducer } from "redux-persist"

export type UserState = {
  id: string
}

const slice = createSlice({
  name: "account",
  initialState: {
    id: "",
  },
  reducers: {
    setId: (state, { payload: id }: PayloadAction<string>) => {
      state.id = id
    },
  },
})

export const { setId } = slice.actions

export default slice
