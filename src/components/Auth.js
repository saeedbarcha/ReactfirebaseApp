import { useState } from "react";
import { auth, googleProvider } from "../config/firebase";
import { createUserWithEmailAndPassword , signInWithPopup, signOut} from "firebase/auth";

export const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  function validateEmail(email) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(String(email).toLowerCase());
  }

  const signIn = async () => {
    try {
      if (!validateEmail(email)) {
        alert("Please enter a valid email.");
        return;
      }
      await createUserWithEmailAndPassword(auth,  email, password);
    } catch (error) {
      console.log("error", error);
    }
  };

  console.log(auth?.currentUser?.email)
  // console.log(auth?.currentUser?.photoURL)


  const signInWithGoogle = async () => {
    try {
      if (!validateEmail(email)) {
        alert("Please enter a valid email.");
        return;
      }
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.log("error", error);
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <div className="App">
      <input
        type="text"
        placeholder="email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        type="password"
        placeholder="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button onClick={signIn}>sign In</button>
      <button onClick={signInWithGoogle}>sign In with google</button>
      <button onClick={logOut}>logout</button>
    </div>
  );
};

export default Auth;
