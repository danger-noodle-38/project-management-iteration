import React, { useState, useEffect } from 'react';
import {
  Routes,
  Route,
  Link,
  useParams,
  Navigate,
  useLocation,
} from 'react-router-dom';
import Project from '../components/Project.jsx';
import TasksContainer from '../containers/TasksContainer.jsx';
import Login from '../containers/LoginPage.jsx';
import HomeContainer from '../containers/HomeContainer.jsx';
import NavbarMain from './NavbarMain.jsx';
import Signup from '../containers/SignupPage.jsx';
import SubTasksContainer from '../containers/SubTasksContainer.jsx';
import MainPage from '../containers/MainPage.jsx';
import PrivateRoute from './PrivateRoute.jsx';

const App = () => {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { userID } = useParams();
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('isLoggedIn')
  );

  useEffect(() => {
    localStorage.setItem('isLoggedIn', false);
  }, [isLoggedIn]);

  return (
    <div className="Home">
      {/* header to persist through page, can link back to homepage, signout, switchuser */}
      <NavbarMain
        className="navbar-main"
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />
      <Routes>
        {/* Auto load to Login page/> */}
        <Route exact path="/" element={<MainPage />} />
        <Route
          exact
          path="/login"
          element={
            <Login setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
          }
        />
        <Route
          exact
          path="/signup"
          element={<Signup setIsLoggedIn={setIsLoggedIn} />}
        />
        {/* <Route
          exact
          path={`/homepage`}
          element={
            isLoggedIn ? (
              <HomeContainer />
            ) : (
              <Navigate to={'/login'} state={{ location }} />
            )
          }
        /> */}
        <Route
          exact
          path="/homepage"
          element={<PrivateRoute isLoggedIn={isLoggedIn} />}
        />
        {/* <Route path=":userId" element={<ProfilePage />} /> */}
        <Route exact path={`/project`} element={<Project />} />
        <Route exact path={`/project/:project`} element={<TasksContainer />} />
        <Route
          exact
          path={`/project/:project/tasks/:task`}
          element={<SubTasksContainer />}
        />
      </Routes>
    </div>
  );
};

export default App;
