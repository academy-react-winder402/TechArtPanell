import { Fragment, useState } from "react";
import classnames from "classnames";
import { Card, CardBody, Button, Input, Label } from "reactstrap";
import illustration from "@src/assets/images/pages/calendar-illustration.png";

const SidebarLeft = ({ setEvents }) => {
  const [addEventSidebarOpen, setAddEventSidebarOpen] = useState(false);

  const handleAddEventClick = () => {
    setAddEventSidebarOpen(true);
  };

  const filters = [
    { label: "Personal", color: "danger" },
    { label: "Business", color: "primary" },
    { label: "Family", color: "warning" },
    { label: "Holiday", color: "success" },
    { label: "ETC", color: "info" },
  ];

  return (
    <Fragment>
      <Card className="sidebar-wrapper shadow-none">
        <CardBody className="card-body d-flex justify-content-center my-sm-0 mb-3">
          {/* <Button color="primary" block onClick={handleAddEventClick}>
            <span className="align-middle">Add Event</span>
          </Button> */}
        </CardBody>
        <CardBody>
          <h5 className="section-label mb-1">
            <span className="align-middle">Filter</span>
          </h5>
          <div className="calendar-events-filter">
            {filters.map((filter) => (
              <div
                key={filter.label}
                className={classnames("form-check", {
                  [`form-check-${filter.color}`]: true,
                })}
              >
                <Input
                  type="checkbox"
                  id={`filter-${filter.label}`}
                  checked={false}
                  onChange={() => {}}
                />
                <Label for={`filter-${filter.label}`}>{filter.label}</Label>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
      <div className="mt-auto">
        <img className="img-fluid" src={illustration} alt="illustration" />
      </div>
    </Fragment>
  );
};

export default SidebarLeft;
