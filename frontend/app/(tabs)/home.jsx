import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRef, useState } from "react";
import {
  ImageBackground,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Toast } from "toastify-react-native";
import background_noise from "../../assets/images/background_noise.jpg";
import CustomHeader from "../../components/CustomHeader";
import Logo from "../../components/Logo";
import AnimatedWaveform from "../../components/Waveform";
import useAudio from "../../hooks/useAudio";

const HomeScreen = () => {
  const [time, setTime] = useState(0);
  const intervalRef = useRef(null); // track interval

  const {
    recorderState,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
  } = useAudio();

  const handleStartRecording = async () => {
    await startRecording();

    intervalRef.current = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);
  };

  const handlePauseRecording = async () => {
    await pauseRecording();
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const handleResumeRecording = async () => {
    await resumeRecording();

    intervalRef.current = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);
  };

  const handleStopRecording = async () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setTime(0); // reset
    await stopRecording();
    Toast.show({
      type: "custom",
      text1: "Saved!",
      text2: "Recording saved successfully!",
      iconColor: "green"
    });
  };

  const formatTime = (seconds) => {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };

  return (
    <SafeAreaView>
      {/* HEADER */}
      <CustomHeader title="Home" />

      <View
        style={{ height: "100%" }}
        className="flex items-center bg-white p-2 mb-5"
      >
        <View className="flex items-center border-2 border-[#071952]">
          <ImageBackground
            source={background_noise}
            imageStyle={{ resizeMode: "cover", opacity: 0.5 }}
            className="h-20 w-screen"
          >
            <Logo />
          </ImageBackground>
        </View>

        {/* VOICE RECORDER ICON */}
        <View className="flex items-center justify-center">
          <TouchableOpacity
            onPress={handleStartRecording}
            disabled={recorderState.isRecording}
            className="bg-red-500 flex p-16 mt-16 rounded-full border-4 border-[#E0AED0]"
          >
            <Ionicons name="mic" size={90} color="#E0AED0" />
          </TouchableOpacity>
        </View>

        {/* Timer */}
        <Text className="text-xl font-semibold text-[#071952] p-5 m-2">
          {formatTime(time)}
        </Text>

        {/* WAVEFORM */}
        <View className="flex flex-row">
          <AnimatedWaveform isRecording={recorderState.isRecording} />
        </View>

        {/* STOP AND PAUSE BUTTONS */}
        {/* Pause Button */}
        <View className="flex flex-row items-center justify-evenly w-full gap-2 m-10">
          <TouchableOpacity
            disabled={!recorderState.canRecord}
            onPress={
              recorderState.isRecording
                ? handlePauseRecording
                : handleResumeRecording
            }
            className="p-5 bg-[#071952] rounded-full"
          >
            {recorderState.isRecording ? (
              <AntDesign name="pause" size={28} color="#E0AED0" />
            ) : (
              <Ionicons name="play" size={28} color="#E0AED0" />
            )}
          </TouchableOpacity>
          {/* End Button */}
          <TouchableOpacity
            onPress={handleStopRecording}
            disabled={!recorderState.canRecord}
            className="p-5 bg-[#071952] rounded-full"
          >
            <Ionicons name="stop" size={28} color="#E0AED0" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
