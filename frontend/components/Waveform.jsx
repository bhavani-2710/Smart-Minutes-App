import LottieView from "lottie-react-native";
import { useEffect, useRef } from "react";
import { Dimensions, View } from "react-native";
import waveform from '../assets/waveform.json';

const { width } = Dimensions.get("window");

const AnimatedWaveform = ({ isRecording }) => {
  const animationRef = useRef(null);

  useEffect(() => {
    if (isRecording) {
      animationRef.current?.play();
    } else {
      animationRef.current?.reset();
    }
  }, [isRecording]);

  return (
    <View
      style={{
        width: width - 40,
        height: 80,
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <LottieView
        ref={animationRef}
        source={waveform}
        loop
        autoPlay={false}
        style={{ width: "100%", height: 110 }}
      />
    </View>
  );
};

export default AnimatedWaveform;
