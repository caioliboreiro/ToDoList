import closeBtn from "../assets/close.svg";
import axios from "axios";

function AddTaskModal(props) {
  function addTaskToData(newTask) {
    props.updateData((prevData) => {
      const newData = prevData.map((project) => {
        if (project.id === newTask.projectId) {
          const newTaskList = [...project.tasks, newTask];
          return { ...project, tasks: newTaskList };
        } else return project;
      });

      return newData;
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const formEl = e.currentTarget;
    const formData = new FormData(formEl);

    let date = formData.get("date");
    if (!formData.get("date")) {
      date = new Date();
    }

    const newTask = {
      checked: false,
      title: formData.get("title"),
      description: formData.get("description"),
      date: date,
      priority: formData.get("priority"),
      projectId: formData.get("project"),
    };

    const result = await axios.post(
      `http://localhost:3000/projects/${formData.get("project")}/tasks`,
      newTask
    );
    formEl.reset();
    props.addModalRef.current.close();

    addTaskToData(result.data.task);
  }

  return (
    <dialog ref={props.ref} className="add-task-modal">
      <div className="modal-content">
        <div className="modal-top">
          <span className="modal-heading">Add a Task</span>
          <img
            className="close-add-task-btn"
            src={closeBtn}
            alt=""
            onClick={() => props.ref.current.close()}
          />
        </div>

        <form onSubmit={handleSubmit} className="main-content-add-task-modal">
          <input
            type="text"
            autoComplete="off"
            name="title"
            id="task-title-input"
            placeholder="Task Title"
          />

          <input
            type="text"
            autoComplete="off"
            name="description"
            id="task-desc-input"
            placeholder="Description"
          />

          <div className="date-priority-wrapper">
            <div className="due-date-input-wrapper">
              <label htmlFor="due-date-input">Due Date</label>
              <input
                type="date"
                name="date"
                id="add-due-date-input"
                placeholder="mm/dd/yyyy"
              />
            </div>

            <div className="priority-input-wrapper">
              <label htmlFor="priority-input">Priority</label>
              <select name="priority" id="priority-input">
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
          </div>

          <div className="project-input-wrapper">
            <label htmlFor="project-input">Project</label>
            <select
              name="project"
              id="project-input"
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

          <button className="submit-task-btn">Add Task</button>
        </form>
      </div>
    </dialog>
  );
}

export default AddTaskModal;
