import { React, useState, useRef } from "react";
import { useUser } from "../contexts/UserContext";

const AddModal = ({ isOpen, onClose, handleSubmit, listId }) => {
  const { currentUser, setCurrentUser } = useUser();

  const [inputTask, setInputTask] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const handleChangeTask = (e) => {
    const { name, value } = e.target;
    setInputTask(value);
  };

  const inputData = {
    task: inputTask,
    done: done,
    listId: listId,
    userId: currentUser.userId,
  };

  const handleCombinedClick = (e) => {
    handleSubmit(inputData);
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Foggy background */}
          <div className="fixed inset-0 bg-gray-800 opacity-60"></div>

          {/* Modal content */}
          <div className="bg-gray-600 p-8 rounded-xl text-lg font-semibold shadow-md z-10 text-white sm:w-1/3 sm:h-[38%] flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <p>What do you want to do?</p>
              <div className="border-2 rounded-xl">
                <textarea
                  type="text"
                  className="h-[5rem] px-2 py-2 bg-transparent w-full outline-none overflow-y-hidden text-base"
                  name="task"
                  onChange={handleChangeTask}
                ></textarea>
              </div>
            </div>

            <div className="flex gap-2">
              <div>
                <button
                  id="save"
                  className={`mt-4 p-2 text-white rounded-md bg-gray-400 hover:bg-gray-800`}
                  onClick={handleCombinedClick}
                  style={{ backgroundColor: "#D9D9D9" }}
                >
                  Save Todo
                </button>
              </div>
              <div>
                <button
                  className="mt-4 p-2 bg-transparent text-white rounded-md"
                  onClick={onClose}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddModal;
