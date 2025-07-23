import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { Image, ImageBackground, View } from "react-native";
import background_noise from "../assets/images/background_noise.jpg";
import logo from "../assets/images/logo.png";

export default function CustomDrawer(props) {
  return (
    <DrawerContentScrollView {...props}>

      {/* 🔁 Logo with background noise */}
      <ImageBackground
        source={background_noise}
        style={{
          paddingVertical: 2,
          alignItems: "center",
          justifyContent: "center",
        }}
        imageStyle={{
          resizeMode: "cover",
          opacity: 0.5
        }}
        className="border-t-2 border-b-2 border-[#071952]"
      >
        <Image
          source={logo}
          style={{ width: 100, height: 50, resizeMode: "contain" }}
        />
      </ImageBackground>

      {/* Navigation items */}
      <View className="mt-2">
        <DrawerItemList {...props} />
      </View>
    </DrawerContentScrollView>
  );
}
