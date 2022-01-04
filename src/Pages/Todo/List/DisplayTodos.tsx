import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Todo } from "../../../Interface/Todo.interface";
import { RootState } from "../../../redux/store";
import todoReducer, { addTodoActions} from "../../../redux/todo-reducer";
import { BiEdit } from "react-icons/bi";
import { BsFillArchiveFill } from "react-icons/bs";
import Api from "../../../Api";

const DisplayTodos = ({ todos }: { 
  todos: Todo[];
}) => {
  const [sort, setSort] = useState("active");
  const [data, setData] = useState<Todo[]>([]);

  // const dispatch = useDispatch();
  // const deleteTodo = React.useCallback(
  //   (todo) => dispatch(addTodoActions.removeTodo(todo)),
  //   [dispatch, removeTodo]
  // );

  async function fetchData() {
    try {
      const response = await Api.get(`/classes/todo`)
      console.log(response.data.results);
      console.log("success");
      const result=response.data.results;
      setData(result);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

const deleteTodo =async (objectId: string) => {

  try{
  await Api.delete(`/classes/todo/${objectId}`);
  const filteredItems = data.filter((todo => todo.objectId !== objectId));
  setData(filteredItems);
  }
  catch (error) {
    console.log(error)
  }
};

  const renderTable = () => {
    return data.map((todo: Todo) => {
      return (
        <tr key={todo.objectId}>
          <td>{todo.objectId}</td>
          <td>{todo.title}</td>
          <td><Link to={`/todo/edit/${todo.objectId}`}><BiEdit className="edit-btn"/></Link></td>
          <td><button onClick={() => deleteTodo(String(todo.objectId))}><BsFillArchiveFill className="delete-btn"/></button></td>
        </tr>
      )
    })
  }
  
  return (
    <div className="displaytodos">
    <Link to="/todo/create"><button type="button" className="btn btn-outline-primary list-btn">Add Todo</button></Link>
    <h2>Todo List</h2>
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

      <table className="table container table-striped table-hover">
  <thead className="table-dark">
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Edit Item</th>
      <th scope="col">Delete Item</th>
    </tr>
  </thead>
  <tbody>
  {renderTable()}
  </tbody>
</table>

     {/* {
       data.map((todo: Todo) => {
        return (
          <div className="d-flex justify-content-center">
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
     } */}
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    todos: state.todos,
  };
};

export default connect(mapStateToProps)(DisplayTodos);


