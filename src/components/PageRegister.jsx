import { useContext, useRef } from "react";
import { AppContext } from "../AppContext";

export function PageRegister() {
  const { registerData, setRegisterData } = useContext(AppContext);
  const usernameInputRef = useRef();
  const firstNameInputRef = useRef();
  const lastNameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  function submitHandler(event) {
    event.preventDefault();
    const enteredUsername = usernameInputRef.current.value;
    const enteredFirstName = firstNameInputRef.current.value;
    const enteredLastName = lastNameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    setRegisterData({
      username: enteredUsername,
      fistName: enteredFirstName,
      lastName: enteredLastName,
      email: enteredEmail,
      password: enteredPassword,
    });

    return registerData;

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

        <label htmlFor="firstname">Firstname</label>
        <input type="text" required id="firstname" ref={firstNameInputRef} />

        <label htmlFor="lastname">Lastname</label>
        <input type="text" required id="lastname" ref={lastNameInputRef} />

        <label htmlFor="password">Password</label>
        <input type="password" required id="password" ref={passwordInputRef} />

        <label htmlFor="e-mail">E-mail</label>
        <input type="e-mail" required id="e-mail" ref={emailInputRef} />

        <button className="btnLogin">Register</button>
      </form>
    </section>
  );
}
