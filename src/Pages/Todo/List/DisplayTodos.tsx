import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Todo } from "../../../Interface/Todo.interface";
import { RootState } from "../../../redux/store";
import { addTodoActions} from "../../../redux/todo-reducer";
import { BiEdit } from "react-icons/bi";
import { BsFillArchiveFill } from "react-icons/bs";

const DisplayTodos = ({ todos }: { 
  todos: Todo[];
}) => {
  const [sort, setSort] = useState("active");

  const dispatch = useDispatch();
  const deleteTodo = React.useCallback(
    (todo) => dispatch(addTodoActions.removeTodo(todo)),
    [dispatch, removeTodo]
  );
  
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
              <button className="btn btn-primary"><BiEdit/></button>
            </Link>
            <button className="btn btn-danger" onClick={() => deleteTodo(todo.id)}><BsFillArchiveFill/></button>
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


export default connect(mapStateToProps)(DisplayTodos);
function removeTodo(todo: Todo): any {
  throw new Error("Function not implemented.");
}

