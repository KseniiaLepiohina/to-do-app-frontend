import Header from "../components/header";
import CompletedTaskMainContent from "../components/CompletedTasks/CompletedTasksMainContent";

export default function CompletedTasks() {
  const date = new Date();
const currentDate = date.toLocaleString();
  return (
    <>
   <Header PageName={'Completed Tasks'}/>
    <section className="general">
      
        <section className="todayTasks">
          <h2>Today’s Completed Tasks</h2>
          <h6>{currentDate}</h6>
        </section>  
       <CompletedTaskMainContent/>
    </section>
     </>
  );
}
