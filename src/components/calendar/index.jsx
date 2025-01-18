import { Fragment, useState } from "react";
import { Row, Col } from "reactstrap";
import Calendar from "./Calendar";
import SidebarLeft from "./SidebarLeft";
import AddEventSidebar from "./AddEventSidebar";
import illustration from "@src/assets/images/pages/calendar-illustration.png";

const CalendarComponent = () => {
  const [events, setEvents] = useState([]);

  const [addEventSidebarOpen, setAddEventSidebarOpen] = useState(false);
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);

  const handleAddEventSidebar = () => {
    setAddEventSidebarOpen(true);
  };

  const toggleSidebar = (val) => {
    setLeftSidebarOpen(val);
  };

  return (
    <Fragment>
      <div className="app-calendar overflow-hidden border">
        <Row className="g-0">
          <Col
            id="app-calendar-sidebar"
            className={`col app-calendar-sidebar flex-grow-0 overflow-hidden d-flex flex-column ${
              leftSidebarOpen ? "show" : ""
            }`}
          >
            <SidebarLeft setEvents={setEvents} />
          </Col>
          <Col className="position-relative">
            <Calendar events={events} setEvents={setEvents} />
          </Col>
          <div
            className={`body-content-overlay ${leftSidebarOpen ? "show" : ""}`}
            onClick={() => toggleSidebar(false)}
          ></div>
        </Row>
      </div>
      <AddEventSidebar
        isOpen={addEventSidebarOpen}
        toggle={() => setAddEventSidebarOpen(!addEventSidebarOpen)}
      />
    </Fragment>
  );
};

export default CalendarComponent;
