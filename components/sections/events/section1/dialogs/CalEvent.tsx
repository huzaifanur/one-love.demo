import React, { useState } from "react";
import EventMap from "./EventMap";
import "./calEvent.css";
import { MdLocationPin } from "react-icons/md";
import { BsClockFill } from "react-icons/bs";
import { FaHouseUser } from "react-icons/fa";

function CalEvent({ closeInfo, info }: any) {
  const title = info?.event ? info.event?._def?.title : info?.title;
  const desc = info?.event
    ? info.event?._def?.extendedProps?.description
    : info.description;
  const host = info?.event ? info.event?._def?.extendedProps.host : info?.host;
  const time = info?.event
    ? info.event._def?.extendedProps?.dispTime
    : info.dispTime;
  const location = info?.event
    ? info.event?._def?.extendedProps?.location
    : info.location;
  const coords = info?.event
    ? info.event?._def?.extendedProps?.coords
    : info.coords;
  const attendees = info?.event
    ? info.event?._def?.extendedProps?.attendees
    : info.attendees;
  const maxGuests = info?.event
    ? info.event?._def?.extendedProps?.maxGuests
    : info?.maxGuests;
  const _id = info?.event ? info.event?._def?.extendedProps?._id : info?._id;

  const [guest, setGuest] = useState("");

  const addGuest = (e: any) => {
    e.preventDefault();

    let url = `${process.env.NEXT_PUBLIC_API_HOST}/event/addguest/${_id}`;
    let guestBody = {
      attendees: guest,
    };
    fetch(url, {
      method: "PUT",
      body: JSON.stringify(guestBody),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    }).catch((err) => console.log(err));
    closeInfo();
  };

  const rsvp = () => {
    return attendees?.length >= maxGuests ? (
      "Event at maximum capacity"
    ) : (
      <form action="submit" className="rsvp-form">
        <input
          className="rsvp-input"
          type="text"
          value={guest}
          placeholder="Enter Your Name"
          onChange={(e) => setGuest(e.target.value)}
        />
        <button className="rsvp-submit" onClick={addGuest}>
          RSVP
        </button>
      </form>
    );
  };

  const guestsDef = () => {
    return maxGuests !== 999 ? (
      <div>
        This event has {attendees?.length}/{maxGuests} attendee(s)
      </div>
    ) : null;
  };

  return (
    <div className="cal-event-container text-white">
      <h1 className="text-3xl">{title}</h1>
      <h4 className="cal-event-desc">{desc}</h4>
      <div className="cal-event-details">
        <div className="flex items-center">
          <FaHouseUser className="cal-host-icon mr-1" /> <span>{host}</span>
        </div>
        <div className="flex items-center">
          <BsClockFill className="cal-clock-icon mr-1" /> <span>{time}</span>
        </div>
      </div>
      <div className="cal-event-location flex mt-[2px]">
        <MdLocationPin className="cal-event-pin " />
        <span className="text-sm">{location}</span>
      </div>
      {guestsDef()}
      <div className="cal-event-rsvp">{rsvp()}</div>
      <EventMap coords={coords} />
    </div>
  );
}

export default CalEvent;
