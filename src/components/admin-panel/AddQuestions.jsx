import axios from "axios";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import FormLayout from "../layout-components/FormLayout";
import useUserData from "../stores-component/UsersData";
import UserAccountLayout from "../layout-components/UserAccountLayout"
import { auth } from "../../firebase/config";

const AddQuestions = () => {
  const {backendBaseUrl} = useUserData()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { type: "single", questions: "", answer: "" },
    mode: "onTouched",
  });

  const formSubmit = async ({ questions, answer, type }) => {
    try {
      const idToken = await auth.currentUser.getIdToken();
      const res = await axios.post(
        `${backendBaseUrl}/add_quizzes_${type}`,
        {
          questions: JSON.parse(questions),
          answers: JSON.parse(answer),
        },
        {
          headers: {
            Authorisation: `Bearer ${idToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      reset();
      toast.success("Quiz added successfully");
      return res;
    } catch (err) {
      toast.error("Unable to add quiz");
      return err;
    }
  };
  return (
    <>
    <UserAccountLayout>
        <form onSubmit={handleSubmit(formSubmit)} className="user-form px-10 py-10 w-full">
          <label htmlFor="type">
            <span>Type</span>
            <select className="w-full rounded-sm shadow-[inset_0_0_7px_var(--form-text-color)] px-2 py-1" {...register("type")} id="type">
              <option className="bg-gray-700" value="single">Single</option>
              <option className="bg-gray-700" value="multiple">Multiple</option>
            </select>
          </label>
          <label htmlFor="questions">
            <span>Questions</span>
            <textarea
              id="questions"
              className="w-full rounded-sm shadow-[inset_0_0_7px_var(--form-text-color)] px-2 py-1 h-[300px]"
              type="text"
              {...register("questions", { required: "This field is required" })}
            />
          </label>
          {errors.questions && (
            <p className="error-message">{errors.questions.message}</p>
          )}
          <label htmlFor="answer">
            <span>Answer</span>
            <textarea
              id="answer"
              className="w-full rounded-sm shadow-[inset_0_0_7px_var(--form-text-color)] px-2 py-1 h-[300px]"
              type="text"
              {...register("answer", { required: "This field is required" })}
            />
            {errors.answer && (
              <p className="error-message">{errors.answer.message}</p>
            )}
          </label>

          <button type="submit">
            {!isSubmitting ? "Submit" : "Submitting ..."}
          </button>
        </form>

        <ToastContainer
          position="top-center"
          autoClose={5000}
          newestOnTop={true}
          hideProgressBar={false}
          closeOnClick={true}
        />
    </UserAccountLayout>
    </>
  );
};

export default AddQuestions;
