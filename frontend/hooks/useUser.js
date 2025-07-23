// hooks/useUser.js
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../config/firebaseConfig";
import { useAuth } from "../context/AuthContext";
import { getUserRecordings } from "../utils/getUserRecordings";

const useUser = () => {
  const { user, setUser, setAuthLoading } = useAuth();
  const [recordings, setRecordings] = useState([]);
  const [loadingRecordings, setLoadingRecordings] = useState(true);

  const fetchUserData = async (savedUID) => {
    try {
      if (savedUID && !auth.currentUser) {
        // Manually fetch user from Firestore
        const userRef = doc(db, "users", savedUID); // since UID is same as doc ID
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          setUser(userData); // 🟡 not a real FirebaseUser, but ok for fallback
          const recordings = await getUserRecordings(userData.uid);
          setRecordings(recordings);
        }
      }
    } catch (error) {
      console.error("❌ Error loading stored user:", error);
    } finally {
      setAuthLoading(false);
    }
  };

  useEffect(() => {
    if (user?.uid) {
      (async () => {
        setLoadingRecordings(true);
        const data = await getUserRecordings(user.uid);
        setRecordings(data);
        setLoadingRecordings(false);
      })();
    } else {
      setRecordings([]);
      setLoadingRecordings(false);
    }
  }, [user]);

  const deleteRecording = async (recordingId) => {
    try {
      const recordingRef = doc(db, "recordings", recordingId) // recordings UID is same as recordingId
      const recordingSnap = await deleteDoc(recordingRef)
      console.log("recordingSnap", recordingSnap)
      await fetchUserData(user.uid);
    } catch (error) {
      console.info(error)
    }
  };

  return {
    fetchUserData,
    recordings,
    loadingRecordings,
    deleteRecording
  };
};

export default useUser;
