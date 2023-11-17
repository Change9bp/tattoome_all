import React from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";

const Calendar = () => {
  return <FullCalendar plugins={[timeGridPlugin]} initialView="timeGridWeek" />;
};

export default Calendar;
