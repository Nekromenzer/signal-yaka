import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from ".";

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then(async (result) => {
      const name = result.user.displayName;
      const email = result.user.email;
      const profilePic = result.user.photoURL;
      const uid = result.user.uid;
      const token = await result.user.getIdToken();
      console.log(result);
      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      localStorage.setItem("profilePic", profilePic);
      localStorage.setItem("token", token);
      localStorage.setItem("uid", uid);
      return (window.location.href = "/");
    })
    .catch((error) => {
      console.log(error);
    });
};
