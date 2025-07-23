import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../context/AuthContext";
import useUser from "../hooks/useUser";

export default function Index() {
  const router = useRouter();
  const { user, isLoggedIn, authLoading } = useAuth();
  const { fetchUserData } = useUser();

  const fetchUser = async () => {
    const savedUID = await AsyncStorage.getItem("userUID");
    await fetchUserData(savedUID);
  };

  useEffect(() => {
    fetchUser();
    if (user) router.replace("/home");
  }, [user]);

  if (authLoading) {
  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-[#FFE5E5]">
      <ActivityIndicator size="large" color="#071952" />
    </SafeAreaView>
  );
}

  return user ? null : (
    <SafeAreaView className={`bg-[#FFE5E5]`}>
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="m-2 flex-1 justify-center items-center">
          {/* <Image source={logo} style={{ height: 300, width: 300 }} /> */}
          <View className="w-3/4">
            <TouchableOpacity
              onPress={() => router.push("/sign-in")}
              className="p-2 my-2 bg-[#071952] text-black rounded-lg"
            >
              <Text className="text-lg font-semibold text-center text-[#E0AED0]">
                Sign In
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push("/sign-up")}
              className="p-2 my-2 bg-[#071952] text-black rounded-lg"
            >
              <Text className="text-lg font-semibold text-center text-[#E0AED0]">
                Sign Up
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push("/home")}
              className="p-2 my-2 bg-[#071952] text-black rounded-lg"
            >
              <Text className="text-lg font-semibold text-center text-[#E0AED0]">
                Home
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <StatusBar barStyle={"light-content"} backgroundColor={"#071952"} />
      </ScrollView>
    </SafeAreaView>
  );
}
