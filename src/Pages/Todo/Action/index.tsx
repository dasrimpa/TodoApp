import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../../redux/store";
import { Todo } from "../../../Interface/Todo.interface";
import Api from "../../../Api";
import { todoActions } from "../../../redux/todo-reducer";

const mapStateToProps = (state: RootState) => {
  return {
    todoList: state.todo.todoList,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    addTodo: (todo: Todo) => dispatch(todoActions.addTodo(todo)),
    updateTodo: (todo: Todo) => dispatch(todoActions.updateTodo(todo)),
  };
};

const TodoForm = ({
  todoList,
  updateTodo,
}: {
  addTodo: (todo: Todo) => void;
  updateTodo: (todo: Todo) => void;
  todoList: Todo[];
}) => {
  const [title, setTitle] = useState<string>("");
  const navigate = useNavigate();
  const params = useParams();
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const addList = async () => {
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
        const response = await Api.post("/classes/todo", {
          title: title,
        });
        console.log("response", response);
        console.log("success");
        alert("Added Successfully");
        navigate("/todo/list");
        return true;
      } catch (error) {
        alert(`Error! ${error}`);
      }
    }
  };

  const updateTodoCallBack = async () => {
    try {
      const id = params.objectId;
      await Api.put(`/classes/todo/${id}`, { title, completed: false });
      updateTodo({
        title,
        objectId: id,
        completed: false,
      });
      alert("updated Successfully");
      navigate("/todo/list");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params.objectId) {
      const todoItem = todoList.find(
        (t) => t.objectId === String(params.objectId)
      );
      if (todoItem) {
        setTitle(todoItem?.title);
        setSelectedTodo(todoItem);
      }
    }
  }, []);

  const submit = () => {
    params.objectId ? updateTodoCallBack() : addList();
  };
  const onSubmit = async () => {

    try {
      const response = await Api.post("/logout");
     console.log("response",response);
      navigate("/todo/userlogin");
      return true;
        
    } catch (error:any) {
        return false;
    };
  };

  const setTitleText = (titleText: string) => {
    setTitle(titleText);
  };
  return (
    <div className="addTodos">
      <Link to="/todo/list">
        <button type="button" className="btn btn-outline-primary list-btn">
          Todo List
        </button>
      </Link>
      <h1>Todo {params.objectId ? "Edit" : "Create"}</h1>
      <div className="Add-article">
        <input
          type="text"
          onChange={(e) => setTitleText(e.target.value)}
          className="todo-input"
          placeholder="Add an Item"
          value={title}
        />
        <button className="add-btn" onClick={() => submit()}>
          {params.objectId ? "Update" : "Create"} Todo
        </button>
        <button className="logout-btn" onClick={() => onSubmit()}>Logout</button>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoForm);
