import React, { useState } from "react";
import { connect } from "react-redux";
import {
  addTodos,
  completeTodos,
  removeTodos,
  updateTodos,
} from "../redux/reducer";
import TodoItem from "./TodoItem";

const mapStateToProps = (state: any) => {
  return {
    todos: state,
  };
};

const mapDispatchToProps = (dispatch: (arg0: { payload: any; type: string; }) => any) => {
  return {
    addTodo: (obj: any) => dispatch(addTodos(obj)),
    removeTodo: (id: any) => dispatch(removeTodos(id)),
    updateTodo: (obj: any) => dispatch(updateTodos(obj)),
    completeTodo: (id: any) => dispatch(completeTodos(id)),
  };
};

const DisplayTodos = (props: { todos: any[]; removeTodo: any; updateTodo: any; completeTodo: any; }) => {
  const [sort, setSort] = useState("active");
  return (
    <div className="displaytodos">
      <div className="buttons">
    
        <button
       className="active-btn btn"
          onClick={() => setSort("active")}
        >
          Active
        </button>

        <button
          className="complete-btn btn"
          onClick={() => setSort("completed")}
        >
          Completed
        </button>

        <button
          className="all-btn btn"
          onClick={() => setSort("all")}
        >
          All
        </button>

      </div>

          {props.todos.length > 0 && sort === "active"
            ? props.todos.map((item: { completed: boolean; id: any; }) => {
                return (
                  item.completed === false && (
           
                    <TodoItem
                      key={item.id}
                      item={item}
                      removeTodo={props.removeTodo}
                      updateTodo={props.updateTodo}
                      completeTodo={props.completeTodo}
                    />
                        
                  )
                );
              })
            : null}
          {props.todos.length > 0 && sort === "completed"
            ? props.todos.map((item: { completed: boolean; id: any; }) => {
                return (
                  item.completed === true && (
                    <TodoItem
                      key={item.id}
                      item={item}
                      removeTodo={props.removeTodo}
                      updateTodo={props.updateTodo}
                      completeTodo={props.completeTodo}
                    />
                  )
                );
              })
            : null}
          {props.todos.length > 0 && sort === "all"
            ? props.todos.map((item: { id: any; }) => {
                return (
                  <TodoItem
                    key={item.id}
                    item={item}
                    removeTodo={props.removeTodo}
                    updateTodo={props.updateTodo}
                    completeTodo={props.completeTodo}
                  />
                );
              })
            : null}
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayTodos);
