/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { addTodoActions } from "../../../redux/todo-reducer";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../../redux/store";
import { Todo } from "../../../Interface/Todo.interface";
import Api from "../../../Api";

const mapStateToProps = (state: RootState) => {
  return {
    todoList: state.todos,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    addTodo: (todo: Todo) => dispatch(addTodoActions.addTodo(todo)),
    updateTodo: (todo: Todo) => dispatch(addTodoActions.updateTodo(todo)),
  };
};

const TodoForm = ({ addTodo, todoList, updateTodo }: {
   addTodo: (todo: Todo) => void,
   updateTodo: (todo: Todo) => void,
   todoList: Todo[],
  }) => {
  const [title, setTitle] = useState<string>('');
  const [updatelist, setUpdatelist] =useState<string>('');
  const navigate = useNavigate();
  const params = useParams();
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  
  useEffect(() => {
    if (params.objectId) {
      const todoItem = todoList.find(t => t.objectId === String(params.objectId));
      if (todoItem) {
        setTitle(todoItem?.title);
        setSelectedTodo(todoItem);
      }
    }
  }, [])
// const submit=()=>{
//   objectId? 'updateList()' : 'add()';
// }
  const add = async() => {
    if (title === "") {
      alert("Input is Empty");
    } else {
//       if (params.id && selectedTodo) {
//         updateTodo({ ...selectedTodo, title });
//         alert("Updated Successfully");
//       } else {
//         addTodo({
//   id: Math.floor(Math.random() * 1000),
//   completed: false,
//   title,
//   objectId: ""
// });
//         alert("Added Successfully");
//       }
      
//       setTitle("");
    
//       navigate("/todo/list");
//     }
    
    try {
     const response = await Api.post("/classes/todo",{
      title:title
     },);
     console.log('response', response);
     console.log("success");
     alert("Added Successfully");
     navigate("/todo/list");
     return true;
     
    } catch (error) {
      alert(`Error! ${error}`);

    }
  }
    
  };

  const updateList = async(objectId :string) =>{
    try{
    const response= await Api.put(`/classes/todo/${objectId}`,title);
      console.log(response.data)
      // const todoItem = data.find(todo => todo.objectId === String(params.objectId));
      }
      catch (error) {
        console.log(error)
      }
    };
 
    const setTitleText = (titleText: string) => {
      setTitle(titleText);
    };
  return (
    <div className="addTodos">
       <Link to="/todo/list"><button type="button" className="btn btn-outline-primary list-btn">Todo List</button></Link>
      <h1>Todo {params.objectId ? 'Edit' : 'Create'}</h1>
      <div className="Add-article">
        <input
          type="text"
          onChange={(e) => setTitleText(e.target.value)}
          className="todo-input"
          placeholder="Add an Item"
          value={title}
        />
        <button className="add-btn" onClick={() => add()}>
          { params.objectId ? 'Update': 'Create'} Todo
        </button>
      </div>
    
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoForm);
