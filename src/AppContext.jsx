import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AppContext = createContext();

const firebaseUrl =
  "https://basic-streaming-app-default-rtdb.firebaseio.com/meetups.json";

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
