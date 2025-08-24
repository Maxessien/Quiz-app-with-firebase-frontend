import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
import { create } from "zustand";
import { auth } from "../../firebase/config";

const useUserData = create((set) => ({
  userData: {},
  isLoggedIn: false,
  // backendBaseUrl: "http://localhost:3000/api",
  backendBaseUrl: "https://quiz-app-with-firebase-backend.onrender.com/api",
  setUserData: (field, value)=>{
    set({[field]: value})
  },

  fetchUserData: async () => {
    try {
      const idToken = await auth.currentUser.getIdToken()
      console.log("fetching")
      const res = await axios.get(`https://quiz-app-with-firebase-backend.onrender.com/api/user/getuser`, {
        headers: {
          "Authorisation": `Bearer ${idToken}`,
          "Content-Type": "application/json"
        }
      });
      set({userData: res.data})
      set({isLoggedIn: true})
      console.log("try end")
    } catch (err) {
      console.log(err)
    }
  },
}));

export default useUserData;
