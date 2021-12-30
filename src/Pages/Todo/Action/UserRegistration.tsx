import React, { useState, FC, ReactElement } from 'react';
import { Button, Divider, Input } from 'antd';
import { Link, useNavigate } from "react-router-dom";
const Parse = require('parse/dist/parse.min.js');
const PARSE_APPLICATION_ID = 'R1tQOTPpKy7qavKhWb9JAinEz810scDSoCshr6ZN';
const PARSE_HOST_URL = 'https://parseapi.back4app.com/';
const PARSE_JAVASCRIPT_KEY = 'cYQSqMFrttPxdpaKBGaOxFFigfBzgt1BNngxVIng';
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;
export const UserRegistration: FC<{}> = (): ReactElement => {
  // State variables
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Functions used by the screen components
  const doUserRegistration = async function (): Promise<boolean> {
    // Note that these values come from state variables that we've declared before
    const usernameValue: string = username;
    const passwordValue: string = password;
    try {
      // Since the signUp method returns a Promise, we need to call it using await
      const createdUser: Parse.User = await Parse.User.signUp(usernameValue, passwordValue);
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
          <Input
            value={username}
            onChange={(event: { target: { value: React.SetStateAction<string>; }; }) => setUsername(event.target.value)}
            placeholder="Enter Username"
            className="form_input"
          />
          <Input
            value={password}
            onChange={(event: { target: { value: React.SetStateAction<string>; }; }) => setPassword(event.target.value)}
            placeholder="Enter Password"
            className="form_input"
          />
        </div>
        <div className="form_buttons">
          <Button
            onClick={() => doUserRegistration()}
            type="primary"
            className="form_button"
          >
            Sign Up
          </Button>
        </div>
        <p className="form__hint">Already have an account? <Link to="/todo/userlogin" className="form__link">Login</Link></p>
      </div>
    </div>
  );
};

