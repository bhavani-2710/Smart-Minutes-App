import {
  Modal,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CustomHeader from "../../components/CustomHeader";
import { useAuth } from "../../context/AuthContext";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { useState } from "react";

const Profile = () => {
  const { user, logout } = useAuth();
  const [openProfileModal, setOpenProfileModal] = useState(false);

  const handleProfileEdit = () => {
    setOpenProfileModal(true);
  };

  return (
    <SafeAreaView>
      {/* HEADER */}
      <CustomHeader title="Profile" />

      <View
        style={{
          height: "90%",
          backgroundColor: "#FFE5E5",
        }}
        className="flex gap-2"
      >
        {/* USER DETAILS */}
        <View className="m-5 mb-1 p-5 flex flex-row items-center justify-around gap-2">
          <Ionicons
            className="m-3 p-3 border border-white bg-[#756AB6] rounded-full"
            name="person"
            size={32}
            color="white"
          />
          <View>
            <Text className="text-xl font-medium">{user.name} Murali</Text>
            <Text className="text-base font-normal">{user.email}</Text>
          </View>
        </View>

        {/* BORDER LINE*/}
        <View className="flex items-center">
          <View className="w-11/12 -mt-5 border-b-2 border-[#071952]" />
        </View>

        {/* OPTIONS */}
        <View
          contentContainerStyle={{ display: "flex" }}
          className="bg-white m-5 rounded-lg border border-[#071952]"
        >
          <TouchableOpacity
            onPress={handleProfileEdit}
            className="m-2 p-3 flex flex-row gap-4 items-center border-b border-[#7a04c9]"
          >
            <AntDesign name="edit" size={28} color="black" />
            <Text className="text-base">Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={logout}
            className="-mt-2 m-2 p-3 flex flex-row gap-4 items-center"
          >
            <FontAwesome name="sign-out" size={28} color="#C41E3A" />
            <Text className="text-[#C41E3A]">Sign Out</Text>
          </TouchableOpacity>
        </View>

        <Modal
          visible={openProfileModal}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setOpenProfileModal(false)}
          backdropColor={"#FFE5E5"}
        >
          <View className="flex-1 items-center justify-end bg-black/50">
            <View className="h-4/5 w-screen bg-[#FFE5E5] border-2 border-[#071952] rounded-t-3xl p-4">
              <View className="flex flex-row items-center gap-4">
                <AntDesign name="edit" size={24} color="#756AB6" />
                <Text className="text-xl text-[#071952] font-bold">
                  Edit Profile
                </Text>
                <Ionicons
                  onPress={() => setOpenProfileModal(false)}
                  className="ml-auto p-1 bg-gray-300 rounded-full border"
                  name="close"
                  size={18}
                  color="#C41E3A"
                />
              </View>

              {/* BORDER LINE*/}
              <View className="flex items-center">
                <View className="w-screen mt-4 border-b-2 border-[#071952]" />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
