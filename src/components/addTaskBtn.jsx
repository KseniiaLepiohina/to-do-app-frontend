import { NavLink } from "react-router";
const AddTaskBtn = () => {

  return (
    <NavLink to="addtask">
       <button  className="task">
      <section className="addTask">
        <h4>Add Task</h4>
        <span className="btn_addTask">+</span>
      </section>
    </button>
    </NavLink>
   
  );
};

export default AddTaskBtn;
