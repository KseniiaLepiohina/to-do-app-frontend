import { Icon } from "@iconify/react";
import CompletedTaskToolTip from "../CompletedTasks/CompletedTasksTooltip";
import { useFindAllCompleteTasksQuery } from "../../services/taskApi";

export default function CompletedTaskMainContent() {
  const { data: completedTasks = [], isLoading, isError } = useFindAllCompleteTasksQuery();
  if (isLoading) return <p>Завантаження...</p>;
  if (isError) return <p>Сталася помилка при завантаженні завдань.</p>;

  return (
    <>
      <main>
        {completedTasks.map((completedTask) => (
          <ul key={completedTask.taskId}>
            <li className="completedTask tooltipWrapper">
              <span>
                <Icon
                  icon="material-symbols:check-box"
                  color="#BA5112"
                  height={28}
                  width={28}
                />
              </span>
              <h3>{completedTask.title}</h3>

              <CompletedTaskToolTip completedTask={completedTask} />
            </li>
          </ul>
        ))}
      </main>
    </>
  );
}
