import React from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { TodoList } from "./components/TodoList";
import Todos from "./components/Todos";
import { TodoEdit } from "./components/TodoEdit";

export default function Navbar() {
  return (
    <BrowserRouter>
        <div>
        <nav className="navbar navbar-default navbar-static-top">
      <div className="nav-container">
        <div className="navbar-header navbar-center">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand app-logo nav-logo" href="#">TODO APP</a>
        </div>
        <div id="navbar" className="navbar-collapse collapse nav-item">
          <ul className="nav navbar-nav navbar-right nav-item">
          <li><Link to="/">Home</Link></li>
            <li>  <Link to="/todolist">Todo List</Link></li>
            <li><Link to="/todos">Todo Add/Edit</Link></li>
          </ul>
        </div>
      </div>
    </nav>
          <Routes>
          <Route path="/todolist" element={<TodoList />} />
          <Route path="/Todos" element={<Todos />} />
          <Route path="/todoedit" element={<TodoEdit />} />
          </Routes>
        </div>
    </BrowserRouter>
  );
}
