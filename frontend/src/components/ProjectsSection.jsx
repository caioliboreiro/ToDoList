import addProjectBtn from "../assets/add.svg";
import Project from "./Project";
import AddProjectModal from "./AddProjectModal";
import { useRef } from "react";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useNavigate } from "react-router-dom";

function ProjectsSection(props) {
  const navigate = useNavigate();
  const dialogRef = useRef(null);

  if (!props.data) {
    return;
  }

  const projectsList = props.data.map((project) => {
    return (
      <Project
        id={project.id}
        data={props.data}
        updateData={props.updateData}
        key={project.id}
        name={project.name}
        isSelected={project.id === props.selected ? true : false}
        changeSelected={props.changeSelected}
      />
    );
  });

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  }

  return (
    <>
      <AddProjectModal
        user={props.user}
        data={props.data}
        updateData={props.updateData}
        ref={dialogRef}
      />
      <aside className="projects-section">
        <span className="user-section">
          {props.user.first} {props.user.last}
          <button onClick={handleLogout} className="logout-btn">
            Log Out
          </button>
        </span>
        <span className="projects-header">
          <h3>My Projects</h3>
          <button
            className="add-project-btn"
            onClick={() => {
              dialogRef.current.showModal();
            }}
          >
            <img src={addProjectBtn} alt="" />
          </button>
        </span>
        <div className="user-projects">
          <SortableContext
            items={props.data}
            strategy={verticalListSortingStrategy}
          >
            {projectsList}
          </SortableContext>
        </div>
      </aside>
    </>
  );
}

export default ProjectsSection;
