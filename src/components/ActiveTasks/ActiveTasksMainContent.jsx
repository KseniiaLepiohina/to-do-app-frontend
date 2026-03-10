import ActiveTaskTooltip from "../ActiveTasks/ActiveTasksTooltip";
import TaskStatusIcon from "../TaskStatusIcon";
import { useFindAllActiveTasksQuery} from "../../services/taskApi";
import {addTaskToCompleted,removeTaskFromCompleted} from '../../slices/tasksSlice';
import { useDispatch, useSelector } from "react-redux";

const ActiveTaskMainContent = () => {

  const dispatch = useDispatch();
  
  const { data: activeTasks = [], isLoading, isError } = useFindAllActiveTasksQuery();
  
  const completedTaskIds = useSelector((state) => state.task.findCompletedTasks);

  if (isLoading) return <p>Завантаження...</p>;
  if (isError) return <p>Сталася помилка.</p>;

console.log("Active tasks", activeTasks);

const handleCheckboxChange = async (task) => {
dispatch(addTaskToCompleted(task)); 
}

return (
    <main>
      {activeTasks
        .filter(t => !completedTaskIds.includes(t.task_id)) 
        .map((task) => (
          <ul key={task.task_id}>
            <li className="task_container">
              <label className="checkbox">
                <input
                  type="checkbox"
                  onChange={() => handleCheckboxChange( task)}
                  style={{ height: 40, width: 40 }}
                />
              </label>
              <h2>{task.title}</h2>
              <ActiveTaskTooltip task={task} />
            </li>
          </ul>
        ))}
    </main>
  );
};
export default ActiveTaskMainContent;
