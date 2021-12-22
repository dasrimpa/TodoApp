import React from "react";
import { AiFillEdit } from "react-icons/ai";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import {BsFillArchiveFill} from "react-icons/bs";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const TodoItem = (props: { item: any; updateTodo: any; removeTodo: any; completeTodo: any; }) => {
  const todoedit =useSelector((state: any) => state);
  const { item, removeTodo, completeTodo } = props;

  return (
    <div className="display">
      <input
      className="text-section"
        defaultValue={item.item}
      />
      <div className="btns">
        <div className="edit-btn">
         <Link to={`/todoedit/${item.id}`}> <AiFillEdit /></Link>
        </div>

        <div className="comp-btn"
         style={{ color: "green" }}
         onClick={() => completeTodo(item.id)}>
        {item.completed === false && (
         
            <IoCheckmarkDoneSharp />
        )}
        </div>
        <div className="delete-btn"
         style={{ color: "red" }}
         onClick={() => removeTodo(item.id)} >
          <BsFillArchiveFill />
        
        </div>

      </div>
    
      {item.completed && <span className="completed">done</span>}
      </div>
  );
};

export default TodoItem;