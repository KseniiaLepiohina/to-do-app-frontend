import wmn from "../assets/wmn.png";
import Header from "../components/header";
import ActiveTaskMainContent from "../components/ActiveTasks/ActiveTasksMainContent";
import CompletedTaskMainContent from "../components/CompletedTasks/CompletedTasksMainContent";
// import isMobile from '../useHooks/useMobile';
import { Icon } from "@iconify/react/dist/iconify.js";
import SideBar from "./SideBar";
import { useDispatch, useSelector } from "react-redux";
import { setDeleteAllTasks } from "../slices/tasksSlice";

export default function Dashboard() {
  const dispatch = useDispatch();
  const date = new Date();
const currentDate = date.toLocaleString();

const completedTasks = useSelector((state)=> state.task.findCompletedTasks);
const activeTasks = useSelector((state)=> state.task.findActiveTasks);

const percentOfCompletedTasks = Math.ceil(completedTasks.length);
const percentOfActiveTasks = Math.ceil(activeTasks.length);

const deleteAll =()=> dispatch(setDeleteAllTasks());

  return (
   <>
          <Header PageName={"Dashboard"} />
          <main style={{ padding: "4.5em 5em 5em 2.5em" }}>
            <section className="intro">
              <section>
                <h1>Hello, Beautiful Human! </h1>
                <h2> What do you want to do today?</h2>
              </section>
              <img
                style={{ position: "absolute", padding: "2em 0em 2em 32em" }}
                src={wmn}
                alt="young smiling woman working at laptop"
                loading="lazy"
              />
            </section>
            <section
              style={{ display: "flex", gap: "20em", margin: "2em 0 0 0 " }}
            >
              <section>
                <section className="todayTasks">
                  <section className="todayTask_header">
                    <h2>Today's Tasks</h2>

                    <button
                    onClick={()=> deleteAll}
                    >
                      <span>Delete All</span>
                    </button>
                  </section>
                </section>
                <ul
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.6em",
                  }}
                >
                  <>
                    <ActiveTaskMainContent />
                  </>
                  <>
                    <CompletedTaskMainContent />
                  </>
                </ul>
              </section>
              <section>
                <h6>{currentDate}</h6>

                <section className="taskStatus">
                  <section className="completedTasks">
                    <span><Icon icon="icon-park-solid:check-one" color="#FFFFFF" width="3.5em" height="3.5em" /></span>
                    <h1>{percentOfCompletedTasks}</h1>
                    <h3>Completed tasks</h3>
                  </section>
                  <section className="activeTasks">
                    <span><Icon icon="icon-park-solid:time" color="#FFFFFF" width="3.5em" height="3.5em" /></span>
                      <h1>{percentOfActiveTasks}</h1>
                    <h3>Active tasks</h3>
                  </section>
                </section>
              </section>
            </section>
          </main>
        </>
  );
}
