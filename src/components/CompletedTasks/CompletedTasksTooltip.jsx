import { Icon } from "@iconify/react/dist/iconify.js";
import { useDeleteCompletedTaskByIdMutation } from "../../services/taskApi";

export default function CompletedTaskToolTip({ completedTask }) {

  const [deleteTask] = useDeleteCompletedTaskByIdMutation();
  
  return (
    <>
      <section className="tooltipBox">
        <section className="tooltipBox_main">
          <section className="tooltipBox_title">
            <h2>{completedTask.title}</h2>
            <p style={{ color: "#BA5112" }}>Added ago</p>
          </section>
          <section className="tooltipBox_description">
            <h3>Description</h3>
            <p>{completedTask.description}</p>
          </section>
          <section className="tooltipBox_details">
            <span> <Icon icon="material-symbols:check-box" color="#BA5112" width="1.8em" height="1.8em" /></span>
            <button
              onClick={() => deleteTask({
                task_id: completedTask.task_id,
                user_id: completedTask.user_id
              })}
              className="active_tooltip_btn"
            >
              <span><Icon icon="ant-design:delete-outlined" color="#BA5112" width="1.8em" height="1.8em" /></span>
            </button>
          </section>
        </section>
      </section>
    </>
  );
}
