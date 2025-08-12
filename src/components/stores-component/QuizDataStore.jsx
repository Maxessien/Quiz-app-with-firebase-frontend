import { create } from "zustand";
import axios from "axios";

const useQuizData = create((set) => ({
  quizData: [],
  answersData: {},

  fetchQuizData: async (baseUrl) => {
    const res = await axios.get(`${baseUrl}/quizzes`);
    set({ quizData: res.data });
  },
  fetchQuizAnswers: async (id, baseUrl) => {
    try {
      const res = await axios.post(`${baseUrl}/quiz_answers`, { quizId: id });
      set({ answersData: res.data });
    } catch (err) {
      return err;
    }
  },
}));

export default useQuizData;
