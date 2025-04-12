import deleteBtn from "../assets/delete.svg";
import { useState } from "react";
import axios from "axios";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function Task({ task, date, selectedProject, updateData, handleClick }) {
  const id = task.id;
  const [isHovered, setIsHovered] = useState(false);
  const [isChecked, setIsChecked] = useState(task.checked);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  function removeFromData() {
    updateData((prevData) => {
      const newData = prevData.map((project) => {
        if (project.id === selectedProject) {
          const newTaskList = project.tasks.filter((task) => task.id !== id);
          return { ...project, tasks: newTaskList };
        } else return project;
      });

      return newData;
    });
  }

  async function handleChange() {
    setIsChecked(!isChecked);
    const changedTask = { ...task, checked: !isChecked };
    await axios.put(`http://localhost:3000/tasks/${task.id}`, changedTask);
  }

  async function deleteTask() {
    await axios.delete(`http://localhost:3000/tasks/${task.id}`);

    removeFromData();
  }

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <li
      className="task"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
    >
      <input type="checkbox" checked={isChecked} onChange={handleChange} />
      <div className="task-info" onClick={handleClick}>
        <p className="task-title" id={task.priority}>
          {task.title}
        </p>
        <p className="task-description">{task.description}</p>
        <p className="task-date">{date}</p>
      </div>
      <button
        className="delete-task-btn"
        hidden={!isHovered}
        onClick={deleteTask}
      >
        <img className="delete-task-btn-img" src={deleteBtn} />
      </button>
    </li>
  );
}

export default Task;
