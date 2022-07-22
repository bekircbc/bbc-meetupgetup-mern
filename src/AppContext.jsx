import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const backend_base_url = "http://localhost:31456";
  // const backend_base_url = "https://bbc-meetupgetup-mern-backend.herokuapp.com";
  const [isLoading, setIsLoading] = useState(true);
  const [loadedMeetups, setLoadedMeetups] = useState([]);
  const [loginData, setLoginData] = useState({});
  const [registerData, setRegisterData] = useState({});
  const [currentUser, setCurrentUser] = useState({
    username: "anonymousUser",
    accessGroups: ["loggedOutUsers"],
  });
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [myfavorites, setMyfavorites] = useState([]);
  const [mymeetups, setMymeetups] = useState([]);

  const userIsLoggedIn = () => {
    return currentUser.username !== "anonymousUser";
  };

  const currentUserIsInAccessGroups = (accessGroups) => {
    let rb = false;
    accessGroups.forEach((accessGroup) => {
      if (currentUser.accessGroups.includes(accessGroup)) {
        rb = true;
      }
    });
    return rb;
  };

  const getLoadedMeetups = () => {
    (async () => {
      setLoadedMeetups((await axios.get(backend_base_url + "/meetups")).data);
      setIsLoading(false);
    })();
  };

  getLoadedMeetups();

  function toggleFavoriteStatusHandler(meetup) {
    meetup.isFavorite = !meetup.isFavorite;
    setLoadedMeetups([...loadedMeetups]);
  }

  useEffect(() => {
    (async () => {
      const response = await fetch(backend_base_url + "/maintain-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (response.ok) {
        const data = await response.json();
        setCurrentUser(data.user);
        getLoadedMeetups();
      } else {
        const response = await fetch(backend_base_url + "/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: "anonymousUser",
            password: "anonymousUser123",
          }),
        });
        if (response.ok) {
          const data = await response.json();
          getLoadedMeetups();
          setCurrentUser(data.user);
          localStorage.setItem("token", data.token);
        } else {
          setMessage("bad login");
        }
      }
    })();
  }, []);

  return (
    <AppContext.Provider
      value={{
        myfavorites,
        setMyfavorites,
        mymeetups,
        setMymeetups,
        backend_base_url,
        isLoading,
        loginData,
        setLoginData,
        registerData,
        setRegisterData,
        loadedMeetups,
        toggleFavoriteStatusHandler,
        handleLogoutButton,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
