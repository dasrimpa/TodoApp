import React, { useState,useEffect } from "react";
import { connect } from "react-redux";
import { addTodos } from "../redux/reducer";
import { useNavigate } from "react-router-dom";

const mapStateToProps = (state: any) => {
  return {
    todos: state,
  };
};

const mapDispatchToProps = (dispatch: (arg0: { payload: any; type: string; }) => any) => {
  return {
    addTodo: (obj: any) => dispatch(addTodos(obj)),
  };
};
const getDatafromLS=()=>{
  const data = localStorage.getItem('todos');
  if(data){
    return JSON.parse(data);
  }
  else{
    return []
  }
}

const Todos = (props: { addTodo: (arg0: { id: number; item: string; completed: boolean; }) => void; todos: any[]; }) => {
  
  console.log("props",props);
  const [todo, setTodo] = useState("");
  const anyName= useNavigate();

    const add = () => {
    if (todo === "") {
      alert("Input is Empty");
    } else {
      props.addTodo({
        id: Math.floor(Math.random() * 1000),
        item: todo,
        completed: false,
        
      });
      setTodo("");
      alert("Added Successfully");
      anyName("/TodoList");
     
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
  };
   // saving data to local storage
   useEffect(()=>{
    localStorage.setItem('todo',JSON.stringify(todo));
  },[todo])

  return (
    <div className="addTodos">
      <form className="Add-article">
      <input
        type="text"
        onChange={(e) => handleChange(e)}
        className="todo-input"
        placeholder="Add an Item"
        value={todo}
      />

      <button className="add-btn"  onClick={() => add()}>
        Add Todo
      </button>
    </form>
        
    </div>
  );
};

//we can use connect method to connect this component with redux store
export default connect(mapStateToProps, mapDispatchToProps)(Todos);

