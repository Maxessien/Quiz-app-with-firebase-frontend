import { FaEye, FaEyeSlash, FaUser } from "react-icons/fa";
import UserAccountLayout from "../../layout-components/UserAccountLayout";
import "./scss/user-profile.scss";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useUserData from "../../stores-component/UsersData";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { auth } from "../../../firebase/config";

function UserProfile() {
  const { userData, setUserData, backendBaseUrl } = useUserData();
  const [editForm, setEditForm] = useState(true);
  // const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    // watch,
    formState: { errors },
  } = useForm({
    mode: "onTouchend",
    defaultValues: { ...userData },
  });
  const handleSave = async (data) => {
    try {
      const idToken = await auth.currentUser.getIdToken();
      await axios.post(
        `${backendBaseUrl}/user/update`,
        {
          ...data,
          userId: userData.userId,
        },
        {
          headers: {
            Authorisation: `Bearer ${idToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      setUserData("userData", { ...data, userId: userData.userId });
      setEditForm(true);
      toast.success("Account successfully updated");
    } catch (error) {
      toast.error("There was an error, please try again later");
      console.log(error);
    }
  };

  const handleCancel = () => {
    setEditForm(true);
    reset();
  };
  return (
    <>
      <UserAccountLayout>
        <section className="user-profile-section">
          <h1>Profile</h1>
          <div className="user-profile-image">
            <FaUser />
          </div>
          <form
            className="user-profile-form"
            onSubmit={handleSubmit(handleSave)}
          >
            <label htmlFor="name">
              <span className="input-tag">Name</span>
              <input
                {...register("displayName", {
                  required: "Name cannot be empty",
                  minLength: {
                    value: 3,
                    message: "Name must be at least 3 characters long",
                  },
                  maxLength: {
                    value: 16,
                    message: "Name cannot be more than 16 characters",
                  },
                })}
                disabled={editForm}
                type="text"
                id="name"
              />
              {errors.name && (
                <p className="error-message">{errors.name.message}</p>
              )}
            </label>
            <label htmlFor="email">
              <span className="input-tag">Email</span>
              <input
                {...register("email", {
                  required: "Email cannot be empty",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email address",
                  },
                })}
                disabled={editForm}
                type="email"
                id="email"
              />
              {errors.email && (
                <p className="error-message">{errors.email.message}</p>
              )}
            </label>
            {/* <label htmlFor="password">
              <span className="input-tag">Password</span>
              <div className="relative">
                <div className="absolute top-3 right-1 text-md">
                  {showPassword ? (
                    <FaEye onClick={() => setShowPassword(false)} />
                  ) : (
                    <FaEyeSlash onClick={() => setShowPassword(true)} />
                  )}
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  disabled={editForm}
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
              </div>
              {errors.password && (
                <p className="error-message">{errors.password.message}</p>
              )}
            </label>
            <label htmlFor="confirm-password">
              <span className="input-tag">Confirm Password</span>
              <input
                type="password"
                id="confirm-password"
                disabled={editForm}
                placeholder="Confirm password"
                {...register("confirmPassword", {
                  required: "Confirm Password",
                  validate: (value) =>
                    value === watch("password") || "Passwords must  match",
                })}
              />
              {errors.confirmPassword && (
                <p className="error-message">
                  {errors.confirmPassword.message}
                </p>
              )}
            </label> */}

            <div className="form-btns">
              <button
                type="button"
                onClick={() => (editForm ? setEditForm(false) : handleCancel())}
              >
                {editForm ? "Edit" : "Cancel"}
              </button>
              <button type="submit">Save</button>
            </div>
          </form>
        </section>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          newestOnTop={true}
          pauseOnHover={true}
          theme="colored"
        />
      </UserAccountLayout>
    </>
  );
}

export default UserProfile;
