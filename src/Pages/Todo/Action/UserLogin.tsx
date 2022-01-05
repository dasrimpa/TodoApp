import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { User } from '../../../Interface/Todo.interface';

const UserLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
const navigate = useNavigate();
  const { register, formState: { errors },handleSubmit } = useForm<User>();
  const onSubmit = async () =>{
alert("Login successfull");
navigate("/todo/create")
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
				<input  {...register("email",{required :true})}
           onChange={(e) => setEmail(e.target.value)}
           placeholder='enter your email'
           className='form-control'/>
			</div>
      {errors?.email?.type === "required" && (
          <div>Email is required.</div>
        )}
        </div>
		<div className="form-group">
			<div className="input-group">
				<div className="input-group-prepend">
					<span className="input-group-text">
					<RiLockPasswordFill/>
					</span>                    
				</div>
				<input {...register("password", { required: true })}
           onChange={(e) => setPassword(e.target.value)}
           placeholder='enter your password'
           className='form-control'/>
			</div>
      {errors.password && (
          <div>Password is required.</div>
        )}
        </div>
		<div className="form-group">
            <button type="submit" className="btn btn-primary btn-lg">Sign In</button>
        </div>
    </form>
	<div className="text-center">Do not have an account? <Link to="/todo/userregistration" className="form__link">Sign Up</Link></div>
</div>
    </div>
  );
};

export default UserLogin;

