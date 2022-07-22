import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AppContext = createContext();

const backend_base_url = "https://bbc-meetupgetup-mern-backend.herokuapp.com";

export const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedMeetups, setLoadedMeetups] = useState([]);

  useEffect(() => {
    (async () => {
      const firebaseObj = (await axios.get(firebaseUrl)).data;
      const _loadedMeetups = Object.entries(firebaseObj).map(
        (entry) => entry[1]
      );
      setLoadedMeetups(_loadedMeetups);
      setIsLoading(false);
    })();
  }, [loadedMeetups]);

  function toggleFavoriteStatusHandler(meetup) {
    meetup.isFavorite = !meetup.isFavorite;
    setLoadedMeetups([...loadedMeetups]);
  }

  return (
    <AppContext.Provider
      value={{
        isLoading,
        loadedMeetups,
        toggleFavoriteStatusHandler,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// const [isLoading, setIsLoading] = useState(true);
// const [meetups, setMeetups] = useState([]);
// const [currentUser, setCurrentUser] = useState({
//   username: "anonymousUser",
//   accessGroups: ["loggedOutUsers"],
// });
// const [username, setUsername] = useState("");
// const [password, setPassword] = useState("");
// const [message, setMessage] = useState("");

// function toggleFavoriteStatusHandler(meetup) {
//   meetup.isFavorite = !meetup.isFavorite;
//   setMeetups([...meetups]);
// }

// const userIsLoggedIn = () => {
//   return currentUser.username !== "anonymousUser";
// };

// const currentUserIsInAccessGroups = (accessGroups) => {
//   let rb = false;
//   accessGroups.forEach((accessGroup) => {
//     if (currentUser.accessGroups.includes(accessGroup)) {
//       rb = true;
//     }
//   });
//   return rb;
// };

// const getMeetups = () => {
//   (async () => {
//     setMeetups((await axios.get(backend_base_url + "/meetups")).data);
//     setIsLoading(false);
//   })();
// };

// useEffect(() => {
//   async () => {
//     getMeetups();
//   };
// }),
//   [];

// useEffect(() => {
//   (async () => {
//     const response = await fetch(backend_base_url + "/maintain-login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         authorization: "Bearer " + localStorage.getItem("token"),
//       },
//     });
//     if (response.ok) {
//       const data = await response.json();
//       setCurrentUser(data.user);
//       getMeetups();
//     } else {
//       const response = await fetch(backend_base_url + "/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           username: "anonymousUser",
//           password: "anonymousUser123",
//         }),
//       });
//       if (response.ok) {
//         const data = await response.json();
//         getMeetups();
//         setCurrentUser(data.user);
//         localStorage.setItem("token", data.token);
//       } else {
//         setMessage("bad login");
//       }
//     }
//   })();
// }, []);

// const handleLoginButton = async (e) => {
//   e.preventDefault();
//   const response = await fetch(backend_base_url + "/login", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ username, password }),
//   });
//   setUsername("");
//   setPassword("");
//   if (response.ok) {
//     const data = await response.json();
//     getMeetups();
//     setCurrentUser(data.user);
//     localStorage.setItem("token", data.token);
//   } else {
//     setMessage("bad login");
//     setTimeout(() => {
//       setMessage("");
//     }, 3000);
//   }
// };

// const handleLogoutButton = () => {
//   localStorage.removeItem("token");
//   setCurrentUser({
//     username: "anonymousUser",
//     accessGroups: ["loggedOutUsers"],
//   });
// };
