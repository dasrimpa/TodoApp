import axios from "axios"
import React, { useEffect, useState } from "react"
import Api from "../../../Api"
import { Todo } from "../../../Interface/Todo.interface"

const Fetch = () => {

  const [data, setData] = useState([])

  useEffect(() => {
    const getDAta= async()=>{
      const response=await Api.get(`/todo`)
      .then(response => setData(response.data))
   console.log(data)
    }
    
  }, [])

  const renderTable = () => {
    return data.map((todo: Todo) => {
      return (
        <tr>
          <td>{todo.title}</td>
        </tr>
      )
    })
  }

  return (
    <div>
      <h1 id="title">Todo List</h1>
      <table id="users"> 
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>{renderTable()}</tbody>
      </table>
    </div>
  )
}
export default Fetch;