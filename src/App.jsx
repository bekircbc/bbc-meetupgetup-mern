// import { useEffect } from "react";
import "./App.scss";
import { Navigate, NavLink, Outlet, Route, Routes } from "react-router-dom";

import { PageAllMeetups } from "./components/PageAllMeetups";
import { PageFavorites } from "./components/PageFavorites";
import { PageNewMeetup } from "./components/PageNewMeetup";
import { PageLogin } from "./components/PageLogin";
import { PageRegister } from "./components/PageRegister";
import { PageMyMeetups } from "./components/PageMyMeetups";

function App() {
  let isUserLoggedIn = true;

  const isUserLoggedInHandler = () => {
    isUserLoggedIn = false;
  };

  return (
    <div className="App">
      <div className="header">
        <div className="logo">
          <img src="./images/icon.png" alt="logo" />
          <h2>Meetup Getup</h2>
        </div>
        <nav>
          <span>
            <NavLink to="allmeetups">All Meetups</NavLink>
          </span>
          {isUserLoggedIn ? (
            <>
              <span>
                <NavLink to="newmeetup">Add New Meetup</NavLink>
              </span>
              <span>
                <NavLink to="favorites">My Favorites</NavLink>
              </span>
              <span>
                <NavLink to="mymeetups">My Meetups</NavLink>
              </span>
              <span>
                <button
                  className="button-logout"
                  onClick={isUserLoggedInHandler()}
                >
                  Logout
                </button>
              </span>
            </>
          ) : (
            <>
              <span>
                <NavLink to="login">Login</NavLink>
              </span>
              <span>
                <NavLink to="register">Register</NavLink>
              </span>
            </>
          )}
        </nav>

        <Outlet />
      </div>
      <div>
        <Routes>
          <Route>
            <Route path="allmeetups" element={<PageAllMeetups />} />
            <Route path="newmeetup" element={<PageNewMeetup />} />
            <Route path="favorites" element={<PageFavorites />} />
            <Route path="mymeetups" element={<PageMyMeetups />} />
            <Route path="login" element={<PageLogin />} />
            <Route path="register" element={<PageRegister />} />
            <Route path="/" element={<Navigate to="allmeetups" replace />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
