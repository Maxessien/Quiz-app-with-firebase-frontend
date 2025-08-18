import { useForm } from "react-hook-form";
import "../scss/form-fields.scss";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useUserData from "../../stores-component/UsersData";
import { useState } from "react";
// import {useQuery} from "@tanstack/react-query"

function RegisterForm() {
  const { backendBaseUrl } = useUserData();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onTouched" });

  const navigate = useNavigate();

  const submitForm = async (data) => {
    try {
      console.log(`${backendBaseUrl}/register`)
      setIsLoading(true);
      const res = await axios.post(`${backendBaseUrl}/register`, data);
      toast.success(res.data.message);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      console.log(err)
      toast.error(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <form
        method="POST"
        onSubmit={handleSubmit(submitForm)}
        className="user-form"
      >
        <label htmlFor="name">
          Name
          <input
            type="text"
            id="name"
            placeholder="Enter your name"
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 3,
                message: "Name must be at least 3 characters long",
              },
            })}
          />
          {errors.name && (
            <p className="error-message">{errors.name.message}</p>
          )}
        </label>
        <label htmlFor="email">
          Email{" "}
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <p className="error-message">{errors.email.message}</p>
          )}
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long",
              },
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d).+$/,
                message: "Password must contain a letter and anumber",
              },
            })}
          />
          {errors.password && (
            <p className="error-message">{errors.password.message}</p>
          )}
        </label>
        <label htmlFor="confirm-password">
          Confirm password
          <input
            type="password"
            id="confirm-password"
            placeholder="Confirm password"
            {...register("confirmPassword", {
              required: "Confirm Password",
              validate: (value) =>
                value === watch("password") || "Passwords must  match",
            })}
          />
          {errors.confirmPassword && (
            <p className="error-message">{errors.confirmPassword.message}</p>
          )}
        </label>

        <button type="submit" disabled={isSubmitting ? true : false}>
          {!isLoading ? "Sign Up" : "Signing Up..."}
        </button>
      </form>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        newestOnTop={true}
        hideProgressBar={false}
        closeOnClick={true}
      />
    </>
  );
}

export default RegisterForm;
