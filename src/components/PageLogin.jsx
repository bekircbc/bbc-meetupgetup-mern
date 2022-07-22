import { useContext } from "react";
import { AppContext } from "../AppContext";

export function PageLogin() {
  const {
    username,
    setUsername,
    password,
    setPassword,
    setCurrentUser,
    setMessage,
  } = useContext(AppContext);
  const usernameInputRef = useRef();
  const passwordInputRef = useRef();
  // function submitHandler(event) {
  //   event.preventDefault();

  // fetch(backend_base_url + "/login", {
  //   method: "POST",
  //   body: JSON.stringify(loginData),
  //   headers: { "Content-Type": "application/json" },
  // });
  // }

  const handleLoginButton = async (e) => {
    e.preventDefault();
    setUsername(usernameInputRef.current.value);
    setPassword(passwordInputRef.current.value);
    const response = await fetch(backend_base_url + "/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    setUsername("");
    setPassword("");
    if (response.ok) {
      const data = await response.json();
      setCurrentUser(data.user);
      localStorage.setItem("token", data.token);
    } else {
      setMessage("bad login");
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  };

  return (
    <section className="LoginPage">
      <h1>Login</h1>
      <form className="formCard" onSubmit={handleLoginButton}>
        <label htmlFor="username">Username</label>
        <input type="text" required id="username" ref={usernameInputRef} />
        <p>{username}</p>

        <label htmlFor="password">Password</label>
        <input type="password" required id="password" ref={passwordInputRef} />
        <p>{password}</p>

        <button className="btnLogin">Login</button>
      </form>
    </section>
  );
}
