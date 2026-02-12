import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import AddTask from "../components/addTaskBtn";
import Logo from "../components/Logo";
import SignOutBtn from "./signOutBtn";

export default function Header({ PageName, isMobile }) {
  const location = useLocation();
  const [modalTask, setModalTask] = useState(false);

  const handleAddTask = () => setModalTask(true);
  const handleCloseModal = () => setModalTask(false);

  const getPageName = () => {
    switch (location.pathname) {
      case "/dashboard":
        return "Dashboard";
      case "/activeTasks":
        return "Active Tasks";
      case "/completedTasks":
        return "Completed Tasks";
      case "/addTask":
        return "New Task";
      default:
        return "";
    }
  };

  return (
    <header>
      {isMobile ? (
        <section className="mobile">
          <Logo isMobile={isMobile} />
          <section className="mobile">
            <AddTask
              isOpen={modalTask}
              onClose={handleCloseModal}
              onClick={handleAddTask}
            />
            <SignOutBtn isMobile={isMobile} />
          </section>
        </section>
) : (<section className="subHeader"> <h2>{PageName || getPageName()}</h2> <SignOutBtn /> </section>)}
    </header>
  )
}
