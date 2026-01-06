import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { addTask, setDescription,setTitle } from "../slices/tasksSlice";

export default function Task() {

const navigate = useNavigate();
const dispatch = useDispatch();

const title  = useSelector((state)=> state.task.title);
const description = useSelector((state)=> state.task.description);

const handleSubmitTask = (e) => {
    e.preventDefault();
    dispatch(addTask({ title, description }))
      .unwrap()
      .then(() => {
        dispatch(setTitle(''));
        dispatch(setDescription(''));

        navigate('/activeTasks');
      })
      .catch((error) => {
        console.log("Add new task error", error);
      });
  }

  return (
    <section className="modal">
      <section className="task">
        <form onSubmit={handleSubmitTask}>
          <input
            name="title"
            placeholder="Add title"
            value={title}
            onChange={(e)=> dispatch(setTitle(e.target.value))}
          />
          <textarea
            placeholder="Add description"
            className="description-textarea"
            rows="4"
           value={description}
           onChange={(e)=> dispatch(setDescription(e.target.value))}
          />
          <section className="btns">
            <button
              onClick={()=>navigate(-1) }
              type="button"
              className="btn_cancel"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn_save"
            >
              Save
            </button>
          </section>
        </form>
      </section>
    </section>
  );
}