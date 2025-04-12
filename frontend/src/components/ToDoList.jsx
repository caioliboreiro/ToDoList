import { useState, useEffect } from "react";
import ProjectsSection from "./ProjectsSection";
import TasksSection from "./TasksSection";
import {
  closestCorners,
  DndContext,
  MouseSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import axios from "axios";

function ToDoList() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [data, setData] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const mouseSensor = useSensor(MouseSensor, {
    // Require the mouse to move by 10 pixels before activating
    activationConstraint: {
      distance: 10,
    },
  });

  const sensors = useSensors(mouseSensor);

  useEffect(() => {
    async function loadData() {
      const data = await fetch(
        `http://localhost:3000/users/${user.id}/projectsTasks`
      ).then((res) => res.json());
      setData(data);

      if (data.length > 0) {
        setSelectedProject(data[0].id);
      }
    }

    loadData();
  }, [user.id]);

  // Derived variables
  let indexSelectedProject = 0;
  if (data.length > 0) {
    indexSelectedProject = findIndexSelected();
  }

  function findIndexSelected() {
    let count = 0;
    for (let project of data) {
      if (project.id == selectedProject) {
        return count;
      }
      count++;
    }
  }

  function findProjectIndex(id) {
    return data.findIndex((project) => project.id === id);
  }

  function findTaskIndex(id, taskList) {
    return taskList.findIndex((task) => task.id === id);
  }

  function handleDragEndProject(event) {
    const { active, over } = event;

    if (active.id === over.id) return;

    setData(() => {
      const originalPos = findProjectIndex(active.id);
      const newPos = findProjectIndex(over.id);

      let newProjectList = arrayMove(data, originalPos, newPos);

      newProjectList = newProjectList.map((project, index) => {
        updateProjectPositionDb({ ...project, position: index + 1 });
        return { ...project, position: index + 1 };
      });

      return newProjectList;
    });
  }

  function updateProjectPositionDb(changedProject) {
    axios.put(
      `http://localhost:3000/projects/${changedProject.id}`,
      changedProject
    );
  }

  function handleDragEndTask(event) {
    const { active, over } = event;

    if (active.id === over.id) return;

    setData((prevData) => {
      const oldTaskList = prevData[findProjectIndex(selectedProject)].tasks;
      const originalPos = findTaskIndex(active.id, oldTaskList);
      const newPos = findTaskIndex(over.id, oldTaskList);

      let newTaskList = arrayMove(oldTaskList, originalPos, newPos);

      newTaskList = newTaskList.map((task, index) => {
        updateTaskPositionDb({
          ...task,
          position: index + 1,
          projectId: selectedProject,
        });

        return { ...task, position: index + 1 };
      });

      return prevData.map((project) => {
        if (project.id === selectedProject) {
          return { ...project, tasks: newTaskList };
        }

        return project;
      });
    });
  }

  function updateTaskPositionDb(changedTask) {
    axios.put(`http://localhost:3000/tasks/${changedTask.id}`, changedTask);
  }

  return (
    <>
      <DndContext
        onDragEnd={handleDragEndProject}
        collisionDetection={closestCorners}
        sensors={sensors}
      >
        <ProjectsSection
          user={user}
          data={data}
          updateData={setData}
          selected={selectedProject}
          changeSelected={setSelectedProject}
        />
      </DndContext>

      {data.length > 0 && (
        <DndContext
          onDragEnd={handleDragEndTask}
          collisionDetection={closestCorners}
          sensors={sensors}
        >
          <TasksSection
            user={user}
            tasks={data[indexSelectedProject].tasks}
            selectedProject={selectedProject}
            changeSelected={setSelectedProject}
            data={data}
            updateData={setData}
          />
        </DndContext>
      )}
    </>
  );
}

export default ToDoList;
