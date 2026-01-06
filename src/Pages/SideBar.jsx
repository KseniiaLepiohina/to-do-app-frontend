
import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import Logo from "../components/Logo";
import Task from "./CreateTask";
import AddTaskBtn from "../components/addTaskBtn";

export default function SideBarLayout() {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <aside style={{ minWidth: "250px", background: "#f4f4f4", padding: "1rem" }}>
        <Logo />
        <AddTaskBtn onClick={handleOpenModal} />
        {isModalOpen && <Task handleCloseModal={handleCloseModal} />}
        <nav className="navigations">
          <NavLink to="dashboard"
          className={({isActive})=> 
            isActive ? "nav-item active" : "nav-item"
          }
          >
                <h3>Dashboard</h3>
              </NavLink>
               <NavLink
                to="activeTasks"
                className={({isActive})=> 
            isActive ? "nav-item active" : "nav-item"
          }
                >
                 <h3>Active</h3>
               </NavLink>
               <NavLink
                to="completedTasks"
                className={({isActive})=> 
            isActive ? "nav-item active" : "nav-item"}
                >
                 <h3>Complete</h3>
               </NavLink>
        </nav>
      </aside>

      <main style={{ flex: 1, padding: "1rem" }}>
        <Outlet /> 
      </main>
    </div>
  );
}
