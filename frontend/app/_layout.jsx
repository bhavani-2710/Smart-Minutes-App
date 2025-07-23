import { Stack } from "expo-router";
import ToastManager from "toastify-react-native";
import { toastConfig } from "../components/CustomToast";
import SafeScreen from "../components/SafeScreen";
import { AuthProvider } from "../context/AuthContext";
import "../global.css";

export default function RootLayout() {
  return (
    <AuthProvider>
      <SafeScreen>
        <Stack screenOptions={{ headerShown: false, statusBarStyle: "light" }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(tabs)" />
        </Stack>
        <ToastManager config={toastConfig} position="bottom" />
      </SafeScreen>
    </AuthProvider>
  );
}
