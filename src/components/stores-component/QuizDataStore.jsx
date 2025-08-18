import { create } from "zustand";
import axios from "axios";

const useQuizData = create((set) => ({
  quizData: [],
  answersData: {},

  fetchQuizData: async (baseUrl) => {
    try {
      console.log(`${baseUrl}/quizzes`)    
      const res = await axios.get(`${baseUrl}/quizzes`);
      set({ quizData: res.data });
    } catch (err) {
      console.log(err)
    }
  },
  fetchQuizAnswers: async (id, baseUrl) => {
    try {
      const res = await axios.post(`${baseUrl}/quiz_answers`, { quizId: id });
      console.log(res)
      set({ answersData: res.data });
    } catch (err) {
      console.log(err)
      return err;
    }
  },
}));

export default useQuizData;
