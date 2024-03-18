"use client";
import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./calendar.css";
import DialogRenderer from "./dialogs";

function Calendar() {
  const [date, setDate] = useState("");
  const [dialog, setDialog] = useState({
    create: false,
    cal: false,
  });

  const toggleCalDialog = (_bool: boolean) => {
    setDialog({ ...dialog, cal: _bool });
  };
  const toggleCreateDialog = (_bool: boolean) => {
    setDialog({ ...dialog, create: _bool });
  };

  const [info, setInfo] = useState("");

  const [events, setEvents] = useState([]);
  const [showEvents, setShowEvents] = useState(false);

  const getEvents = () => {
    let url = `${process.env.NEXT_PUBLIC_API_HOST}/event/view/all`;

    fetch(url, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setEvents(data.allEvents.filter((e: any) => e.isApproved));
        setShowEvents(true);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getEvents();
  }, [showEvents]);

  const openEvent = () => {
    if (localStorage.getItem("token")) {
      toggleCreateDialog(true);
    }
  };

  const openInfo = () => toggleCalDialog(true);

  const handleEventClick = (clickInfo: any) => {
    setInfo(clickInfo);
    openInfo();
  };

  function handleDateSelect(selectInfo: any) {
    setDate(selectInfo);
    openEvent();
  }

  function renderEventContent(eventInfo: any) {
    return (
      <>
        <i className="calendar-event-text">{eventInfo.event.title}</i>
        <> {eventInfo.event._def.extendedProps.dispTime}</>
      </>
    );
  }

  return (
    <>
      <div className="calendar">
        <div id="calendar" className="calendar-main">
          <div className="instructionsIncluded">
            <p className="calendarInstructions">
              Sign Up Or Create An Event Today!
            </p>
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "",
              }}
              selectable={true}
              selectMirror={true}
              dayMaxEvents={true}
              select={handleDateSelect}
              eventContent={renderEventContent} // custom render function
              eventClick={handleEventClick}
              events={events}
            />
          </div>
        </div>
      </div>
      <div>
        {(dialog?.cal || dialog?.create) && (
          <DialogRenderer
            dialogInfo={dialog}
            toggleCalDialog={toggleCalDialog}
            toggleCreateDialog={toggleCreateDialog}
            setDialog={setDialog}
            info={info}
            date={date}
          />
        )}
      </div>
    </>
  );
}

export default Calendar;
