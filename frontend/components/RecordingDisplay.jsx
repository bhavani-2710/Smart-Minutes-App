import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

const RecordingDisplay = ({ recording, onDelete }) => {
  const router = useRouter();

  const formatTime = (datetime) => {
    const date = new Date(datetime).toLocaleDateString("en-GB");
    const hour = String(new Date(datetime).getHours()).padStart(2, "0");
    const minutes = String(new Date(datetime).getMinutes()).padStart(2, "0");

    return `${date} ${hour}:${minutes} hrs`;
  };
  return (
    <View className="p-2 m-1 bg-white rounded-lg flex flex-row items-center justify-between shadow-lg">
      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: `/recordings/${recording.id}`,
            params: {
              url: recording.url,
              summary: recording.summary,
              createdAt: recording.createdAt,
            },
          })
        }
        className="flex-1 flex-row gap-1 items-center"
      >
        <Ionicons
          name="play-circle"
          size={35}
          color="#071952"
          className="ml-1.5"
        />
        <View>
          <Text className="text-base font-medium">
            Recording_{recording.createdAt}
          </Text>
          <Text className="text-sm font-normal text-[#7a04c9]">
            {formatTime(recording.createdAt)}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onDelete(recording.id)}
        className="p-1.5 rounded-md bg-gray-300"
      >
        <Ionicons name="trash-sharp" size={20} color="#C41E3A" />
      </TouchableOpacity>
    </View>
  );
};

export default RecordingDisplay;
