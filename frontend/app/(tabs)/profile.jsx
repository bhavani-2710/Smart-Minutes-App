import {
  ActivityIndicator,
  Alert,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import CustomHeader from "../../components/CustomHeader";
import { useAuth } from "../../context/AuthContext";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Toast } from "toastify-react-native";

const Profile = () => {
  const {
    user,
    logout,
    changeName,
    authLoading,
    changePassword,
    deleteAccount,
  } = useAuth();
  const [openProfileModal, setOpenProfileModal] = useState(false);
  const [name, setName] = useState(null);

  const handleNameChange = async () => {
    setName(name.trim());
    if (name === "" || name === null) {
      Alert.alert("Error", "Enter a valid Name!");
      return;
    } else if (name === user.displayName) return;
    await changeName(name);
    setOpenProfileModal(false);
    Toast.show({
      type: "custom",
      text1: "Success",
      text2: "Name changed succesfilly!",
      icon: "checkmark-sharp",
      iconColor: "green",
    });
  };

  const handleChangePassword = async () => {
    await changePassword();
    setOpenProfileModal(false);
    Alert.alert(
      "Password Reset",
      "A Link has been sent to your registered email for resetting password!"
    );
  };

  const handleProfileEdit = () => {
    setOpenProfileModal(true);
  };

  const handleDeleteAccount = async () => {
    const result = await deleteAccount();
    if (result.isDeleted) {
      Toast.show({
        type: "custom",
        text1: "Deleted",
        text2: "Account Deleted Successfully!",
        icon: "checkmark-sharp",
        iconColor: "red",
      });
    } else {
      Toast.show({
        type: "custom",
        text1: "Error Deleting Account",
        text2: result.message,
        icon: "warning",
        iconColor: "orange",
      });
    }
  };

  const handleDeleteAccountConfirmation = async () => {
    Alert.alert(
      "Permanently Delete Your Account",
      "Are you sure you want to delete your account?",
      [
        { text: "No", style: "cancel", isPreferred: false },
        {
          text: "Yes",
          style: "default",
          isPreferred: true,
          onPress: handleDeleteAccount,
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  useEffect(() => {
    setName(user.displayName ? user.displayName : user.name);
  }, []);

  {
    return authLoading && user.uid ? (
      <View className="flex-1 items-center justify-center bg-[#FFE5E5]">
        <ActivityIndicator size={"large"} color="#071952" />
      </View>
    ) : (
      <SafeAreaView>
        {/* HEADER */}
        <CustomHeader title="Profile" />

        <View
          style={{
            height: "100%",
            backgroundColor: "#FFE5E5",
          }}
          className="flex gap-2"
        >
          {/* USER DETAILS */}
          <View className="m-5 mb-1 p-5 flex flex-row items-center justify-around gap-2">
            {user.photoURL ? (
              <Image
                source={{ uri: user.photoURL }}
                style={{ height: 50, width: 50 }}
                className="m-3 p-3 border border-white bg-[#756AB6] rounded-full"
              />
            ) : (
              <Ionicons
                className="m-3 p-3 border border-white bg-[#756AB6] rounded-full"
                name="person"
                size={32}
                color="white"
              />
            )}

            <View>
              <Text className="text-xl font-medium max-w-52 text-wrap">
                {user.displayName || user.name}
              </Text>
              <Text className="text-base font-normal max-w-60 text-wrap">
                {user.email}
              </Text>
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
              <AntDesign
                className="ml-auto"
                name="right"
                size={24}
                color="black"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={logout}
              className="-mt-2 m-2 p-3 flex flex-row gap-4 items-center"
            >
              <FontAwesome name="sign-out" size={28} color="#C41E3A" />
              <Text className="text-[#C41E3A]">Sign Out</Text>
            </TouchableOpacity>
          </View>

          {/* OTHER OPTIONS */}
          <Text className="m-5 mb-0 text-[#071952] text-lg font-bold">
            OTHER
          </Text>
          <View
            contentContainerStyle={{ display: "flex" }}
            className="bg-white m-5 mt-0 rounded-lg border border-[#071952]"
          >
            <TouchableOpacity className="m-2 p-3 flex flex-row gap-4 items-center border-b border-[#7a04c9]">
              <AntDesign name="infocirlceo" size={24} color="black" />
              <Text className="text-base">Version</Text>
              <Text className="ml-auto text-gray-500">v1.0.0</Text>
            </TouchableOpacity>
            <TouchableOpacity className="-mt-2 m-2 p-3 flex flex-row gap-4 items-center border-b border-[#7a04c9]">
              <Ionicons name="globe-outline" size={24} color="black" />
              <Text className="text-base">Language</Text>
              <Text className="ml-auto text-gray-500">English</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleDeleteAccountConfirmation}
              className="-mt-2 m-2 p-3 flex flex-row gap-4 items-center"
            >
              <FontAwesome name="remove" size={28} color="#C41E3A" />
              <Text className="text-[#C41E3A]">Delete Account</Text>
            </TouchableOpacity>
          </View>

          <Modal
            visible={openProfileModal}
            animationType="fade"
            transparent={true}
            onRequestClose={() => setOpenProfileModal(false)}
            backdropColor={"#FFE5E5"}
          >
            <View className="flex-1 items-center justify-center bg-black/50">
              <View className="h-8/12 w-11/12 bg-[#FFE5E5] p-4 rounded-lg border-2 border-red-200">
                <View className="flex flex-row items-center gap-4 border-b-2 p-2">
                  <AntDesign name="edit" size={24} color="#756AB6" />
                  <Text className="text-xl text-[#756AB6] font-bold">
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

                {/* MAIN CONTENT */}
                <View className="mt-2">
                  <View className="flex flex-row gap-2 items-center">
                    <Text className="m-2 p-2 text-base font-medium">
                      Name :
                    </Text>
                    <TextInput
                      value={name}
                      onChangeText={(e) => setName(e)}
                      className="m-2 px-2 text-base text-black bg-white min-w-52 w-auto h-auto rounded-md text-wrap max-w-64"
                    />
                  </View>
                  <View className="flex flex-row gap-2 items-center">
                    <Text className="m-2 p-2 text-base font-medium">
                      Email :
                    </Text>
                    <Text className="m-2 px-2 text-base text-black min-w-52 w-auto h-auto rounded-md text-wrap max-w-64">
                      {user.email}
                    </Text>
                  </View>
                  <View className="flex flex-row gap-2 items-center">
                    <Text className="m-2 p-2 text-base font-medium">
                      Password :
                    </Text>
                    <TouchableOpacity
                      onPress={handleChangePassword}
                      className="m-2 p-2 text-base w-auto h-auto bg-blue-500 rounded-md"
                    >
                      <Text className="text-white">Change Password</Text>
                    </TouchableOpacity>
                  </View>
                  <View className="flex flex-row gap-2 items-center">
                    <Text className="m-2 p-2 text-base font-medium">
                      Created At :
                    </Text>
                    <Text className="my-2 text-base text-black align-middle min-w-52 w-auto h-12 rounded-md right-3">
                      {user.metadata?.creationTime ||
                        user.createdAt?.toDate().toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={handleNameChange}
                    className="m-auto p-3 bg-green-400 rounded-lg"
                  >
                    <Text>Save Changes</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </SafeAreaView>
    );
  }
};

export default Profile;
