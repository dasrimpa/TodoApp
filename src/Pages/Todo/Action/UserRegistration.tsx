import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import Api from '../../../Api';
import { FaUserAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { User } from '../../../Interface/Todo.interface';

const UserRegistration: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { register, formState: { errors },handleSubmit } = useForm<User>();
  const onSubmit = async () => {

    try {
      const response = await Api.post("/classes/Userdetails",{username:name,password:password,email:email
     },);
     console.log("response",response);
     console.log("success");
      alert(
        `successfully created!`,
      );
      navigate("/todo/userlogin");
      return true;
        
    } catch (error:any) {
        alert(`Error! ${error}`);
        return false;
    };
  };

  return (
    <div className="App">
     <div className="signup-form">
    <form onSubmit={handleSubmit(onSubmit)}>
		<h2>Sign Up</h2>
		<p>Please fill in this form to create an account!</p>
		<hr/>
        <div className="form-group">
			<div className="input-group">
				<div className="input-group-prepend">
					<span className="input-group-text">
          <FaUserAlt />
					</span>                    
				</div>
				<input {...register("name", { required: true, pattern: /[A-Za-z]/})}
           onChange={(e) => setName(e.target.value)}
           placeholder='Enter Full Name'
           className="form-control" />
			</div>
      {errors.name && <div className='errorMessage'>Name is required.</div>}
      {errors?.name?.type === "pattern" && (
          <div className='errorMessage'>Name only with alphabet.</div>
        )}
        </div>
       
        <div className="form-group">
			<div className="input-group">
				<div className="input-group-prepend">
					<span className="input-group-text">
						<MdEmail />
					</span>                    
				</div>
				<input  {...register("email",{required :true,
           pattern: /.+@.+/})}
           onChange={(e) => setEmail(e.target.value)}
           placeholder='Enter Email Address'
           className='form-control'/>
			</div>
      {errors?.email?.type === "required" && (
          <div className='errorMessage'>Email is required.</div>
        )}
         {errors?.email?.type === "pattern" && (
          <div className='errorMessage'>Email should be in xxx@yyy.zzz format.</div>
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
           placeholder='Enter Password'
           className='form-control'/>
			</div>
      {errors.password && (
          <div className='errorMessage'>Password is required.</div>
        )}
        </div>
		<div className="form-group">
            <button type="submit" className="btn btn-primary btn-lg">Sign Up</button>
        </div>
    </form>
	<div className="text-center">Already have an account? <Link to="/todo/userlogin" className="form__link">Login</Link></div>
</div>
    </div>
  );
};

export default UserRegistration;

