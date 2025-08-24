import { create } from "zustand";
import axios from "axios";
// import { toast } from "react-toastify";

const useQuizData = create((set) => ({
  quizData: [],
  answersData: {},

  fetchQuizData: async (baseUrl) => {
    try {
      const res = await axios.get(`${baseUrl}/quiz/questions`);
      set({ quizData: res.data });
    } catch (err) {
      console.log(err)
    }
  },
  fetchQuizAnswers: async (id, baseUrl) => {
    try {
      const res = await axios.get(`${baseUrl}/quiz/answers/${id}`);
      console.log(res)
      set({ answersData: res.data });
    } catch (err) {
      console.log(err)
      return err;
    }
  },
}));

export default useQuizData;
