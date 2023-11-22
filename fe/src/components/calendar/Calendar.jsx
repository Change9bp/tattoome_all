import React from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";

const Calendar = () => {
  const events = [
    {
      title: "Meeting importante",
      start: "2023-11-22T10:00:00",
      end: "2023-11-22T12:00:00",
    },
    {
      title: "Pranzo",
      start: "2023-11-23T12:30:00",
      end: "2023-11-23T13:30:00",
    },
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <FullCalendar
        plugins={[timeGridPlugin]}
        initialView="timeGridWeek"
        events={events}
      />
    </div>
  );
};

export default Calendar;
