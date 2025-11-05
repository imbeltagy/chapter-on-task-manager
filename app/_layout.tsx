import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
          <Stack screenOptions={{ headerShown: false }} />
        </SafeAreaView>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
