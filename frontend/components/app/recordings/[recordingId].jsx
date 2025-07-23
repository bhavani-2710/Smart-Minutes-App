import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Image, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import music_player from "../../assets/images/music_player.jpg";
import AudioPlayer from "../../components/AudioPlayer";

export default function RecordingDetail() {
  const router = useRouter();
  const { url, summary } = useLocalSearchParams();

  return (
    <SafeAreaView className="flex-1 bg-[#FFE5E5]">
      {/* Back Button */}
      <View className="flex flex-row">
        <TouchableOpacity
          onPress={() => router.back()}
          className="p-2 m-3 rounded-full border-2 border-[#E0AED0] bg-white"
        >
          <Ionicons name="chevron-back" size={25} color="#071952" />
        </TouchableOpacity>
      </View>

      {/* Heading */}
      <View className="flex items-center -mt-8">
        <Text className="text-2xl text-[#071952] font-bold">RECORDING DETAILS</Text>
        <View className="border border-[#071952] w-3/6 border-b-2 m-1 rounded-full" />
      </View>

      {/* Audio Player */}
      <View className="flex items-center justify-between">
        <View className="mt-[20%] w-96 h-auto bg-white rounded-3xl shadow-md p-5">
          <Image
            source={music_player}
            className="w-full h-36 rounded-xl mb-4"
            resizeMode="stretch"
          />
          <AudioPlayer url={url} />
        </View>

        {/* Summary Box */}
        <View className="mt-[10%] w-96 h-auto bg-white rounded-3xl shadow-md p-5">
          <Text className="text-xl font-bold text-gray-800 mb-1">Meeting Summary</Text>
          <Text className="text-sm text-gray-600">
            {summary
              ? summary.trim()
              : "Audio is being processed......\nPlease wait."}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
 