import { Icon } from '@iconify/react';
import {useDeleteActiveTaskByIdMutation,useUpdateActiveTaskByIdMutation,} from '../../services/taskApi';
import { useDispatch } from 'react-redux';
import { updateActiveTask ,removeFromActiveTasks} from '../../slices/tasksSlice';

export default function ActiveTaskTooltip({task}) {
  const dispatch = useDispatch();
  const [updateTask, { isLoading: isUpdating }] = useUpdateActiveTaskByIdMutation();
  const [deleteTask, { isLoading: isDeleting }] = useDeleteActiveTaskByIdMutation();
  if (!task) return null;
  const handleUpdateTask = () => {
    try {
      dispatch(updateActiveTask({
        task_id: task.task_id,
        title: task.title,
        description: task.description
      }));

      updateTask.unwrap({
        task_id: task.task_id,
        dto: {
          title: task.title,
          description: task.description
        }
      });
    } catch (error) {
      alert("Не вдалося зберегти зміни на сервері.Task was stored locally: " + error);
    }
  }
  const handleDeleteTask = () => {
    try {
      dispatch(removeFromActiveTasks(task.task_id));
      deleteTask({
        task_id: task.task_id,
        user_id: task.user_id
      }).unwrap()
    } catch (error) {
      alert("Помилка видалення: " + error);
    }
  }
  return (
    <>
      <section className="tooltipBox">
        <section className="active_tooltip_main">
          <section className='tooltip_details'>
            <section className="tooltip_task_detail">
              <h3 style={{ color: '#B5B5B5' }}>{task.title}</h3>
              <p>Added {task.createdAt}hours ago</p>
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
                type='checkbox' />
            </label>
            {/* <span><TaskStatusIcon completed={task.completed} /></span> */}

            <section>
              <button
                disabled={isUpdating}
                onClick={(e) => handleUpdateTask(task.task_id)}
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
                onClick={(e) => handleDeleteTask(task.task_id)} className="tooltip_btn">
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
      </section >
    </>
  );
}