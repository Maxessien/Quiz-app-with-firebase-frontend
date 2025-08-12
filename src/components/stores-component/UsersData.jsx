import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
import { create } from "zustand";

const useUserData = create((set) => ({
  userData: {},
  isLoggedIn: false,
  backendBaseUrl: "https://quiz-app-with-firebase-backend.onrender.com/api",
  setUserData: (field, value)=>{
    set({[field]: value})
  },

  fetchUserData: async (id) => {
    const res = await axios.post(`${useUserData.getState().backendBaseUrl}/getuser`, {userId: id});
    set({userData: res.data})
    set({isLoggedIn: true})
  },
}));

export default useUserData;
