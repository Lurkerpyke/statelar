import { Text } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      <Text className="font-rubik-bold text-2xl mb-4">Welcome to Statelar!</Text>
    </SafeAreaView>
  );
};
