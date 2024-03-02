import React from "react";
import { useState, useEffect } from "react";
import List from "./List";
import axios from "axios";
import AddList from "./AddList";
import { useUser } from "../contexts/UserContext";
import Header from "./Header";


const Home = () => {
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const { currentUser, setCurrentUser } = useUser();

  const [lists, setLists] = useState([]);
  

  // const handleAddList = () => {
  //   // setLists([...lists, <List key={lists.length} />]);
  //   const newList = {
  //     name: `List ${lists.length + 1}`, // Generate a unique name
  //     component: <List key={lists.length} name={`List ${lists.length + 1}`} />, // Pass name as prop to List
  //   };
  //   setLists([...lists, newList]);
  // };

  const handleAddList = async () => {
    try {
      const response = await axios.post(
        `${baseURL}/list/newList/${currentUser.userId}`
      );
      const newList = response.data;

      // Update the state with the new list received from the backend
      setLists([...lists, newList]);
    } catch (error) {
      console.error("Error creating new list:", error);
    }
  };

  useEffect(() => {
    fetchLists();
  }, []);

  const fetchLists = async () => {
    try {
      const response = await axios.get(
        `${baseURL}/list/getList/?userId=${currentUser.userId}`
      );
      // console.log(response.data)
      setLists(response.data);
    } catch (error) {
      console.error("Error fetching lists:", error);
    }
  };

  return (
    <>
      <div
        className="pt-[44px]"
        style={{ display: "inline-block", minWidth: "100vw" }}
      >
        <div
          className="px-12 flex gap-14 bg-gray-100 pt-4"
          style={{ backgroundColor: "#F9F9F9" }}
        >
          {lists.map((list) => (
            <List key={list.id} listName={list.name} listId={list.id} fetchLists={fetchLists} />
          ))}
          <AddList onAdd={handleAddList} />
        </div>
      </div>
    </>
  );
};

export default Home;
