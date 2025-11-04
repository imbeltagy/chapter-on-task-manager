import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { Surface } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Surface style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content" />
        <Stack screenOptions={{ headerShown: false }} />
      </Surface>
    </SafeAreaProvider>
  );
}
