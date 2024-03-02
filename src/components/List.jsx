import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Check, PlusSmall, Delete } from "./Icons";
import AddModal from "../Modals/AddModal";
import DeleteModal from "../Modals/DeleteModal";
import TaskCard from "./TaskCard";
import { useUser } from "../contexts/UserContext";
import { useDrop } from "react-dnd";

const List = ({ listName, listId, fetchLists }) => {
  const baseURL = import.meta.env.VITE_API_BASE_URLRL;
  const { currentUser, setCurrentUser } = useUser();
  const { isDrop, setIsDrop} = useUser();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks(listId);
  }, [isDrop === true]);

  useEffect(() => {
    setIsDrop(false);
  },[isDrop === true])

  const fetchTasks = async (listId) => {
    try {
      const response = await axios.get(
        `${baseURL}/getToDo/${listId}/?userId=${currentUser.userId}`
      );
      // console.log(response.data)
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleAddTodo = async (taskData) => {
    console.log(taskData);
    try {
      await axios.post(`${baseURL}/newToDo`, taskData);
      // Fetch tasks again after adding a new todo
      fetchTasks(listId);
    } catch (error) {
      console.error("Error adding todo:", error);
      // console.log(error.response.data.error);
    }
  };

  const handleUpdateDone = async (task) => {
    const data = await fetchTaskOne(task.id);
    // console.log(data);
    try {
      // console.log(task);
      const response = await axios.post(`${baseURL}/updateTodo`, {
        id: task.id,
        task: task.task,
        done: !data.task.done,
        listId: listId,
      });
      console.log("Update successful:", response.data);

      fetchTasks(listId);
      handleDeleteTask(task);
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleUpdateTaskList = async (id) => {
    const data = await fetchTaskOne(id);
    console.log("new list id", listId);
    // console.log(data.task.listId)
    try {
      // console.log(task);
      const response = await axios.post(`${baseURL}/updateTodo`, {
        id: id,
        task: data.task.task,
        done: data.task.done,
        listId: listId,
      });
      console.log("Update in list of the task successful:", response.data);

      setIsDrop(true);

      fetchTasks(listId);
    } catch (error) {
      console.error("Error updating list of the task:", error);
    }
  };

  const fetchTaskOne = async (taskId) => {
    try {
      const response = await axios.get(`${baseURL}/getTask/${taskId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching task:", error);
    }
  };

  const handleDeleteTask = async (task) => {
    // console.log(id)
    try {
      const response = await axios.delete(`${baseURL}/deleteToDo/${task.id}`);
      console.log("delete successful:", response.data);
      // fetchTasks(listId);
    } catch (error) {
      console.error("Error deleting the task:", error);
    }
  };

  const handleDeleteList = async () => {
    // console.log(id)
    try {
      const response = await axios.delete(`${baseURL}/list/deleteList/${listId}`);
      console.log("delete successful:", response.data);
      fetchLists();
    } catch (error) {
      console.error("Error deleting the list:", error);
    }
  };

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item) => {
      addItemToList(item.id);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  // console.log(isOver)

  const addItemToList = (id) => {
    handleUpdateTaskList(id);
    console.log("dropped", id, listId);
  };

  return (
    <>
      <div
        ref={drop}
        className="bg-gray-200 min-h-[30rem] w-[22rem] flex flex-col border-2 border-gray-400"
        style={{ backgroundColor: "#E7E7E7" }}
      >
        <div className="group">
          <div
            className="bg-gray-400 text-center py-2 text-lg group-hover:hidden"
            style={{
              backgroundColor: "#D9D9D9",
              borderBottom: "1px solid grey",
            }}
          >
            {listName}
          </div>
          <div
            className="bg-gray-400 text-center py-2 text-lg  hidden group-hover:flex justify-between"
            style={{ backgroundColor: "#D9D9D9" }}
          >
            <div></div>
            <div className="flex gap-4 px-2 py-[0.13rem]">
              <button onClick={() => setIsAddModalOpen(true)}>
                <PlusSmall />
              </button>
              <button onClick={() => setIsDeleteModalOpen(true)}>
                <Delete />
              </button>
            </div>
          </div>
        </div>
        <div>
          <ul className="flex flex-col gap-4 px-[0.2rem] pt-4">
            {tasks.map((task, index) => (
              <div key={index}>
                <TaskCard
                  handleUpdateDone={handleUpdateDone}
                  task={task}
                  index={index}
                />
              </div>
            ))}
          </ul>
        </div>
      </div>
      <AddModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        handleSubmit={handleAddTodo}
        listId={listId}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        handleDelete={() => handleDeleteList()}
      />
    </>
  );
};

export default List;
