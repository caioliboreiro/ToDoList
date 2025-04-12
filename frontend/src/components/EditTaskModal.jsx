import { useState } from "react";
import closeBtn from "../assets/close.svg";
import { formatTaskDate, toISO } from "../utils/dateUtils";
import axios from "axios";

function EditTaskModal(props) {
  const [titleValue, setTitleValue] = useState(props.task.title);
  const [descValue, setDescValue] = useState(props.task.description);
  const [dateValue, setDateValue] = useState(
    toISO(formatTaskDate(props.task.date))
  );
  const [priorityValue, setPriorityValue] = useState(props.task.priority);

  async function editData() {
    const data = await fetch(
      `http://localhost:3000/users/${props.user.id}/projectsTasks`
    ).then((res) => res.json());
    props.updateData(data);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const formEl = e.currentTarget;
    const formData = new FormData(formEl);

    const changedTask = {
      title: formData.get("title"),
      description: formData.get("desc"),
      date: formData.get("date"),
      priority: formData.get("priority"),
      projectId: formData.get("project"),
    };

    console.log(changedTask.projectId);
    await axios.put(
      `http://localhost:3000/tasks/${props.task.id}`,
      changedTask
    );
    props.editModalRef.current.close();

    editData();
  }

  return (
    <dialog
      className="edit-modal"
      ref={props.ref}
      onClose={() => {
        props.changeTask(null);
      }}
    >
      <div className="modal-content">
        <div className="modal-top">
          <span className="edit-modal-heading">Edit a Task</span>
          <img
            className="close-edit-task-btn"
            src={closeBtn}
            alt=""
            onClick={() => props.ref.current.close()}
          />
        </div>
        <form onSubmit={handleSubmit} className="main-content-edit-modal">
          <section className="edit-modal-name-desc-section">
            <div className="task-name-wrapper">
              <input
                className="edit-modal-task-name"
                type="text"
                autoComplete="off"
                onChange={(e) => setTitleValue(e.target.value)}
                value={titleValue}
                name="title"
              />
            </div>
            <div className="task-name-wrapper">
              <input
                className="edit-modal-task-desc"
                type="text"
                autoComplete="off"
                onChange={(e) => setDescValue(e.target.value)}
                value={descValue}
                name="desc"
              />
            </div>
          </section>
          <aside className="edit-date-priority">
            <div className="project-input-wrapper">
              <label htmlFor="project-input">Project</label>
              <select
                name="project"
                id="edit-project-input"
                value={props.selectValue}
                onChange={(e) => props.setSelectValue(e.target.value)}
              >
                {props.projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="due-date-input-wrapper">
              <label htmlFor="due-date-Input">Due Date</label>
              <input
                type="date"
                name="date"
                id="add-due-date-input"
                placeholder="mm/dd/yyyy"
                onChange={(e) => setDateValue(e.target.value)}
                value={dateValue}
              />
            </div>
            <div className="priority-input-wrapper">
              <label htmlFor="priority-input">Priority</label>
              <select
                name="priority"
                id="edit-priority-input"
                value={priorityValue}
                onChange={(e) => setPriorityValue(e.target.value)}
              >
                <option className="high-option" value="High">
                  High
                </option>
                <option className="medium-option" value="Medium">
                  Medium
                </option>
                <option className="low-option" value="Low">
                  Low
                </option>
              </select>
            </div>
            <button type="submit" className="edit-task-btn">
              Edit Task
            </button>
          </aside>
        </form>
      </div>
    </dialog>
  );
}

export default EditTaskModal;
