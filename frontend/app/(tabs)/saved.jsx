import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Text,
  View,
} from "react-native";
import { Toast } from "toastify-react-native";
import CustomHeader from "../../components/CustomHeader";
import RecordingDisplay from "../../components/RecordingDisplay";
import { useAuth } from "../../context/AuthContext";
import useUser from "../../hooks/useUser";
import { useEffect } from "react";

export default function SavedScreen() {
  const { fetchUserData, loadingRecordings, recordings, deleteRecording } =
    useUser();
  const { user, authLoading } = useAuth();
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
        icon: "trash",
      });
      router.reload();
    } catch (error) {
      Alert.alert("Error", "Error deleting the recording!");
    }
  };

  useEffect(() => {
    console.log("fetch user data");
    fetchUserData();
  }, []);

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: "#FFE5E5" }}>
      {/* HEADER */}
      <CustomHeader title="Saved Recordings" />

      {!authLoading ? (
        user.uid && recordings.length > 0 ? (
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
          <View
            className="flex-1 items-center justify-center"
            style={{ height: "90%" }}
          >
            <Text className="text-lg text-[#071952] font-semibold">
              No recordings to display!
            </Text>
          </View>
        )
      ) : (
          <View className="flex-1 items-center justify-center" style={{height: "90%"}}>
            <ActivityIndicator color="#071952" size={"large"} />
          </View>
      )}
    </SafeAreaView>
  );
}
