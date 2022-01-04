import React, { useState, FC, ReactElement } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Api from '../../../Api';
export const UserRegistration: FC<{}> = (): ReactElement => {
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const userRegistration = async ()=> {
    
        try {
      const response = await Api.post("/classes/Userdetails",{
     username:username,password:password
     },);
     console.log(response.data);
     console.log("success");
      alert(
        `successfully created!`,
      );
      navigate("/todo/userlogin");
      return true;
        
    } catch (error: any) {
        // signUp can fail if any parameter is blank or failed an uniqueness check on the server
        alert(`Error! ${error}`);
        return false;
    };
  };

  return (
    <div>
       
      <div className='container'>
        <h2 className="heading">{'User Registration'}</h2>
        <div className="form_wrapper">
          <input
            value={username}
            onChange={(event: { target: { value: React.SetStateAction<string>; }; }) => setUsername(event.target.value)}
            placeholder="Enter Username"
            className="form_input"
          />
          <input
            value={password}
            onChange={(event: { target: { value: React.SetStateAction<string>; }; }) => setPassword(event.target.value)}
            placeholder="Enter Password"
            className="form_input"
          />
        </div>
        <br/>
        <div className="form_buttons">
          <button
            onClick={() => userRegistration()}
            className="form_button btn-primary"
          >
            Sign Up
          </button>
        </div>
        <p className="form__hint">Already have an account? <Link to="/todo/userlogin" className="form__link">Login</Link></p>
      </div>
    </div>
  );
};

