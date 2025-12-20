// app/_layout.tsx
import { Tabs } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../global.css";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Tabs
        screenOptions={{
          tabBarStyle: {
            position: 'absolute',
          },
        }}
      />
    </SafeAreaProvider>
  );
}
