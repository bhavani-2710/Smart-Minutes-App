// components/auth/PrivateRoute.jsx
import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, isLoggedIn, authLoading } = useAuth();

  if (authLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-[#FFE5E5]">
        <ActivityIndicator color="#071952" size="large" />
      </View>
    );
  }

  if (!isLoggedIn || !user.emailVerified) {
    return <Redirect href="/sign-in" />;
  }

  return children;
};

export default PrivateRoute;
