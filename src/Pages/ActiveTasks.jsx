import ActiveTaskMainContent from '../components/ActiveTasks/ActiveTasksMainContent';
import ActiveTaskToolTip from '../components/ActiveTasks/ActiveTasksTooltip'
import Header from '../components/header';

export default function ActiveTasks() {
  const date = new Date();
const currentDate = date.toLocaleString();
  return (
    <>
      <Header PageName={"Active Tasks"} />
      <section className="general">
        <section className="todayTask_header">
          <h2>Today’s Active Tasks</h2>
          <h6>{currentDate}</h6>
        </section>
        <ActiveTaskMainContent />
 
        <ActiveTaskToolTip />
      </section>
    </>
  )
}