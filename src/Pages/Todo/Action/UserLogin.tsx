import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { CurrentUser, User } from '../../../Interface/Todo.interface';
import Api from '../../../Api';
import { RootState } from '../../../redux/store';
import { authActions } from '../../../redux/auth-reducer';
import { connect } from 'react-redux';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';


const schema = yup.object({
  email: yup.string().required(),
  password: yup.string().required(),
}).required();


  function UserLogin ({ setUser }: {
    setUser: (user: CurrentUser) => void
  }) {
  const [email,setEmail] = useState<string>('');
  const [password,setPassword] = useState<string>('');
  const navigate = useNavigate();
  const { register, formState: { errors },handleSubmit } = useForm<User>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async () => {
    try {
      const response = await Api.post("/login",{password:password,email:email},);
      setUser(response.data);
     console.log("response",response);
     console.log("success");
      alert(
        `successfully login!`,
      );

      navigate("/todo/create");
      
      return true;
        
    } catch (error:any) {
        alert(`Invalid email/password.`);
        console.log(error)
        return false;
    };
  };

  return (
    <div className="App">
     <div className="signup-form">
    <form onSubmit={handleSubmit(onSubmit)}>
		<h2>Sign In</h2>
		<hr/>
        <div className="form-group">
			<div className="input-group">
				<div className="input-group-prepend">
					<span className="input-group-text">
						<MdEmail />
					</span>                    
				</div>
				<input  {...register("email")}
           placeholder='enter your email'
           className='form-control'
           value={email}
           onChange={(e)=> setEmail(e.target.value)}/>
			</div>
      {errors.email && (
          <div className='errorMessage'>Email is required.</div>
        )}
        </div>
		<div className="form-group">
			<div className="input-group">
				<div className="input-group-prepend">
					<span className="input-group-text">
					<RiLockPasswordFill/>
					</span>                    
				</div>
				<input {...register("password")}
           placeholder='enter your password'
           className='form-control'
           value={password}
           onChange={(e)=> setPassword(e.target.value)}
           type="password" />
			</div>
      {errors.password && (
          <div className='errorMessage'>Password is required.</div>
        )}
        </div>
		<div className="form-group">
            <button type="submit" className="btn btn-primary btn-lg">Sign In</button>
        </div>
    </form>
	<div className="text-center"> Do not have an account? <Link to="/todo/userregistration" className="form__link"> Sign Up </Link></div>
</div>
    </div>
  );
};


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
export default connect(mapStateToProps, mapDispatchToProps)(UserLogin);

