import { Icon } from "@iconify/react";
import {useDispatch, useSelector} from 'react-redux';
import CompletedTaskToolTip from "../CompletedTasks/CompletedTasksTooltip";

export default function CompletedTaskMainContent() {
const dispatch = useDispatch();
const completedTasks = useSelector((state)=> state.task.findCompletedTasks);

  return (
    <>
      <main>
        {completedTasks.map((completedTask)=> (
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
