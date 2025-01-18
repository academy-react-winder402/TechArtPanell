import { Fragment, useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  FormGroup,
  Label,
} from "reactstrap";

const AddEventSidebar = ({ isOpen, toggle, saveEvent }) => {
  // Local state for event details
  const [eventTitle, setEventTitle] = useState("");
  const [eventDate, setEventDate] = useState("");

  // Function to handle saving the event
  const handleSave = () => {
    const eventData = {
      title: eventTitle,
      date: eventDate,
    };
    saveEvent(eventData); // Call saveEvent function from parent component
    toggle(); // Close the modal
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Add Event</ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label for="eventTitle">Event Title</Label>
          <Input
            type="text"
            id="eventTitle"
            placeholder="Enter event title"
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="eventDate">Event Date</Label>
          <Input
            type="date"
            id="eventDate"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
          />
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSave}>
          Save
        </Button>{" "}
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default AddEventSidebar;
