import { useEffect, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import listPlugin from "@fullcalendar/list";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import toast from "react-hot-toast";
import { Menu } from "react-feather";
import { Card, CardBody } from "reactstrap";

const Calendar = ({ events, setEvents }) => {
  const calendarRef = useRef(null);

  const [calendarApi, setCalendarApi] = useState(null);
  const [addEventSidebarOpen, setAddEventSidebarOpen] = useState(false);

  useEffect(() => {
    if (calendarApi === null && calendarRef.current) {
      setCalendarApi(calendarRef.current.getApi());
    }
  }, [calendarApi]);

  const handleAddEventSidebar = () => {
    setAddEventSidebarOpen(true);
  };

  const calendarOptions = {
    events: events.length ? events : [],
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
    initialView: "dayGridMonth",
    headerToolbar: {
      start: "sidebarToggle, prev,next, title",
      end: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
    },
    editable: true,
    eventResizableFromStart: true,
    dragScroll: true,
    dayMaxEvents: 2,
    navLinks: true,
    eventClassNames({ event: calendarEvent }) {
      return [`bg-light-${calendarEvent.color}`];
    },
    eventClick({ event: clickedEvent }) {
      toast.success(`Clicked event: ${clickedEvent.title}`);
    },
    customButtons: {
      sidebarToggle: {
        text: <Menu className="d-xl-none d-block" />,
        click() {
          handleAddEventSidebar();
        },
      },
    },
    dateClick(info) {
      const newEvent = {
        title: "New Event",
        start: info.dateStr,
        end: info.dateStr,
        color: "primary",
      };
      setEvents([...events, newEvent]);
      toast.success("New event added");
    },
    ref: calendarRef,
  };

  return (
    <Card className="shadow-none border-0 mb-0 rounded-0">
      <CardBody className="pb-0">
        <FullCalendar {...calendarOptions} />
      </CardBody>
    </Card>
  );
};

export default Calendar;
