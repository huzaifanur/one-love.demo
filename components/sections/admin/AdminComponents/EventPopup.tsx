import React from "react";
import { BsCheckLg } from "react-icons/bs";
import { FaRegTrashAlt } from "react-icons/fa";

function EventPopup({ eventInfo, closeEvent, fetchEventsList }: any) {
  const title = eventInfo?.title;
  const desc = eventInfo?.description;
  const host = eventInfo?.host;
  const time = eventInfo?.dispTime;
  const attendees = eventInfo?.attendees;
  const location = eventInfo?.location;
  const id = eventInfo?._id;
  const isApproved = eventInfo?.isApproved;

  const deleteEvent = () => {
    let url = `${process.env.NEXT_PUBLIC_API_HOST}/admin/event/${id}`;

    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token")!,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        closeEvent(res);
        fetchEventsList();
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const approveEvent = () => {
    let url = `${process.env.NEXT_PUBLIC_API_HOST}/admin/event/${id}`;
    let approved = isApproved ? false : true;

    fetch(url, {
      method: "PUT",
      body: JSON.stringify({ isApproved: approved }),
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token")!,
      },
    })
      .then((res) => {
        closeEvent(res);
        fetchEventsList();
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const deleteConfirm = () => {
    if (window.confirm(`Are you sure you want to delete this event?`)) {
      deleteEvent();
    }
  };

  const approveConfirm = () => {
    if (window.confirm(`Are you sure you want to approve this event?`)) {
      approveEvent();
    }
  };

  const toggleApproved = () => {
    return !isApproved ? (
      <button
        className="bg-green-500 flex items-center p-2 rounded-md text-white"
        onClick={approveConfirm}
      >
        Approve Event <BsCheckLg className="text-white ml-2" />
      </button>
    ) : null;
  };

  return (
    <div>
      <div>
        <b>Event:</b> {title}
      </div>
      <div>
        <b>Description:</b> {desc}
      </div>
      <div>
        <b>Host:</b> {host}
      </div>
      <div>
        <b>Time:</b> {time}
      </div>
      <div>
        <b>Location:</b> {location}
      </div>
      <div>
        <b>Attendees:</b> {attendees?.join(", ")}
      </div>
      <div className="flex justify-between mt-2">
        {toggleApproved()}
        <button
          className="bg-red-500 flex items-center p-2 rounded-md text-white"
          onClick={deleteConfirm}
        >
          Delete Event <FaRegTrashAlt className="text-white ml-2" />
        </button>
      </div>
    </div>
  );
}

export default EventPopup;
