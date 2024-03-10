import React, { useEffect, useState } from "react";
import CreateTask from "../modals/CreateTask";
import Card from "./Card";
import Filter from "./Filter";

const TodoList = () => {
  const [modal, setModal] = useState(false);
  const [taskList, setTaskList] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [sortByPriority, setSortByPriority] = useState(false);
  const [nextId, setNextId] = useState(1);

  // Mengambil daftar tugas dari penyimpanan lokal saat komponen dimuat
  useEffect(() => {
    let arr = localStorage.getItem("taskList");
    if (arr) {
      let obj = JSON.parse(arr);
      setTaskList(obj);
      setFilteredTasks(obj);
      setNextId(obj.length + 1);
    }
  }, []);

  // Fungsi untuk menghapus tugas dari daftar tugas
  const deleteTask = (id) => {
    let tempList = [...taskList];
    tempList = tempList.filter((task) => task.id !== id);
    localStorage.setItem("taskList", JSON.stringify(tempList));
    setTaskList(tempList);
    setFilteredTasks(tempList);
  };

  // Fungsi untuk memperbarui tugas dalam daftar tugas
  const updateListArray = (obj) => {
    let tempList = [...taskList];
    const index = tempList.findIndex((task) => task.id === obj.id);
    if (index !== -1) {
      tempList[index] = obj;
      localStorage.setItem("taskList", JSON.stringify(tempList));
      setTaskList(tempList);
      setFilteredTasks(tempList);
    }
  };

  // Fungsi untuk menampilkan atau menyembunyikan modal
  const toggle = () => {
    setModal(!modal);
  };

  // Fungsi untuk menyimpan tugas baru ke dalam daftar tugas
  const saveTask = (taskObj) => {
    const newTask = { ...taskObj, id: nextId };
    let tempList = [...taskList];
    tempList.push(newTask);
    localStorage.setItem("taskList", JSON.stringify(tempList));
    setTaskList(tempList);
    setFilteredTasks(tempList);
    setNextId(nextId + 1);
    setModal(false);
  };

  // Fungsi untuk melakukan filter tugas berdasarkan status selesai atau belum selesai
  const handleFilter = (completed) => {
    if (completed) {
      const completedTasks = taskList.filter((task) => task.completed);
      setFilteredTasks(completedTasks);
    } else {
      const uncompletedTasks = taskList.filter((task) => !task.completed);
      setFilteredTasks(uncompletedTasks);
    }
  };

  // Fungsi untuk melakukan pengurutan tugas berdasarkan prioritas
  const handleSort = () => {
    setSortByPriority(!sortByPriority);
    const sortedTasks = [...filteredTasks].sort((a, b) => {
      if (a.priority !== b.priority) {
        return a.priority ? -1 : 1;
      } else {
        return a.id - b.id;
      }
    });
    setFilteredTasks(sortedTasks);
  };

  return (
    <>
      <div className="header">
        <h3>Todo List</h3>
        <button className="button-create-task" onClick={() => setModal(true)}>
          Create Task
        </button>
      </div>

      {/* Container untuk filter tugas */}
      <div className="filter-container">
        <Filter handleFilter={handleFilter} handleSort={handleSort} />
      </div>

      {/* Container untuk daftar tugas */}
      <div className="task-container">
        {filteredTasks &&
          filteredTasks.map((obj) => (
            <Card
              key={obj.id}
              taskObj={obj}
              deleteTask={deleteTask}
              updateListArray={updateListArray}
            />
          ))}
      </div>

      {/* Modal untuk membuat tugas baru */}
      <CreateTask toggle={toggle} modal={modal} save={saveTask} />
    </>
  );
};

export default TodoList;
