import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import music_player from "../../assets/images/music_player.jpg";
import AudioPlayer from "../../components/AudioPlayer";
import { useState } from "react";
import { Toast } from "toastify-react-native";

export default function RecordingDetail() {
  const router = useRouter();
  const [mailLoading, setMailLoading] = useState(false);
  const { url, summary, recordingId } = useLocalSearchParams();

  const sendInEmail = async () => {
    try {
      setMailLoading(true);
      const response = await axios.post(
        "https://smart-minutes-server.onrender.com/send-email",
        { recordingId }
      );
      if (response.data.status === "success") {
        Toast.show({
          type: "custom",
          text1: "Mail sent successfully!",
          text2: "You will receive the email shortly.",
          iconColor: "green",
          icon: "mail-unread",
        });
        console.log(response.data.message);
      }
    } catch (error) {
      Toast.show({
        type: "custom",
        text1: "Error",
        text2: "Could not send in mail! Try again later.",
        iconColor: "red",
        icon: "mail-unread",
      });
      console.log("Error sending mail", error);
    } finally {
      setMailLoading(false);
    }
  };

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
        <Text className="text-2xl text-[#071952] font-bold">
          RECORDING DETAILS
        </Text>
        <View className="border border-[#071952] w-3/6 border-b-2 m-1 rounded-full" />
      </View>

      {/* SEND IN EMAIL */}
      <View className="mt-[10%] m-2 items-end p-3">
        <TouchableOpacity
          onPress={sendInEmail}
          className="p-3 bg-white rounded-lg flex flex-row gap-2 items-center"
        >
          <Ionicons name="mail" size={18} color="#071952" />
          <Text className="text-[#071952]">
            {mailLoading ? "Sending....." : "Send in Email"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Audio Player */}
      <View className="flex items-center justify-between">
        <View className="w-96 h-auto bg-white rounded-3xl shadow-md p-5">
          <Image
            source={music_player}
            className="w-full h-36 rounded-xl mb-4"
            resizeMode="stretch"
          />
          <AudioPlayer url={url} />
        </View>

        {/* Summary Box */}
        <View className="mt-[10%] w-96 h-auto bg-white rounded-3xl shadow-md p-5">
          <Text className="text-xl font-bold text-gray-800 mb-1">
            Meeting Summary
          </Text>
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
