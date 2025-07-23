import { Image, View } from "react-native";
import logo from "../assets/images/logo.png";

const Logo = () => {
  return (
    <View className="flex items-center w-screen">
      <Image
        source={logo}
        resizeMode="contain"
        className="w-44 absolute top-[-110px]"
      />
    </View>
  );
};

export default Logo;
