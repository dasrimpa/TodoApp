import React from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { TodoList } from "./Pages/Todo/List";
import TodoWrapper from "./Pages/Todo/TodoWrapper";
import TodoForm from "./Pages/Todo/Action";
import  UserRegistration  from "./Pages/Todo/Action/UserRegistration";
import UserLogin  from "./Pages/Todo/Action/UserLogin";
import PrivateRoute from "./Pages/Todo/Action/PrivateRoute";

export default function AppWrapper() {
  return (
    <BrowserRouter>
      <div>
        <nav className="navbar navbar-default navbar-static-top">
          <div className="nav-container">
            <div className="navbar-header navbar-center">
              <span className="navbar-brand app-logo nav-logo">
                TODO APP
              </span>
            </div>
            <ul className="nav">
            <li className="nav-item">
                <Link to="/todo/userregistration" className="nav-link">SignUp</Link>
              </li>
          
              <li className="nav-item">
                <Link to="/todo/userlogin" className="nav-link">SignIn</Link>
              </li>
              
              <li className="nav-item">
                <Link to="/todo/create" className="nav-link">Todo</Link>
              </li>

            </ul>
          </div>
        </nav>
        <Routes>
          <Route path="/todo" element={<TodoWrapper />}>
            <Route path="list" element={<TodoList />} />
            <Route path="create" element={<TodoForm />} />
            <Route path="edit/:objectId" element={<TodoForm />} />
            <Route path="userregistration" element={<UserRegistration />} />
            <Route path="userlogin" element={<UserLogin />} />
            <Route path="privateroute" element={<PrivateRoute/>}>
            <Route path="create" element={<TodoForm />} />
            </Route>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
