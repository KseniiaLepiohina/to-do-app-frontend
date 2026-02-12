import ActiveTaskTooltip from "../ActiveTasks/ActiveTasksTooltip";
import TaskStatusIcon from "../TaskStatusIcon";
import { 
  useFindAllActiveTasksQuery, 
  useTransferToCompletedTasksMutation 
} from "../../services/taskApi";

const ActiveTaskMainContent = () => {
  // 1. Для Query (отримання даних) використовуємо об'єкт. Дані в "data".
  const { data: activeTasks = [], isLoading, isError } = useFindAllActiveTasksQuery();

  // 2. Для Mutation використовуємо масив. Перший елемент - функція запуску.
  const [transferToCompleted] = useTransferToCompletedTasksMutation();

  if (isLoading) return <p>Завантаження...</p>;
  if (isError) return <p>Сталася помилка при завантаженні завдань.</p>;

  return (
    <main>
      {activeTasks.map((task) => (
        <ul key={task.taskId}>
          <li className="task_container tooltipWrapper">
            <label className="checkbox">
              <input
                type="checkbox"
                style={{ height: 40, width: 40 }}
                // Викликаємо функцію мутації напряму, без dispatch
                onClick={() => transferToCompleted({ 
                  taskId: task.taskId, 
                  userId: task.userId 
                })}
              />
              <span>
                <TaskStatusIcon completed={task.completed} />
              </span>
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