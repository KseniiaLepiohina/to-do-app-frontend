import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setPassword, setUsername } from '../../slices/authSlice';
import { useSignUpMutation } from '../../services/authApi';

export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const username = useSelector((state) => state.auth.username);
  const password = useSelector((state) => state.auth.password);

  const [signUp] = useSignUpMutation();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
   const authorization = await signUp({ username, password }).unwrap();
      if(authorization?.token) {
        localStorage.setItem("token", authorization.token);
      }
      navigate('/dashboard');
    } catch (error) {
      console.log("Sign up error", error);
    }
  };

  return (
    <section className="authForm_main">
      <section className="authForm">
        <section>
          <strong>
            <h1>To-Do App</h1>
          </strong>
          <h3>Start organizing your life day by day</h3>
        </section>

        <form onSubmit={handleSignUp}>
          <input
            name="Username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => dispatch(setUsername(e.target.value))}
          />

          <input
            type="password"
            name="Password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => dispatch(setPassword(e.target.value))}
          />

          <section>
            <button className="signIn_btn" type="submit">
              Sign Up
            </button>

            <h4>
              Already have an account? Sign in
              <Link to="/login">
                <span>here.</span>
              </Link>
            </h4>
          </section>
        </form>
      </section>
    </section>
  );
}
