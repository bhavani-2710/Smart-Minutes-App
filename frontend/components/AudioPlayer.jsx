// components/AudioPlayer.jsx
import { AntDesign, Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { Audio } from "expo-av";
import { useEffect, useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

const formatMillis = (millis) => {
  const minutes = Math.floor(millis / 60000);
  const seconds = Math.floor((millis % 60000) / 1000);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

export default function AudioPlayer({ url }) {
  const sound = useRef(new Audio.Sound());
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const loadSound = async () => {
      try {
        await sound.current.loadAsync({ uri: url });
        sound.current.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
      } catch (err) {
        console.error("❌ Failed to load sound:", err);
      }
    };

    loadSound();
    return () => {
      sound.current.unloadAsync();
    };
  }, []);

  const onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      setPosition(status.positionMillis);
      setDuration(status.durationMillis);
      setIsPlaying(status.isPlaying);
    }
  };

  const togglePlayback = async () => {
    if (isPlaying) {
      await sound.current.pauseAsync();
    } else {
      await sound.current.playAsync();
    }
  };

  const onSeek = async (value) => {
    await sound.current.setPositionAsync(value);
  };

  const handleRewind = async () => {
    await sound.current.setPositionAsync(position - 10*1000);
  };

  const handleForward = async () => {
    await sound.current.setPositionAsync(position + 10*1000);
  };

  return (
    <View className="mt-3 items-center">
      <View className="flex flex-row justify-between w-full px-1">
        <Text className="text-xs text-[#071952]">{formatMillis(position)}</Text>
        <Text className="text-xs text-[#071952]">{formatMillis(duration)}</Text>
      </View>

      <Slider
        style={{ width: "100%", height: 20 }}
        minimumValue={0}
        maximumValue={duration}
        value={position}
        minimumTrackTintColor="#071952"
        maximumTrackTintColor="#AC87C5"
        thumbTintColor="#E0AED0"
        onSlidingComplete={onSeek}
      />

      <View className="flex flex-row items-center">
        <TouchableOpacity
          onPress={handleRewind}
          className="p-3 m-3 bg-[#071952] border-2 border-[#E0AED0] rounded-full"
        >
          <AntDesign name="banckward" size={18} color="#E0AED0" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={togglePlayback}
          className="p-3 m-3 bg-[#071952] border-2 border-[#E0AED0] rounded-full"
        >
          {isPlaying ? (
            <AntDesign name="pause" size={28} color="#E0AED0" />
          ) : (
            <Ionicons name="play" size={28} color="#E0AED0" />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleForward}
          className="p-3 m-3 bg-[#071952] border-2 border-[#E0AED0] rounded-full"
        >
          <AntDesign name="forward" size={18} color="#E0AED0" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
