import { useContext } from "react";
import { AppContext } from "../AppContext";

export function PageMyFavorites() {
  const { loadedMeetups, toggleFavoriteStatusHandler, currentUser } =
    useContext(AppContext);

  return (
    <div className="pageFavorites">
      <h1>My Favorites</h1>

      {currentUser !== null ? (
        <ul className="favoriteMeetups">
          {currentUser.favorites.map((meetup) => {
            loadedMeetups.filter((m) => {
              m._id === meetup;
              return (
                <li key={meetup.id}>
                  <div>
                    <img src={meetup.image} alt={meetup.title} />
                  </div>
                  <div>
                    <h3>{meetup.title}</h3>
                    <address>{meetup.adress}</address>
                    <p>{meetup.description}</p>
                  </div>
                  <div>
                    <button onClick={() => toggleFavoriteStatusHandler(meetup)}>
                      Remove from Favorites
                    </button>
                  </div>
                </li>
              );
            });
          })}
        </ul>
      ) : (
        <div>No Favorites added to my favorites</div>
      )}
    </div>
  );
}
