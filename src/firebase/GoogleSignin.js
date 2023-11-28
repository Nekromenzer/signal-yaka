import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from ".";

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then(async (result) => {
      const name = result.user.displayName;
      const email = result.user.email;
      const profilePic = result.user.photoURL;
      const token = await result.user.getIdToken();

      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      localStorage.setItem("profilePic", profilePic);
      localStorage.setItem("token", token);
      return (window.location.href = "/");
    })
    .catch((error) => {
      console.log(error);
    });
};
