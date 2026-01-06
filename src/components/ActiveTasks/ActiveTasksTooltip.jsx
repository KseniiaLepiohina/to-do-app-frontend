import { Icon } from '@iconify/react'
import { useSelector, useDispatch } from 'react-redux';
import { updateActiveTaskById, deleteActiveTaskById,transferIntoCompletedTasks } from '../../slices/tasksSlice';

import TaskStatusIcon from '../TaskStatusIcon';
export default function ActiveTaskTooltip({ task }) {
  const dispatch = useDispatch();

  const updateTask = updateActiveTaskById;
  const deleteTask = deleteActiveTaskById;
  const date = new Date(task.createdAt);
  const now = new Date();
  const hoursLate = Math.floor((now - date) / (1000 * 60 * 60));



  return (
    <>
      <section className="tooltipBox">
        <section className="active_tooltip_main">
          <section className='tooltip_details'>
            <section className="tooltip_task_detail">
              <h3 color='#B5B5B5'>{task.title}</h3>
              <p>Added  {hoursLate} hours ago</p>
            </section>
            <section className='tooltip_task_detail'>
              <h4>Description</h4>
              <p>{task.description}</p>
            </section>
          </section>

            <section className='tooltipBox_btts'>
              <label className="checkbox">
                  <input
                  height={40}
                  width={40}
  type='checkbox'
  checked={false} 
  onChange={() =>
    dispatch(
      transferIntoCompletedTasks({ taskId: task.taskId, userId: task.userId })
    )
  }
/>
</label>
                  <span><TaskStatusIcon completed={task.completed}/>
                  </span>
                
              <section>


                <button
                  onClick={(e) => dispatch(updateTask({
                    id: task.taskId,
                    dto: { title: task.title }
                  }))}
                  className="active_tooltip_btn">
                  <Icon
                    height={32}
                    width={32}
                    icon="carbon:edit"
                    color="#EDB046"

                  />
                </button>

                <button
                  onClick={(e) => dispatch(deleteTask({
                    taskId: task.taskId,
                    userId: task.userId
                  }))}
                  className="tooltip_btn"
                >
                  <Icon
                    icon="ant-design:delete-outlined"
                    color='#EDB046'
                    height={32}
                    width={32}
                  />
                </button>

              </section>
            </section>
          </section>
        </section>
     

    </>
  )
}