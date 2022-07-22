import { useRef } from "react";

export function PageNewMeetup() {
  const titleInputRef = useRef();
  const imageInputRef = useRef();
  const addressInputRef = useRef();
  const descriptionInputRef = useRef();
  function submitHandler(event) {
    event.preventDefault();
    const enteredTitle = titleInputRef.current.value;
    const enteredImage = imageInputRef.current.value;
    const enteredAddress = addressInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;

    const meetupData = {
      title: enteredTitle,
      image: enteredImage,
      address: enteredAddress,
      description: enteredDescription,
    };

    fetch(
      "https://basic-streaming-app-default-rtdb.firebaseio.com/meetups.json",
      {
        method: "POST",
        body: JSON.stringify(meetupData),
        headers: { "Content-Type": "application/json" },
      }
    );
  }
  return (
    <section className="newMeetupPage">
      <h1>Add New Meetup</h1>
      <form className="formCard" onSubmit={submitHandler}>
        <label htmlFor="title">Meetup Title</label>
        <input type="text" required id="title" ref={titleInputRef} />

        <label htmlFor="image">Meetup Image</label>
        <input type="url" required id="image" ref={imageInputRef} />

        <label htmlFor="address">Address</label>
        <input type="text" required id="address" ref={addressInputRef} />

        <label htmlFor="description">Meetup Description</label>
        <textarea
          id="description"
          required
          rows="5"
          ref={descriptionInputRef}
        ></textarea>

        <button className="btnAddMeetup">Add Meetup</button>
      </form>
    </section>
  );
}
