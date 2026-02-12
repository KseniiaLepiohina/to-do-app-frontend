import { Icon } from '@iconify/react';
import TaskStatusIcon from '../TaskStatusIcon';
import { 
  useDeleteActiveTaskByIdMutation, 
  useUpdateActiveTaskByIdMutation,
  useTransferToCompletedTasksMutation 
} from '../../services/taskApi';

export default function ActiveTaskTooltip({ task }) {
  // 1. Ініціалізуємо мутації (перейменовуємо об'єкти стану для уникнення конфліктів)
  const [updateTask, { isLoading: isUpdating }] = useUpdateActiveTaskByIdMutation();
  const [deleteTask, { isLoading: isDeleting }] = useDeleteActiveTaskByIdMutation();
  const [transferToCompleted] = useTransferToCompletedTasksMutation();

  const date = new Date(task.createdAt);
  const now = new Date();
  const hoursLate = Math.floor((now - date) / (1000 * 60 * 60));

  return (
    <>
      <section className="tooltipBox">
        <section className="active_tooltip_main">
          <section className='tooltip_details'>
            <section className="tooltip_task_detail">
              <h3 style={{ color: '#B5B5B5' }}>{task.title}</h3>
              <p>Added {hoursLate} hours ago</p>
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
                onChange={() => transferToCompleted({ 
                  taskId: task.taskId, 
                  userId: task.userId 
                })}
              />
            </label>
            <span><TaskStatusIcon completed={task.completed}/></span>
                
            <section>
              <button
                disabled={isUpdating}
                onClick={() => updateTask({
                  id: task.taskId,
                  dto: { title: task.title } // Тут зазвичай передають нові дані з форми/інпуту
                })}
                className="active_tooltip_btn">
                <Icon
                  height={32}
                  width={32}
                  icon="carbon:edit"
                  color={isUpdating ? "#ccc" : "#EDB046"}
                />
              </button>

              <button
                disabled={isDeleting}
                onClick={() => deleteTask({
                  taskId: task.taskId,
                  userId: task.userId
                })}
                className="tooltip_btn"
              >
                <Icon
                  icon="ant-design:delete-outlined"
                  color={isDeleting ? "#ccc" : '#EDB046'}
                  height={32}
                  width={32}
                />
              </button>
            </section>
          </section>
        </section>
      </section>
    </>
  );
}