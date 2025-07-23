import Ionicons from '@expo/vector-icons/Ionicons';
import { Text, View } from "react-native";

// Tailwind-based Custom Toast
const CustomToast = ({ text1, text2, hide }) => {
  return (
    <View className="w-[90%] bg-[#E0AED0] rounded-xl px-4 py-3 flex-row items-center shadow-md">
      <Ionicons name="checkmark-circle" size={24} color="green" />
      
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
