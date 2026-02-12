import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from './Pages/auth/Login';
import SignUp from './Pages/auth/SignUp';
import ActiveTasks from './Pages/ActiveTasks';
import CompletedTasks from './Pages/CompletedTask'
import Dashboard from './Pages/Dashboard';
import SideBarLayout from './Pages/SideBar';
import CreateTask from './Pages/CreateTask';
import { Provider } from "react-redux";
import store from './slices/store'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/login" element={<SignIn />} />

          {/* Layout */}
          <Route element={<SideBarLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="activeTasks" element={<ActiveTasks />} />
            <Route path="completedTasks" element={<CompletedTasks />} />
            <Route path="addTask" element={<CreateTask />} />
          </Route>
        </Routes>

      </Router>
    </Provider>
  );
}

export default App;
