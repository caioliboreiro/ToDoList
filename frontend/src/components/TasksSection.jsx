import { useRef, useState, useEffect } from "react";
import Task from "./Task";
import AddTaskModal from "./AddTaskModal";
import EditTaskModal from "./EditTaskModal";
import { formatTaskDate } from "../utils/dateUtils";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

function TasksSection(props) {
  const addModalRef = useRef(null);
  const editModalRef = useRef(null);
  const [taskClicked, setTaskClicked] = useState(null);
  const [selectValue, setSelectValue] = useState(props.selectedProject);

  useEffect(() => {
    setSelectValue(props.selectedProject);
  }, [props.selectedProject]);

  const projects = props.data.map((project) => {
    const { id, name } = project;
    return { id, name };
  });

  useEffect(() => {
    if (taskClicked && editModalRef.current) {
      editModalRef.current.showModal();
    }
  }, [taskClicked]);

  const sortedTaskList = props.tasks.sort((a, b) => a.position - b.position);

  const taskList = sortedTaskList.map((task) => {
    return (
      <Task
        key={task.id}
        task={task}
        date={formatTaskDate(task.date)}
        selectedProject={props.selectedProject}
        updateData={props.updateData}
        handleClick={() => setTaskClicked(task)}
      />
    );
  });

  return (
    <>
      <AddTaskModal
        ref={addModalRef}
        selectedProject={props.selectedProject}
        selectValue={selectValue}
        setSelectValue={setSelectValue}
        projects={projects}
        data={props.data}
        updateData={props.updateData}
        addModalRef={addModalRef}
      />
      {taskClicked && (
        <EditTaskModal
          user={props.user}
          ref={editModalRef}
          selectValue={selectValue}
          setSelectValue={setSelectValue}
          task={taskClicked}
          changeTask={setTaskClicked}
          projects={projects}
          data={props.data}
          updateData={props.updateData}
          editModalRef={editModalRef}
        />
      )}
      <section className="tasks-section">
        <div className="tasks-wrapper">
          <ul className="task-list">
            <SortableContext
              items={props.tasks}
              strategy={verticalListSortingStrategy}
            >
              {taskList}
            </SortableContext>
          </ul>
          <div
            className="add-task-wrapper"
            onClick={() => addModalRef.current.showModal()}
          >
            <button className="add-task-btn">+</button>
            <span className="add-task-label">Add a Task</span>
          </div>
        </div>
      </section>
    </>
  );
}

export default TasksSection;
