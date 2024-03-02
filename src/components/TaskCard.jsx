import React from 'react'
import axios from "axios";
import { useState, useEffect } from "react";
import { useUser } from "../contexts/UserContext";
import { Check } from './Icons';
import { useDrag } from 'react-dnd';


const TaskCard = ({task, handleUpdateDone, index}) => {
  const baseURL = import.meta.env.VITE_URL;
  const { currentUser, setCurrentUser } = useUser();

  // useEffect(() => {
  //   fetchTasks();
  // }, []);

  // const fetchTasks = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${baseURL}/getToDo/${task.id}/?userId=${currentUser.userId}`
  //     );
  //     // console.log(response.data)
  //     setTasks(response.data);
  //   } catch (error) {
  //     console.error("Error fetching tasks:", error);
  //   }
  // };

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: {id: task.id},
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  // console.log(isDragging)

  return (
    <li
    ref = {drag}
      key={index}
      className={`bg-white rounded-lg h-[2rem] flex items-center ${isDragging ? "opacity-50" : ""} px-1 gap-2 cursor-grab`}
    >
      <button onClick={() => handleUpdateDone(task)}>
        <div className={`bg-red-200 h-5 w-5 rounded-sm`}>
          {task.done && <Check />}
        </div>
      </button>
      <p onClick={() => handleUpdateDone(task)}>{task.task}</p>
    </li>
  );
}

export default TaskCard;