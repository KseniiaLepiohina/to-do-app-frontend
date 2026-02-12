import { Icon } from "@iconify/react/dist/iconify.js";
import { useDeleteCompletedTaskByIdMutation } from "../../services/taskApi";

export default function CompletedTaskToolTip({completedTask}) {

  const date = new Date(completedTask.completedAt);
  const now = new Date();
  const hoursLate = Math.floor((now-date)/(1000*60*60));
  const [deleteTask] = useDeleteCompletedTaskByIdMutation();
    return (
    <>
      <section className="tooltipBox">
        <section className="tooltipBox_main">
          <section className="tooltipBox_title">
            <h2>{completedTask.title}</h2>
            <p style={{ color: "#BA5112" }}>Added {hoursLate} ago</p>
          </section>
          <section
          className="tooltipBox_description"
          >
            <h3>Description</h3>
            <p>{completedTask.description}</p>
          </section>
          <section className="tooltipBox_details">
           <span> <Icon icon="material-symbols:check-box" color="#BA5112"  width="1.8em" height="1.8em"/></span>
            <button
            onClick={()=> deleteTask({
              taskId:completedTask.taskId,
              userId:completedTask.userId
            })}
              className="active_tooltip_btn"
            >
              <span><Icon icon="ant-design:delete-outlined" color="#BA5112"  width="1.8em" height="1.8em"/></span>
            </button>
          </section>
        </section>
      </section>
    </>
  );
}
