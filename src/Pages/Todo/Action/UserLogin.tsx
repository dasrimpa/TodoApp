import React, { useState, FC, ReactElement } from 'react';
import { Button, Divider, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
const Parse = require('parse/dist/parse.min.js');

export const UserLogin: FC<{}> = (): ReactElement => {
  // State variables
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [currentUser, setCurrentUser] = useState<Parse.Object | null>(null);
  const navigate = useNavigate();

  const doUserLogIn = async function (): Promise<boolean> {
    // Note that these values come from state variables that we've declared before
    const usernameValue: string = username;
    const passwordValue: string = password;
    try {
      const loggedInUser: Parse.User = await Parse.User.logIn(usernameValue, passwordValue);
      // logIn returns the corresponding ParseUser object
      alert(
        `Success! User ${loggedInUser.get('username')} has successfully signed in!`,
      );
      // To verify that this is in fact the current user, `current` can be used
      const currentUser: Parse.User = await Parse.User.current();
      console.log(loggedInUser === currentUser);
      // Clear input fields
      setUsername('');
      setPassword('');
      // Update state variable holding current user
      getCurrentUser();
      navigate("/todo/create");
      return true;
    } catch (error: any) {
      // Error can be caused by wrong parameters or lack of Internet connection
      alert(`Error! ${error.message}`);
      return false;
    }
  };

  const doUserLogOut = async function (): Promise<boolean> {
    try {
      await Parse.User.logOut();
      // To verify that current user is now empty, currentAsync can be used
      const currentUser: Parse.User = await Parse.User.current();
      if (currentUser === null) {
        alert('Success! No user is logged in anymore!');
      }
      // Update state variable holding current user
      getCurrentUser();
      return true;
    } catch (error: any) {
      alert(`Error! ${error.message}`);
      return false;
    }
  };

  // Function that will return current user and also update current username
  const getCurrentUser = async function (): Promise<Parse.User | null> {
    const currentUser: (Parse.User | null) = await Parse.User.current();
    // Update state variable holding current user
    setCurrentUser(currentUser);
    return currentUser;
  }

  return (
    <div>
   
        
  
      {currentUser === null && (
        <div className="container">
          <h2 className="heading">{'User Login'}</h2>
          <Divider />
          <div className="form_wrapper">
            <Input
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Username"
              size="large"
              className="form_input"
            />
            <Input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Password"
              size="large"
              type="password"
              className="form_input"
            />
          </div>
          <div className="form_buttons">
            <Button
              onClick={() => doUserLogIn()}
              type="primary"
              className="form_button"
              color={'#208AEC'}
              size="large"
              block
            >
              Log In
            </Button>
          </div>
          <Divider />
         
          <p className="form__hint">Don't have an account? <Link to="/todo/userregistration" className="form__link">Sign up</Link></p>
        </div>
      )}
      {currentUser !== null &&
        (<div className="container">
          <h2 className="heading">{'User Screen'}</h2>
          <Divider />
          <h2 className="heading">{`Hello ${currentUser.get('username')}!`}</h2>
          <div className="form_buttons">
            <Button
              onClick={() => doUserLogOut()}
              type="primary"
              className="form_button"
              color={'#208AEC'}
              size="large"
            >
              Log Out
            </Button>
          </div>
        </div>)
      }
    </div>
  );
};