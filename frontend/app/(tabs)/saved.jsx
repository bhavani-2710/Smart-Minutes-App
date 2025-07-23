import { useRouter } from "expo-router";
import { FlatList, SafeAreaView, Text, View } from "react-native";
import { Toast } from "toastify-react-native";
import CustomHeader from "../../components/CustomHeader";
import RecordingDisplay from "../../components/RecordingDisplay";
import { useAuth } from "../../context/AuthContext";
import useUser from "../../hooks/useUser";

export default function SavedScreen() {
  const { fetchUserData, loadingRecordings, recordings, deleteRecording } =
    useUser();
  const { user } = useAuth();
  const router = useRouter();

  const handleDelete = async (id) => {
    try {
      if (!id) return;

      await deleteRecording(id);
      Toast.show({
        type: "custom",
        text1: "Deleted",
        text2: "Recording deleted successfully!",
        iconColor: "red",
      });
      router.reload();
    } catch (error) {
      Alert.alert("Error", "Error deleting the recording!");
    }
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: "#FFE5E5" }}>
      {/* HEADER */}
      <CustomHeader title="Saved Recordings" />

      {user.uid && recordings.length > 0 ? (
        <FlatList
          refreshing={loadingRecordings}
          onRefresh={() => fetchUserData(user.uid)}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            paddingBottom: 100,
            paddingTop: 10,
            paddingLeft: 5,
            paddingRight: 5,
            display: "flex",
            justifyContent: "center",
            gap: 2,
          }}
          data={recordings}
          renderItem={({ item }) => (
            <RecordingDisplay recording={item} onDelete={handleDelete} />
          )}
        />
      ) : (
        <View className="flex-1 items-center justify-center -mt-16">
          <Text className="text-lg text-[#071952] font-semibold">No recordings to display!</Text>
        </View>
      )}
    </SafeAreaView>
  );
}
