import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

export const getUserRecordings = async (userId) => {
  if (!userId) return [];

  try {
    const recordingsQuery = query(
      collection(db, "recordings"),
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    );

    const recordingsSnap = await getDocs(recordingsQuery);

    if (recordingsSnap.empty) {
      return [];
    }
    const recordings = [];
    recordingsSnap.docs.forEach((doc) => {
      recordings.push({ ...doc.data(), id: doc.id, createdAt: doc.data().createdAt?.toDate() ?? null });
    });
    return recordings;
  } catch (error) {
    console.error("❌ Failed to fetch user recordings:", error);
    return [];
  }
};
