import axios from "axios";
import {
  AudioModule,
  RecordingPresets,
  setAudioModeAsync,
  useAudioRecorder,
  useAudioRecorderState,
} from "expo-audio";
import { addDoc, collection } from "firebase/firestore";
import { useEffect } from "react";
import { db } from "../config/firebaseConfig";
import { useAuth } from "../context/AuthContext";
import { uploadAudioToCloudinary } from "../utils/cloudinary";
import useUser from "./useUser";

const useAudio = () => {
  const { user } = useAuth();
  const { fetchUserData } = useUser();

  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const recorderState = useAudioRecorderState(audioRecorder);

  // To start recording audio
  const startRecording = async () => {
    await audioRecorder.prepareToRecordAsync({ isMeteringEnabled: true });
    audioRecorder.record();
  };

  // To stop recording audio
  const stopRecording = async () => {
    try {
      await audioRecorder.stop();
      const uri = audioRecorder.uri;

      console.log("🟢 Uploading to Cloudinary...");
      let cloudinaryUrl = await uploadAudioToCloudinary(uri);
      if (!cloudinaryUrl) {
        cloudinaryUrl =
          "https://res.cloudinary.com/drrh3span/video/upload/v1752780320/xq16pe7ouslmctcja8fc.3gp";
      }

      // ✅ Save only the URL first
      const docRef = await addDoc(collection(db, "recordings"), {
        url: cloudinaryUrl,
        userId: user?.uid || null,
        createdAt: new Date().toISOString(),
        transcript: null,
        summary: null,
        status: "processing", // optional status field
      });
      console.log(docRef.id);
      console.log(cloudinaryUrl);

      // 🔄 Trigger background processing (don't wait)
      const response = await axios.post(
        "https://smart-minutes-server.onrender.com/process-audio",
        {
          cloudinaryUrl,
          firestoreId: docRef.id, // send document ID so backend can update it later
        }
      );

      console.log("📨 Background request accepted:", response.data);
      console.log("✅ URL saved, processing triggered");
      return { cloudinaryUrl };
    } catch (error) {
      console.error("Recording stop failed:", error);
      return null;
    }
  };

  // To pause recording
  const pauseRecording = () => {
    audioRecorder.pause();
  };

  // To resume paused recording
  const resumeRecording = () => {
    audioRecorder.record();
  };

  useEffect(() => {
    (async () => {
      const status = await AudioModule.requestRecordingPermissionsAsync();
      if (!status.granted) {
        Alert.alert("Permission to access microphone was denied");
      }

      setAudioModeAsync({
        playsInSilentMode: true,
        allowsRecording: true,
      });
    })();
  }, []);

  return {
    stopRecording,
    startRecording,
    pauseRecording,
    resumeRecording,
    recorderState,
  };
};

export default useAudio;
