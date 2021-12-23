import { match } from 'assert'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { updateTodos } from '../redux/reducer'
import { connect } from "react-redux";
const mapStateToProps = (state: any) => {
  return {
    todos: state,
  };
};
const mapDispatchToProps = (dispatch: (arg0: { payload: any; type: string; }) => any) => {
  return {
    updateTodo: (obj: any) => dispatch(updateTodos(obj)),
  };
};

const TodoEdit =(props: { updateTodo: (arg0: { id: number; item: string; completed: boolean; }) => void; todos: any[]; })=> {
  const { id } = useParams();
  const todoedit =useSelector((state: any) => state.todos.value);
  const currenttodo = item.find((item: { id: any })=>item.id ===parseInt({id}))

  const [todo, setTodo] = useState(item.id)

  const dispatch = useDispatch()
  const history = useNavigate()

  const onTitleChanged = (e: { target: { value: any } }) => setTodo(e.target.value)

  const onSavePostClicked = () => {
    if (todo) {
      dispatch(updateTodos({ id,item }))
      history(`/TodoList/${item.id}`)
    }
  }

  return (
    <div>
      <div>
      {
        currenttodo?(
      <><form>
              <input
                type="text"
                value={id}
                onChange={onTitleChanged} />
            </form><button type="button" onClick={onSavePostClicked}>
                Add
              </button></>
     
        ): 
          (
            <h1 className="text-center">No todo Found</h1>
          )}
      
        </div>
    </div>
  )
}
export default connect(mapStateToProps, mapDispatchToProps)(TodoEdit);