import { useContext, useRef } from "react";
import { AppContext } from "../AppContext";

export function PageAllMeetups() {
  const { isLoading, loadedMeetups, toggleFavoriteStatusHandler } =
    useContext(AppContext);
  return (
    <>
      <p>This is the Login page.</p>
      {!userIsLoggedIn() && (
        <form className="formCard" onSubmit={submitHandler}>
          <div className="row">
            <label htmlFor="username">Username</label>
            <input type="text" required id="username" ref={usernameInputRef} />
          </div>
          <div className="row">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              required
              id="password"
              ref={passwordInputRef}
            />
          </div>
          <div className="row">
            <button>Login</button>
          </div>
        </form>
      )}
    </>
  );
}
