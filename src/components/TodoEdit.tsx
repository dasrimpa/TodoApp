import { match } from 'assert'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { updateTodos } from '../redux/reducer'

export const TodoEdit = (item:any) => {
  const { id } = useParams();
  const todoedit =useSelector((state: any) => state);
  let number = "321";
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
            <h1 className="text-center">No Contact Found</h1>
          )}
      
        </div>
    </div>
  )
}
