"use client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import React, { useCallback, useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import EventPopup from "./EventPopup";

const EventsList = () => {
  const [events, setEvents] = useState([]);
  const [isApproved, setIsApproved] = useState(false);
  const [openEvent, setOpenEvent] = useState<any>({
    bool: false,
    info: null,
  });

  const closeEvent = (_: any) => setOpenEvent({ bool: false, info: null });

  const handleOpenMessage = (eventInfo: any) => {
    setOpenEvent({ bool: true, info: eventInfo });
  };

  const fetchEventsList = useCallback(() => {
    let url = `${process.env.NEXT_PUBLIC_API_HOST}/event/view/all`;
    fetch(url, {
      method: "GET",
      headers: new Headers({
        "Content-type": "application/json",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data);
        setEvents(
          data.allEvents.filter((event: any) => event.isApproved === isApproved)
        );
      })
      .catch((err) => console.log(err));
  }, []);

  const deleteConfirm = (e: any) => {
    if (window.confirm(`Are you sure you want to delete ${e.email}?`)) {
      deleteEvent(e);
    }
  };

  const deleteEvent = (e: any) => {
    let url = `${process.env.NEXT_PUBLIC_API_HOST}/admin/event/${e._id}`;

    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token")!,
      },
    })
      .then((res: any) => {
        fetchEventsList();
      })
      .catch((err) => console.log("err", err));
  };

  useEffect(() => {
    fetchEventsList();
  }, [isApproved, fetchEventsList]);

  return (
    <div className="w-full">
      <h3 className="text-4xl font-bold text-navyblue text-center my-2">
        All Events
      </h3>
      <div className="mt-6 p-4 bg-lightblue w-fit m-auto max-h-[70vh] min-w-[452px] overflow-scroll ring-1 ring-navyblue rounded-lg">
        <button
          className="text-navyblue hover:bg-yellow-400 bg-yellow-500 p-2 rounded-lg ring-1 ring-navyblue uppercase text-lg"
          onClick={() => {
            setIsApproved(!isApproved);
            setEvents([]);
          }}
        >
          {!isApproved ? "view active events" : "view pending events"}
        </button>
        <ul>
          {events?.map((event: any) => (
            <li
              className="flex items-start m-auto justify-between rounded-md bg-white my-2 p-2 w-[420px]"
              key={event?.title}
              onDoubleClick={() => {
                handleOpenMessage(event);
              }}
            >
              <p>{event?.title}</p>
              <div className="">
                <button onClick={() => deleteConfirm(event)}>
                  <MdDeleteForever className="text-xl text-red-500" />
                </button>
              </div>
            </li>
          ))}
        </ul>
        <Dialog open={openEvent?.bool} onOpenChange={closeEvent}>
          <DialogContent className="bg-blue text-white">
            <EventPopup
              eventInfo={openEvent?.info}
              fetchEventsList={fetchEventsList}
              closeEvent={closeEvent}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default EventsList;
