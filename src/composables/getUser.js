import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { ref } from "vue";

const user = ref(auth.currentUser);

//AUTH CHANGES
onAuthStateChanged(auth, (_user) => {
  console.log("USER STATE CHANGED. Current:", _user);
  user.value = _user;
});

const getUser = () => {
  return { user };
};

export default getUser;
