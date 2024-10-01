import { StatusBar } from "expo-status-bar"
import AppComponent from "./app/index"
import { Provider as StoreProvider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { store, persistor } from "./app/store"
import { NavigationContainer } from "@react-navigation/native"

export default function App() {
  return (
    <StoreProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <StatusBar style="auto" />
          <AppComponent />
        </NavigationContainer>
      </PersistGate>
    </StoreProvider>
  )
}
