import { useRef } from "react";

export function PageLogin() {
  const usernameInputRef = useRef();
  const passwordInputRef = useRef();
  function submitHandler(event) {
    event.preventDefault();
    const enteredUsername = usernameInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    const meetupData = {
      username: enteredUsername,
      password: enteredPassword,
    };

    return meetupData;

    //   fetch(
    //     "https://basic-streaming-app-default-rtdb.firebaseio.com/meetups.json",
    //     {
    //       method: "POST",
    //       body: JSON.stringify(meetupData),
    //       headers: { "Content-Type": "application/json" },
    //     }
    //   );
  }

  return (
    <section className="LoginPage">
      <h1>Login</h1>
      <form className="formCard" onSubmit={submitHandler}>
        <label htmlFor="username">Username</label>
        <input type="text" required id="username" ref={usernameInputRef} />

        <label htmlFor="password">Password</label>
        <input type="password" required id="password" ref={passwordInputRef} />

        <button className="btnLogin">Login</button>
      </form>
    </section>
  );
}
