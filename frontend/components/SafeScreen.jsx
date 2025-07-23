import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const SafeScreen = ({ children }) => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        paddingTop: insets.top + 10,
        paddingBottom: insets.bottom + 10,
        flex: 1,
        backgroundColor: "#071952",
      }}
    >
      {children}
    </View>
  );
};

export default SafeScreen;
