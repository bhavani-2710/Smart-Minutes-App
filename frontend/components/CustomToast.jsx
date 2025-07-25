import Ionicons from '@expo/vector-icons/Ionicons';
import { Text, View } from "react-native";

// Tailwind-based Custom Toast
const CustomToast = ({ text1, text2, hide, icon, iconColor }) => {
  return (
    <View className="w-[90%] bg-white rounded-xl px-4 py-3 flex-row items-center shadow-md border border-black/5">
      <Ionicons className={`p-2 bg-gray-100 m-1 border ${iconColor === "red" ? "border-red-900/20" : "border-green-900/50"} rounded-full`} name={icon} size={20} color={iconColor} />
      
      <View className="flex-1 ml-3">
        <Text className="text-[#071952] font-bold text-lg">{text1}</Text>
        {text2 && <Text className="text-[#071952] text-base">{text2}</Text>}
      </View>
      
      <Ionicons name="close-sharp" size={20} color="black" onPress={hide} />
    </View>
  );
};

// Config for toastify-react-native
export const toastConfig = {
  custom: (props) => <CustomToast {...props} />,
};

export default CustomToast;
