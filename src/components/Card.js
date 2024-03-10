import React, { useState } from "react";
import EditTask from "../modals/EditTask";

// Define colors variable
const colors = [
  {
    primaryColor: "#5D93E1",
    secondaryColor: "#ECF3FC",
  },
  {
    primaryColor: "#F9D288",
    secondaryColor: "#FEFAF1",
  },
  {
    primaryColor: "#5DC250",
    secondaryColor: "#F2FAF1",
  },
  {
    primaryColor: "#F48687",
    secondaryColor: "#FDF1F1",
  },
  {
    primaryColor: "#B964F7",
    secondaryColor: "#F3F0FD",
  },
];

const Card = ({ taskObj, deleteTask, updateListArray }) => {
  const [modal, setModal] = useState(false);
  const [completed, setCompleted] = useState(taskObj.completed);
  const [isPriority, setIsPriority] = useState(taskObj.priority); // Tambah state untuk menandai prioritas

  const toggle = () => {
    setModal(!modal);
  };

  const updateTask = (obj) => {
    updateListArray(obj);
  };

  const handleDelete = () => {
    deleteTask(taskObj.id);
  };

  const handleCheckboxChange = () => {
    setCompleted(!completed);
    const updatedTask = { ...taskObj, completed: !completed };
    updateListArray(updatedTask);
  };

  const handleStarClick = () => {
    setIsPriority(!isPriority); // Balikkan status prioritas
    const updatedTask = { ...taskObj, priority: !isPriority }; // Perbarui status prioritas dalam objek tugas
    updateListArray(updatedTask);
  };

  const getCardColor = () => {
    const id = taskObj.id % 5; // Menggunakan id tugas untuk menentukan indeks warna
    return colors[id];
  };

  const renderStar = () => {
    if (isPriority) {
      return (
        <i
          className="fas fa-star"
          style={{ color: "yellow", marginRight: "5px" }}
          onClick={handleStarClick} // Tambahkan event handler untuk mengubah status prioritas saat tanda bintang diklik
        ></i>
      );
    } else {
      return (
        <i
          className="far fa-star"
          style={{ color: "gray", marginRight: "5px" }}
          onClick={handleStarClick} // Tambahkan event handler untuk mengubah status prioritas saat tanda bintang diklik
        ></i>
      );
    }
  };

  return (
    <div className="card-wrapper">
      <div
        className="card-top"
        style={{ backgroundColor: getCardColor().primaryColor }}
      ></div>
      <div className="task-holder">
        <span
          className="card-header"
          style={{
            borderRadius: "10px",
            textDecoration: completed ? "line-through" : "none",
          }}
        >
          {renderStar()}
          {taskObj.Name}
        </span>
        <div>
          <p className="task-description">{taskObj.Description}</p>
        </div>
        <div className="card-bottom">
          <label>
            <input
              type="checkbox"
              checked={completed}
              onChange={handleCheckboxChange}
              style={{ marginRight: "5px" }}
            />
            {completed ? "Selesai" : "Belum Selesai"}
          </label>
          <div>
            <i
              className="far fa-edit"
              style={{
                color: getCardColor().primaryColor,
                cursor: "pointer",
              }}
              onClick={() => setModal(true)}
            ></i>
            <i
              className="fas fa-trash-alt"
              style={{
                color: getCardColor().primaryColor,
                cursor: "pointer",
              }}
              onClick={handleDelete}
            ></i>
          </div>
        </div>
      </div>

      <EditTask
        modal={modal}
        toggle={toggle}
        updateTask={updateTask}
        taskObj={taskObj}
      />
    </div>
  );
};

export default Card;
