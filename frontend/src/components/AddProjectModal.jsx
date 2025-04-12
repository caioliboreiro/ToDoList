import closeBtn from "../assets/close.svg";
import axios from "axios";
import { useState } from "react";

function AddProjectModal(props) {
  const [projectName, setProjectName] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const result = await axios.post(
      `http://localhost:3000/users/${props.user.id}/projects`,
      {
        projectName,
      }
    );
    setProjectName("");
    const newProject = { ...result.data.project, tasks: [] };
    props.updateData([...props.data, newProject]);
    props.ref.current.close();
  }

  return (
    <dialog className="add-project-modal" ref={props.ref}>
      <div className="modal-content">
        <div className="modal-top">
          <span className="modal-heading">Add a Project</span>
          <img
            className="close-add-project-btn"
            onClick={() => props.ref.current.close()}
            src={closeBtn}
            alt=""
          />
        </div>
        <form
          onSubmit={handleSubmit}
          method="POST"
          className="main-content-add-project-modal"
        >
          <label htmlFor="new-project-name">Name</label>
          <input
            type="text"
            autoComplete="off"
            name="newProjectName"
            value={projectName}
            id="new-project-name"
            onChange={(e) => setProjectName(e.target.value)}
          />
          <button type="submit" className="submit-project-btn">
            Add Project
          </button>
        </form>
      </div>
    </dialog>
  );
}

export default AddProjectModal;
