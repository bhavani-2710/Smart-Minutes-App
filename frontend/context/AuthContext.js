// context/AuthContext.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useRouter } from "expo-router";
import {
  createUserWithEmailAndPassword,
  deleteUser,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithCredential,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import {
  deleteDoc,
  doc,
  getDoc,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import { auth, db } from "../config/firebaseConfig";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        "449959977950-cml6odiin97usjvfdlgummujpi9e2ogm.apps.googleusercontent.com",
    });

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      await AsyncStorage.setItem("userUID", firebaseUser.uid);
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const currentUser = userCredential.user;
      await currentUser.reload();

      if (!currentUser.emailVerified) {
        Alert.alert(
          "Email Not Verified",
          "Please verify your email before logging in."
        );
        await signOut(auth); // 👈 force sign out
        return;
      } else if (currentUser.emailVerified) {
        await setDoc(
          doc(db, "users", currentUser.uid),
          { emailVerified: true },
          { merge: true } // 🔥 merge so you don't overwrite existing data
        );

        // Fetch from firestore
        const userSnap = await getDoc(doc(db, "users", currentUser.uid));
        const user = userSnap.data();
        setUser(user);
        await AsyncStorage.setItem("userUID", userCredential.user.uid);
        router.push("/home");
      }
      router.replace("/sign-in");
    } catch (error) {
      console.log("❌ Sign-in error:", error);
      if (error.code === "auth/invalid-credential") {
        Alert.alert(
          "Sign In Failed!",
          "Incorrect Credentials. Please try again",
          [{ text: "OK" }]
        );
      } else {
        Alert.alert(
          "Error Signing In!",
          "An unexpected error occurred. Please try again later.",
          [{ text: "OK" }]
        );
      }
    }
  };

  const signup = async (name, email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const currentUser = userCredential.user;
      await updateProfile(currentUser, { displayName: name });

      await sendEmailVerification(currentUser);

      await setDoc(doc(db, "users", currentUser.uid), {
        uid: currentUser.uid,
        email: currentUser.email,
        name: currentUser.displayName,
        createdAt: serverTimestamp(),
        emailVerified: currentUser.emailVerified,
      });
      const userSnap = await getDoc(doc(db, "users", currentUser.uid));
      setUser(userSnap.data());

      await AsyncStorage.setItem("userUID", currentUser.uid);

      Alert.alert(
        "Verify Your Email",
        "A verification link has been sent to your email. Please verify to proceed."
      );
      router.replace("/sign-in");
    } catch (error) {
      console.error("❌ Sign-up error:", error);
      Alert.alert("Signup Failed", error.message);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();

      // ✅ Sign out to force account picker
      await GoogleSignin.signOut();

      // ✅ Now initiate sign-in
      const userInfo = await GoogleSignin.signIn();

      // If User exits the account picker screen
      if (userInfo.type === "cancelled") return;

      const idToken = userInfo.data.idToken;
      const credential = GoogleAuthProvider.credential(idToken);
      const result = await signInWithCredential(auth, credential);
      const googleUser = result.user;

      const userRef = doc(db, "users", googleUser.uid);
      let userSnap = await getDoc(userRef);
      if (!userSnap.exists()) {
        await setDoc(userRef, {
          uid: googleUser.uid,
          email: googleUser.email,
          name: googleUser.displayName,
          photoURL: googleUser.photoURL,
          createdAt: serverTimestamp(),
          emailVerified: googleUser.emailVerified,
        });
      }
      userSnap = await getDoc(doc(db, "users", googleUser.uid));
      setUser(userSnap.data());
      await AsyncStorage.setItem("userUID", googleUser.uid);
      router.replace("/home");
    } catch (error) {
      console.error("❌ Google Sign-In error:", error);
      Alert.alert("Google Sign-In Failed", error.message);
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    AsyncStorage.removeItem("userUID");
    router.replace("/");
  };

  const changeName = async (newName) => {
    if (!user) {
      console.error("User is not available");
      return;
    }
    try {
      await setDoc(
        doc(db, "users", user.uid),
        { name: newName },
        { merge: true }
      );
      const userSnap = await getDoc(doc(db, "users", user.uid));
      setUser(userSnap.data());
      return;
    } catch (error) {
      console.error("❌ Error updating name:", error);
    }
  };

  const changePassword = async () => {
    if (!user) {
      console.error("User is not available");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, user.email);
    } catch (error) {
      console.error("❌ Error sending password reset email:", error);
    }
  };

  const deleteAccount = async () => {
    const currentUser = auth.currentUser;

    if (currentUser) {
      try {
        await deleteDoc(doc(db, "users", currentUser.uid));
        await deleteUser(currentUser);
        console.log("🗑️ User deleted successfully");
        await AsyncStorage.removeItem("userUID1");
        router.replace("/sign-in");
        return { isDeleted: true };
      } catch (error) {
        if (error.code === "auth/requires-recent-login") {
          // Prompt user to reauthenticate
          return {
            isDeleted: false,
            message: "Please reauthenticate and try again.",
          };
        } else {
          console.log("❌ Error deleting user:", error);
          return { isDeleted: false, message: "❌ Error deleting user." };
        }
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isLoggedIn: !!user,
        authLoading,
        setAuthLoading,
        login,
        signup,
        logout,
        signInWithGoogle,
        changeName,
        changePassword,
        deleteAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
