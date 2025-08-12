import axios from "axios";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import FormLayout from "../layout-components/FormLayout";
import useUserData from "../stores-component/UsersData";

const AddQuestions = () => {
  const {backendBaseUrl} = useUserData()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { type: "single", key: "", questions: "", answer: "", keyCode: "" },
    mode: "onTouched",
  });

  const formSubmit = async ({ keyCode, questions, answer, type }) => {
    try {
      const res = await axios.post(
        `${backendBaseUrl}/add_quizzes_${type}`,
        {
          key: keyCode,
          questions: JSON.parse(questions),
          answers: JSON.parse(answer),
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
      <FormLayout>
        <form onSubmit={handleSubmit(formSubmit)} className="user-form">
          <label htmlFor="keyCode">
            <span>Key Code</span>
            <input
              type="text"
              id="keyCode"
              {...register("keyCode", { required: "This field is required" })}
            />
            {errors.keyCode && (
              <p className="error-message">{errors.keyCode.message}</p>
            )}
          </label>
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
      </FormLayout>
    </>
  );
};

export default AddQuestions;
