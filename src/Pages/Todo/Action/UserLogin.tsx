import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { User } from '../../../Interface/Todo.interface';
import Api from '../../../Api';

const UserLogin: React.FC = () => {
  const [email,setEmail] = useState<string>('');
  const [password,setPassword] = useState<string>('');
  const [data, setData] = useState<User[]>([]);
const navigate = useNavigate();
  const { register, formState: { errors },handleSubmit } = useForm<User>();

  async function getData() {
    try {
      const response = await Api.get(`/classes/Userdetails`)
      console.log(response.data.results);
      const result = response.data.results;
      setData(result);
    } catch (error) {
      console.error(error);
    }
  }

  const onSubmit = async () =>{
    try{
    const user = data.find(user => user.email === email)
    if (!user) {
      alert("error")
    }
    else{
      alert("Login successfull");
      navigate("/todo/create")
    }
  }
  catch(error){
    console.log(error)
  }
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
           placeholder='enter your email'
           className='form-control'
           value={email}
           onChange={(e)=> setEmail(e.target.value)}/>
			</div>
      {errors?.email?.type === "required" && (
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
				<input {...register("password", { required: true })}
           placeholder='enter your password'
           className='form-control'
           value={password}
           onChange={(e)=> setPassword(e.target.value)}/>
			</div>
      {errors.password && (
          <div className='errorMessage'>Password is required.</div>
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
