import React from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { TodoList } from "./Pages/Todo/List";
import TodoWrapper from "./Pages/Todo/TodoWrapper";
import TodoForm from "./Pages/Todo/Action";

export default function AppWrapper() {
  return (
    <BrowserRouter>
      <div>
        <nav className="navbar navbar-default navbar-static-top">
          <div className="nav-container">
            <div className="navbar-header navbar-center">
              <button
                type="button"
                className="navbar-toggle "
                data-toggle="collapse"
                data-target="#navbar"
                aria-expanded="false"
                aria-controls="navbar"
              >
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand app-logo nav-logo" href="#">
                TODO APP
              </a>
            </div>
            <ul className="nav">
              <li className="nav-item">
                <Link to="/" className="nav-link">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/todo/list" className="nav-link">Todo List</Link>
              </li>
              <li className="nav-item">
                <Link to="/todo/create" className="nav-link">Todo Add</Link>
              </li>
              
            </ul>
          </div>
        </nav>
        <Routes>
          <Route path="/todo" element={<TodoWrapper />}>
            <Route path="list" element={<TodoList />} />
            <Route path="create" element={<TodoForm />} />
            <Route path="edit/:id" element={<TodoForm />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
