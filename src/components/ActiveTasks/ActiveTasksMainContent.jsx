import ActiveTaskTooltip from "../ActiveTasks/ActiveTasksTooltip";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { findAllActiveTasks,transferIntoCompletedTasks } from "../../slices/tasksSlice";
import TaskStatusIcon from "../TaskStatusIcon";

const ActiveTaskMainContent = ({task}) =>{
  const dispatch = useDispatch();
  const findActiveTasks = useSelector((state)=> state.task.findActiveTasks);
  useEffect(() => {
    dispatch(findAllActiveTasks());
  }, [dispatch]);
        console.log("Активні таски",findActiveTasks);
  console.log("Tooltip task:", task);

  return(
     <main>
         {findActiveTasks.map((task)=>  (
           <ul key={task.taskId}>
              <li className="task_container tooltipWrapper ">
                <label className="checkbox">
                   <input
                     height={40}
                      width={40}
                    type='checkbox'
                    onClick={() =>
                      dispatch(
                        transferIntoCompletedTasks({ taskId: task.taskId, userId: task.userId }))
                    }
                  />
                  <span><TaskStatusIcon completed={task.completed}/>
                  </span>
                </label>
                <h2>{task.title}</h2>
                <ActiveTaskTooltip task={task} />
              </li>
          </ul>
         ))} 
      </main>
    
  )
}
export default ActiveTaskMainContent;