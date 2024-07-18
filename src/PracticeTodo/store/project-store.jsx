import { createContext } from "react";
import NewProject from "../components/NewProject";
import NoProjectSelected from "../components/NoProjectSelected";
import SelectedProject from "../components/SelectedProject";
import ProjectSidebar from "../components/ProjectSidebar";
import { Main } from "../styles/Tag";
import { useReducer } from "react";

export const ProjectContext = createContext({
  SelectedProjectId: undefined,
  projects: [],
  AddProject: () => {},
  StartAddProject: () => {},
  CancelAddProject: () => {},
  SelectProject: () => {},
  DeleteProject: () => {},
  AddTask: () => {},
  DeleteTask: () => {},
});

function projectReducer(state, action) {
    if(action.type === "ADD_PROJECT"){
        const newProject = {
            ...action.payload,
            id: Math.random(),
            tasks: [],
          };
          return {
            ...state,
            projects: [...state.projects, newProject],
            selectedProjectId: undefined,
          };
    }
    if(action.type === "START_ADD_PROJECT"){
        return {
            ...state,
            selectedProjectId: null,
          };
    }
    if(action.type === "CANCEL_ADD_PROJECT"){
        return{
            ...state,
            selectedProjectId: undefined,
        }
    }
    if(action.type === "SELECT_PROJECT"){
        return {
            ...state,
            selectedProjectId: action.payload,
          };
    }
    if(action.type === "DELETE_PROJECT"){
        return {
            ...state,
            projects: [
              ...state.projects.filter(
                (project) => project.id !== state.selectedProjectId
              ),
            ],
            //projects: prevState.projects.filter((project)=> poject.id !=== prevState.selectedProjectId)
            selectedProjectId: undefined,
          };
    }
    if(action.type === "ADD_TASK"){
        const taskId = Math.random();
        const newTask = {
          text: action.payload,
          projectId: state.selectedProjectId,
          id: taskId,
        };
  
        const updatedProjects = state.projects.map((project) => {
          if (project.id === state.selectedProjectId) {
            return {
              ...project,
              tasks: [...project.tasks, newTask],
            };
          }
          return project;
        });
  
        return {
          ...state,
          projects: updatedProjects,
        };
    }
    if(action.type === "DELETE_TASK"){
        const updatedProjects = state.projects.map((project) => {
            if (project.id === state.selectedProjectId) {
              return {
                ...project,
                tasks: [...project.tasks.filter((task) => task.id !== action.payload)],
              };
            }
            return project;
          });
    
          return {
            ...state,
            projects: updatedProjects,
          };
    }

    return state;
}

export default function ProjectProvider({ children }) {
  const [projectState, projectDispatch] = useReducer(projectReducer, {
    selectedProjectId: undefined,
    projects: [],
  });

  function handleAddProject(projectData) {
    projectDispatch({
      type: "ADD_PROJECT",
      payload: projectData,
    });
  }

  function handleStartAddProject() {
    projectDispatch({
      type: "START_ADD_PROJECT",
    });
  }
  function handleCancelAddProject() {
    projectDispatch({
      type: "CANCEL_ADD_PROJECT",
    });
  }
  let content;
  const selectedProject = projectState.projects.find(
    (project) => project.id === projectState.selectedProjectId
  );

  function handleSelectProject(id) {
    projectDispatch({
      type: "SELECT_PROJECT",
      payload: id,
    });
  }

  function handleDeleteProject() {
    projectDispatch({
      type: "DELETE_PROJECT",
    });
  }

  function handleAddTask(text) {
    projectDispatch({
      type: "ADD_TASK",
      payload: text,
    });
  }

  function handelDeleteTask(id) {
    projectDispatch({
      type: "DELETE_TASK",
      payload: id,
    });
  }
  if (projectState.selectedProjectId === null) {
    content = <NewProject></NewProject>;
  } else if (projectState.selectedProjectId === undefined) {
    content = <NoProjectSelected></NoProjectSelected>;
  } else {
    content = (
      <SelectedProject
        project={selectedProject}
        tasks={selectedProject.tasks}
      ></SelectedProject>
    );
  }

  const ProjectCtx = {
    selectedProjectId: projectState.selectedProjectId,
    projects: projectState.projects,
    AddProject: handleAddProject,
    StartAddProject: handleStartAddProject,
    CancelAddProject: handleCancelAddProject,
    SelectProject: handleSelectProject,
    DelteProject: handleDeleteProject,
    AddTask: handleAddTask,
    DeleteTask: handelDeleteTask,
  };
  return (
    <ProjectContext.Provider value={ProjectCtx}>
      <Main>
        <ProjectSidebar></ProjectSidebar>
        {content}
      </Main>
    </ProjectContext.Provider>
  );
}
