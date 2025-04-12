import deleteBtn from "../assets/delete.svg";
import editBtn from "../assets/edit.svg";
import confirmBtn from "../assets/confirm.svg";
import { useState, useRef } from "react";
import axios from "axios";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function Project({ id, data, updateData, name, isSelected, changeSelected }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isBeingEditted, setIsBeingEditted] = useState(false);
  const [inputValue, setInputValue] = useState(name);
  const inputRef = useRef(null);
  let wasDeleted = useRef(false);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  function deleteProject() {
    axios.delete(`http://localhost:3000/projects/${id}`);
    updateData((prevData) => prevData.filter((project) => project.id !== id));
    wasDeleted.current = true;
    changeSelected(data[0].id);
  }

  function handleChange(e) {
    setInputValue(e.target.value);
  }

  function handleClick() {
    if (isBeingEditted) {
      if (inputValue !== name) {
        axios.put(`http://localhost:3000/projects/${id}`, {
          name: inputValue,
        });
      }
    } else {
      inputRef.current.focus();
    }
    setIsBeingEditted(!isBeingEditted);
  }

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <>
      <div
        onClick={() => {
          !wasDeleted.current && changeSelected(id);
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="project-container"
        id={isSelected ? "selected" : ""}
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={style}
      >
        <input
          readOnly={!isBeingEditted}
          value={inputValue}
          onChange={handleChange}
          ref={inputRef}
          style={isBeingEditted ? { color: "#a970ff" } : { color: "inherit" }}
        />
        <button
          className="delete-project-btn"
          hidden={!isHovered}
          onClick={deleteProject}
        >
          <img className="delete-project-btn-img" src={deleteBtn} />
        </button>
        <button
          className="edit-project-btn"
          hidden={!isHovered}
          onClick={handleClick}
        >
          <img
            className="edit-project-btn-img"
            src={isBeingEditted ? confirmBtn : editBtn}
          />
        </button>
      </div>
    </>
  );
}

export default Project;
