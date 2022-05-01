import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { connect } from "react-redux";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import Api from "Api";
import FormErrorMessage from "Components/FormErrorMessage";
import { CurrentUser } from "Interface/CurrentUser.interface";
import { SignIn } from "Interface/SignIn.interface";
import { authActions } from "redux/auth-reducer";
import { RootState } from "redux/store";
import { routes } from "routes";



function Login({ setUser }: { setUser: (user: CurrentUser) => void }) {
  const navigate = useNavigate();
  const loginSchema = yup.object().shape({
    email: yup
      .string()
      .trim()
      .required("Email address is required.")
      .email("Please enter your email address."),
    password: yup
      .string()
      .trim()
      .required("Password is required."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignIn>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (value: SignIn) => {
    try {
      const response = await Api.post("/login", {
        password: value.password,
        email: value.email,
      });
      setUser(response.data);
      alert('successfully login!');
      navigate("/todo/create");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div>
      <div className="signup-form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>Sign In</h2>
          <hr />
          <div className="form-group">
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <MdEmail />
                </span>
              </div>
              <input
                {...register("email")}
                placeholder="Email"
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
                placeholder="enter your password"
                className="form-control"
                type="password"
              />
            </div>
            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary btn-lg">
              Sign In
            </button>
          </div>
        </form>
        <div className="text-center">
          {" "}
          Do not have an account?{" "}
          <Link to={routes.register} className="form__link">
            {" "}
            Sign Up{" "}
          </Link>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state: RootState) => {
  return {
    authuser: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setUser: (user: CurrentUser) => dispatch(authActions.setUser(user)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
