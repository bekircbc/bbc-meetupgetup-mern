import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AppContext = createContext();

const dataUrl = "http://localhost:31456/meetups";

export const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [meetups, setMeetups] = useState([]);

  useEffect(() => {
    (async () => {
      setMeetups((await axios.get(dataUrl)).data);
      setIsLoading(false);
    })();
  }, [meetups]);

  function toggleFavoriteStatusHandler(meetup) {
    meetup.isFavorite = !meetup.isFavorite;
    setMeetups([...meetups]);
  }

  return (
    <AppContext.Provider
      value={{
        isLoading,
        meetups,
        toggleFavoriteStatusHandler,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
