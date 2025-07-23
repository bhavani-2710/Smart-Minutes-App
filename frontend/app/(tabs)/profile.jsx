import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import CustomHeader from "../../components/CustomHeader";
import { useAuth } from "../../context/AuthContext";

const Profile = () => {
  const { user, logout } = useAuth();
  return (
    <SafeAreaView>
      {/* HEADER */}
      <CustomHeader title="Profile" />

      <View
        style={{ height: "90%" }}
        className="flex items-center justify-center"
      >
        <TouchableOpacity
          onPress={logout}
          className="bg-blue-500 p-3 w-32 rounded-lg"
        >
          <Text className="text-center text-white">Log out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
