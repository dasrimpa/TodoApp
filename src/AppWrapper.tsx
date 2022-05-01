import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

import { TodoList } from "./Pages/Todo/List";
import { routes } from "./routes";

const Login = React.lazy(() => import("./Pages/Login/Login"));
const Register = React.lazy(() => import("./Pages/Register/Register"));
const TodoForm = React.lazy(() => import("./Pages/Todo/Action"));

export default function AppWrapper() {
  return (
    <BrowserRouter>
      <Suspense fallback={<>Loading</>}>
        <div>
          <nav className="navbar navbar-default navbar-static-top">
            <div className="nav-container">
              <div className="navbar-header navbar-center">
                <span className="navbar-brand app-logo nav-logo">TODO APP</span>
              </div>
              <ul className="nav">
                <li className="nav-item">
                  <Link to={routes.register} className="nav-link">
                    SignUp
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={routes.login} className="nav-link">
                    SignIn
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={routes.todoForm} className="nav-link">
                    Todo
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
          <Routes>
            <Route path={routes.register} element={<Register />} />
            <Route path={routes.login} element={<Login />} />
            <Route path={routes.todoForm} element={<TodoForm />} />
            <Route path="edit/:objectId" element={<TodoForm />} />
            <Route path="list" element={<TodoList />} />
          </Routes>
        </div>
      </Suspense>
    </BrowserRouter>
  );
}
