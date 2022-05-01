import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Api from "Api";
import { SignUp } from "Interface/SignUp.interface";
import { routes } from "routes";
import FormErrorMessage from "Components/FormErrorMessage";

export default function Register() {
  const navigate = useNavigate();
  const registerSchema = yup.object().shape({
    Username: yup.string().trim().required("Username is required."),
    email: yup
      .string()
      .trim()
      .required("Email address is required")
      .email("Enter valid email address"),
    password: yup
      .string()
      .trim()
      .required("Password is required.")
      .min(6, "Password must be at least 6 characters"),
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignUp>({
    resolver: yupResolver(registerSchema),
  });
  const onSubmit = async (value: SignUp) => {
    try {
      await Api.post("/users", {
        username: value.name,
        email: value.email,
        password: value.password,
      });
      alert(`successfully created!`);
      navigate(routes.login);
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div>
      <div className="signup-form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>Sign Up</h2>
          <p>Please fill in this form to create an account!</p>
          <hr />
          <div className="form-group">
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <FaUserAlt />
                </span>
              </div>
              <input
                {...register("name")}
                placeholder="Username"
                className="form-control"
              />
            </div>
            <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
          </div>

          <div className="form-group">
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <MdEmail />
                </span>
              </div>
              <input
                {...register("email")}
                placeholder="Email Address"
                className="form-control"
              />
            </div>
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
          </div>
          <div className="form-group">
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <RiLockPasswordFill />
                </span>
              </div>
              <input
                {...register("password")}
                placeholder="Password"
                className="form-control"
                type="password"
              />
            </div>
            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary btn-lg">
              Sign Up
            </button>
          </div>
        </form>
        <div className="text-center">
          Already have an account?{" "}
          <Link to={routes.login} className="form__link">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
