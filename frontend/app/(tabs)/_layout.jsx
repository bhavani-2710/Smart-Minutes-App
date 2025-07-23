import { Ionicons } from "@expo/vector-icons";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Colors } from "../../assets/Colors";
import CustomDrawer from "../../components/CustomDrawer";
import PrivateRoute from "../../components/PrivateRoute";

const TabLayout = () => {
  return (
    <PrivateRoute>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Drawer
          screenOptions={{
            headerShown: false,
            drawerStyle: {
              width: 270, // 👈 Set the drawer width here (default is ~280)
            },
            drawerActiveTintColor: Colors.ACCENT,
            drawerActiveBackgroundColor: Colors.SECONDARY,
            drawerInactiveTintColor: Colors.TERTIARY,
            drawerItemStyle: {
              marginVertical: 2,
              height: 50,
              borderRadius: 5,
            },
            drawerLabelStyle: {
              fontSize: 15,
              fontWeight: "bold",
              alignItems: "center",
            },
          }}
          drawerContent={(props) => <CustomDrawer {...props} />}
        >
          <Drawer.Screen
            name="home"
            options={{
              title: "Home",
              drawerIcon: ({ color }) => (
                <Ionicons name="home" size={20} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="saved"
            options={{
              title: "Saved",
              drawerIcon: ({ color }) => (
                <Ionicons name="bookmark" size={20} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="profile"
            options={{
              title: "Profile",
              drawerIcon: ({ color }) => (
                <Ionicons name="person-sharp" size={20} color={color} />
              ),
            }}
          />
        </Drawer>
      </GestureHandlerRootView>
    </PrivateRoute>
  );
};

export default TabLayout;
