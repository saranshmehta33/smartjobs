import logo from "./logo.svg";
import "./App.css";
import { Button } from "antd";
import Home from "./pages/Home";
import JobInfo from "./pages/JobInfo";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import AppliedJobs from "./pages/AppliedJobs";
import PostJob from "./pages/PostJob";
import Profile from "./pages/Profile";
import FadeLoader from "react-spinners/FadeLoader";
import { useDispatch, useSelector } from "react-redux";
import { getAllJobs } from "./redux/actions/jobActions.";
import { useEffect } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PostedJobs from "./pages/PostedJobs";
import EditJob from "./pages/EditJob";
import { getAllUsers } from "./redux/actions/userActions";
import UserInfo from "./pages/UserInfo";

function App() {
  const { loader } = useSelector((state) => state.loaderReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllJobs());
    dispatch(getAllUsers())
  }, []);
  return (
    <div className="App">
      {loader && (
        <div className="sweet-loading text-center">
          <FadeLoader color={"#001529"} />
        </div>
      )}

      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<ProtectedRoute element={<Home />} />} />
          <Route
            path="/appliedjobs"
            element={<ProtectedRoute element={<AppliedJobs />} />}
          />
          <Route
            path="/postjob"
            element={<ProtectedRoute element={<PostJob />} />}
          />
          <Route
            path="/profile"
            element={<ProtectedRoute element={<Profile />} />}
          />
          <Route
            path="/jobs/:id"
            element={<ProtectedRoute element={<JobInfo />} />}
          />
          <Route
            path="/posted"
            element={<ProtectedRoute element={<PostedJobs />} />}
          />
          <Route
            path="/editjob/:id"
            element={<ProtectedRoute element={<EditJob />} />}
          />

          <Route
            path="/users/:id"
            element={<ProtectedRoute element={<UserInfo />} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

export function ProtectedRoute({ element }) {
  const user = localStorage.getItem('user');

  if (!user) {
    // Redirect to the login page if the user is not authenticated
    return <Navigate to="/login" />;
  } else {
    // Render the provided element
    return element;
  }
}
