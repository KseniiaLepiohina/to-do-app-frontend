import {Link,useNavigate} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import { logIn,setUsername,setPassword } from '../../slices/authSlice';

export default function SignIn() {
const dispatch = useDispatch();
const navigate = useNavigate();

  const password = useSelector((state)=>state.auth.password);
  const username = useSelector((state)=> state.auth.username);

  const handleSignIn = (e)=> {
      e.preventDefault(); // <-- це зупиняє перезавантаження
    try{
      dispatch(logIn({username,password}))
      .unwrap()
      .then(()=> {
         navigate('/dashboard');
      })
    } catch(error) {
      console.log("Log In error",error);
    }
  }

  return(
      <section className="authForm_main">
      <section className="authForm">
        <section>
          <strong>
            <h1>To-Do App</h1>
          </strong>
          <h3>Start organizing your life day by day</h3>
        </section>

        <form onSubmit={handleSignIn}>
          <input
            name="Username"
            placeholder="Enter your username"
            value={username}
            onChange={(e)=> dispatch(setUsername(e.target.value))}
          />

          <input
            type="password"
            name="Password"
            placeholder="Enter your password"
           value={password}
           onChange={(e)=> dispatch(setPassword(e.target.value))}
          />

          <section>
            <button className="signIn_btn" type="submit" >
              Sign In
            </button>

            <h4>
              Don’t have an account? Create
              <Link to="/">
                <span>here.</span>
              </Link>
            </h4>
          </section>
        </form>
      </section>
    </section>
  )
}