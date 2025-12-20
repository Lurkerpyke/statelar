import { Link } from "expo-router";
import { Text } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-blue-500">
      <Link href="/explore">
        <Text className="text-white text-lg">Go to Explore</Text>
      </Link>
      <Link href="/profile">
        <Text className="text-white text-lg">Go to Profile</Text>
      </Link>
      <Link href="/sign-in">
        <Text className="text-white text-lg">Go to Sign In</Text>
      </Link>
      <Link href="/properties/1">
        <Text className="text-white text-lg">Go to Properties</Text>
      </Link>
    </SafeAreaView>
  );
}
