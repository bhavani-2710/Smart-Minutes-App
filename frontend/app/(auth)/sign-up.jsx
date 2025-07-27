import { Formik } from "formik";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "../../context/AuthContext";
import { signUpValidationSchema } from "../../utils/authSchema";
import meetingPic from '../../assets/images/meeting2.png'

const SignUp = () => {
  const { signup, signInWithGoogle } = useAuth();

  const handleSignup = async (values) => {
    try {
      const { email, password, name } = values;
      signup(name, email, password);
    } catch (error) {
      console.error("Error signing up...", error);
    }
  };
  return (
    <SafeAreaView className="bg-[#FFE5E5]">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
        }}
        className="-mt-16"
      >
        <View className="flex items-center justify-center">
          <Image
            source={meetingPic}
            style={{ height: 150, width: 250 }}
            className="m-5"
          />
          <Text className="text-2xl font-semibold text-[#071952] text-center">
            Get Started!
          </Text>

          {/* Formik */}
          <View className="w-11/12">
            <Formik
              initialValues={{ name: "", email: "", password: "" }}
              validationSchema={signUpValidationSchema}
              onSubmit={handleSignup}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <View className="flex gap-3 p-5 m-5 mb-0">
                  <TextInput
                    className="bg-red-200 px-2 rounded-lg border text-[#071952] border-[#071952]"
                    onChangeText={handleChange("name")}
                    onBlur={handleBlur("name")}
                    value={values.name}
                    placeholder="Name"
                    placeholderTextColor="#003285"
                  />
                  {touched.name && errors.name && (
                    <Text className="text-red-500 text-xs mb-2">
                      {errors.name}
                    </Text>
                  )}

                  <TextInput
                    className="bg-red-200 px-2 rounded-lg border text-[#071952] border-[#071952]"
                    keyboardType="email-address"
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                    placeholder="Email"
                    placeholderTextColor="#003285"
                  />
                  {touched.email && errors.email && (
                    <Text className="text-red-500 text-xs mb-2">
                      {errors.email}
                    </Text>
                  )}

                  <TextInput
                    className="bg-red-200 px-2 rounded-lg border text-[#071952] border-[#071952]"
                    secureTextEntry={true}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                    placeholder="Password"
                    placeholderTextColor="#003285"
                  />
                  {touched.password && errors.password && (
                    <Text className="text-red-500 text-xs mb-2">
                      {errors.password}
                    </Text>
                  )}

                  <TouchableOpacity
                    onPress={handleSubmit}
                    className="bg-[#071952] self-center py-2 m-5 mb-2 w-32 border border-[#756AB6] rounded-lg"
                  >
                    <Text className="text-xl text-white font-semibold text-center">
                      Sign Up
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>

            <View>
              <TouchableOpacity
                className="flex flex-row items-center justify-center -mt-5"
                onPress={() => router.push("/sign-up")}
              >
                <Text className="text-[#071952] font-semibold">
                  Already a User?{"  "}
                </Text>
                <Text className="text-base font-semibold italic underline decoration-4 underline-offset-8 text-[#AC87C5]">
                  Sign In
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* GOOGLE */}
          <View className="flex items-center justify-center">
            <Text className="text-center text-lg font-semibold mt-5 mb-2 text-[#071952]">
              <View className="border-b-2 border-[#AC87C5] p-2 w-24" />
              {"   "}Other Options{"  "}{" "}
              <View className="border-b-2 border-[#AC87C5] p-2 w-24" />
            </Text>

            <TouchableOpacity
              onPress={signInWithGoogle}
              className="rounded-full w-[50] h-[50] p-2 my-2 bg-[#071952] text-center flex items-center justify-center"
            >
              <Image
                source={{
                  uri: "https://img.icons8.com/?size=100&id=17949&format=png&color=000000",
                }}
                style={{ width: 30, height: 30 }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
