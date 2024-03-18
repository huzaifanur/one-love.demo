import React, { useEffect, useState } from "react";
import "./createEvent.css";

function CreateEvent({ closeEvent, date }: any) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [host, setHost] = useState("");
  const [time, setTime] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [coords, setCoords] = useState<any>([]);
  const [maxGuests, setMaxguests] = useState<any>();
  const [dispTime, setDispTime] = useState("");
  const [error, setError] = useState(false);
  const [locationError, setLocationError] = useState(false);

  const dispDate = `${date.startStr.slice(5, 7)}-${date.startStr.slice(
    8,
    10
  )}-${date.startStr.slice(0, 4)}`;

  function newTime(time: any) {
    let hour = time.slice(0, 2);
    return hour > 12 ? `${hour - 12}${time.slice(2)} PM` : `${time} AM`;
  }

  const eventSubmit = (e: any) => {
    e.preventDefault();

    setDispTime(newTime(time));

    fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/mapquest?street=${address}&city=${city}&state=${state}&postalCode=${zip}`
    )
      .then((res) => res.json())
      .then((d) =>
        setCoords([
          d.results[0].locations[0].displayLatLng.lat,
          d.results[0].locations[0].displayLatLng.lng,
        ])
      )
      .catch((err) => {
        setLocationError(true);
        console.log(err);
      });
  };

  const fetchData = () => {
    if (coords.length > 1) {
      console.log(coords);
      console.log(dispTime);
      let url = `${process.env.NEXT_PUBLIC_API_HOST}/user/event`;
      let eventBody = {
        title: title,
        description: description,
        dispDate: dispDate,
        numDate: parseInt(date.startStr.slice("-").replaceAll("-", "")),
        host: host,
        start: date.startStr,
        time: time,
        dispTime: dispTime,
        location: `${address} ${city} ${state} ${zip}`,
        coords: coords,
        maxGuests: maxGuests,
      };
      fetch(url, {
        method: "POST",
        body: JSON.stringify(eventBody),
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token")!,
        },
      }).catch((err) => setError(true));
      alert("Your event has been sent and is awaiting approval");
      closeEvent();
    }
  };
  useEffect(() => {
    fetchData();
  }, [coords]);

  const handleInputs = () => {
    return title &&
      description &&
      time &&
      host &&
      address &&
      city &&
      state &&
      zip ? (
      <button className="create-submit bg-yellow-500" onClick={eventSubmit}>
        Submit for Approval
      </button>
    ) : (
      <button
        disabled
        className="create-submit bg-yellow-500"
        onClick={eventSubmit}
      >
        Submit for Approval
      </button>
    );
  };
  return (
    <div>
      <form action="submit" className="createEvent-form">
        {error && <p className="error-text">Please enter the event title</p>}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="title"
          placeholder="Event Title"
          required
        />
        {error && (
          <p className="error-text">Please enter a description of the event</p>
        )}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="Description"
          placeholder="Event Description"
          required
        ></textarea>
        {error && (
          <p className="error-text">Please enter the name of the host</p>
        )}
        <input
          type="text"
          value={host}
          onChange={(e) => setHost(e.target.value)}
          className="Host rounded-sm"
          placeholder="Event Host"
          required
        />
        {error && (
          <p className="error-text">Please enter the time of the event</p>
        )}
        <input
          type="time"
          className="rounded-sm"
          onChange={(e) => setTime(e.target.value)}
          value={time}
        />
        {locationError && (
          <p className="error-text">
            Please enter the event&apos;s street address
          </p>
        )}
        <input
          type="text"
          className="rounded-sm"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Address"
        />
        {locationError && (
          <p className="error-text">Please enter the city of the event</p>
        )}
        <input
          type="text"
          className="rounded-sm"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="City"
        />
        {locationError && (
          <p className="error-text">Please enter the state of the event</p>
        )}
        <input
          type="text"
          className="rounded-sm"
          value={state}
          onChange={(e) => setState("Vt")}
          placeholder="State"
        />
        {locationError && (
          <p className="error-text">Please enter the zipcode of the event</p>
        )}
        <input
          type="text"
          className="rounded-sm"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
          placeholder="Zip Code"
        />
        <input
          type="number"
          className="rounded-sm"
          value={maxGuests}
          onChange={(e) => setMaxguests(e.target.value)}
          placeholder="Max attendees"
        />

        {handleInputs()}
      </form>
    </div>
  );
}

export default CreateEvent;
