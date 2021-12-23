import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Todo } from "../../../Interface/Todo.interface";
import { RootState } from "../../../redux/store";
import { addTodoActions} from "../../../redux/todo-reducer";

const DisplayTodos = ({ todos }: { 
  todos: Todo[];
}) => {
  const [sort, setSort] = useState("active");
  return (
    <div className="displaytodos">
      <div className="buttons">
        <button className="active-btn btn" onClick={() => setSort("active")}>
          Active
        </button>

        <button
          className="complete-btn btn"
          onClick={() => setSort("completed")}
        >
          Completed
        </button>

        <button className="all-btn btn" onClick={() => setSort("all")}>
          All
        </button>
      </div>

     {
       todos.map((todo: Todo) => {
        return (
          <div key={todo.id} className="d-flex justify-content-center">
          <div>
            <h2>
              {todo.title}
            </h2>
          </div>
            
           <div className="mx-4">
           <Link to={`/todo/edit/${todo.id}`}>
              <button className="btn btn-primary">Edit</button>
            </Link>
            <button className="btn btn-danger">Delete</button>
           </div>
          </div>
        );
      })
     }
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    todos: state.todos,
  };
};

const mapDispatchToProps = (dispatch: any, state: any) => {
  return {
    addTodo: (obj: any) => dispatch(addTodoActions.addTodo(obj)),
    removeTodo: (id: any) => dispatch(addTodoActions.removeTodo(id)),
    updateTodo: (obj: any) => dispatch(addTodoActions.updateTodo(obj)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DisplayTodos);
