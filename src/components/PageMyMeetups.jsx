import { useContext } from "react";
import { AppContext } from "../AppContext";

export function PageMyMeetups() {
  const { isLoading, loadedMeetups, toggleFavoriteStatusHandler } =
    useContext(AppContext);

  return (
    <section className="myMeetupsPage">
      <h1>All Meetups</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul className="allMeetups">
          {loadedMeetups.map((meetup) => {
            return (
              <li key={meetup._id}>
                <div>
                  <img src={meetup.imageUrl} alt={meetup.title} />
                </div>
                <div>
                  <h3>{meetup.title}</h3>
                  <address>{meetup.adress}</address>
                  <p>{meetup.description}</p>
                </div>
                <div>
                  <button onClick={() => toggleFavoriteStatusHandler(meetup)}>
                    {meetup.isFavorite
                      ? "Remove from Favorites"
                      : "Add to Favorites"}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
