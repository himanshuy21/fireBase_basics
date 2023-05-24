import React, { useState } from "react";
import { auth, googleProvider } from "../config/Firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //console.log(auth); // this is helpful to understand which user is actually logged in
  const signIn = async () => {
    // console.log(password);
    // console.log(email);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
    }

    setEmail("");
    setPassword("");
  };
  const logout = async () => {
    try {
      console.log(auth);
      signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      console.log(auth);
    } catch (err) {
      console.error(err);
    }
  };
  const checkDetail = async () => {
    console.log(auth.currentUser.displayName);
  };
  return (
    <div>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email..."
      />
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password..."
      />
      <button onClick={signIn}>Sign in</button>
      <button onClick={signInWithGoogle} type="submit">
        Sign in With Google
      </button>
      <button onClick={logout} type="submit">
        LOgout
      </button>
      <button onClick={checkDetail}>Hi {auth?.currentUser?.displayName}</button>
    </div>
  );
};

export default Auth;
