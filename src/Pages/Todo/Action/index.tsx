/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { addTodoActions } from "../../../redux/todo-reducer";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../../redux/store";
import { Todo } from "../../../Interface/Todo.interface";

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
  const navigate = useNavigate();
  const params = useParams();
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  
  useEffect(() => {
    if (params.id) {
      const todoItem = todoList.find(t => t.id === Number(params.id));
      if (todoItem) {
        setTitle(todoItem?.title);
        setSelectedTodo(todoItem);
      }
    }
  }, [])

  const add = () => {
    if (title === "") {
      alert("Input is Empty");
    } else {
      if (params.id && selectedTodo) {
        updateTodo({ ...selectedTodo, title });
        alert("Updated Successfully");
      } else {
        addTodo({
          id: Math.floor(Math.random() * 1000),
          completed: false,
          title,
        });
        alert("Added Successfully");
      }
      
      setTitle("");
    
      navigate("/todo/list");
    }
  };

  const setTitleText = (titleText: string) => {
    setTitle(titleText);
  };

  return (
    <div className="addTodos">
      <h1>Todo {params.id ? 'Edit' : 'Create'}</h1>
      <form className="Add-article">
        <input
          type="text"
          onChange={(e) => setTitleText(e.target.value)}
          className="todo-input"
          placeholder="Add an Item"
          value={title}
        />

        <button className="add-btn" onClick={() => add()}>
          { params.id ? 'Update': 'Create'} Todo
        </button>
      </form>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoForm);
