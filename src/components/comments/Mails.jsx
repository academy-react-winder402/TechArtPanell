import React, { Fragment, useState, useEffect } from "react";
import MailCard from "./MailCard";
import MailDetails from "./MailDetails";
import { formatDateToMonthShort } from "@utils";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Menu,
  Search,
  Folder,
  Tag,
  Mail,
  Trash,
  Edit2,
  Info,
} from "react-feather";
import {
  Input,
  Label,
  InputGroup,
  DropdownMenu,
  DropdownItem,
  InputGroupText,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import ComposePopup from "./ComposePopUP";

const Mails = ({
  query,
  setQuery,
  openMail,
  setOpenMail,
  composeOpen,
  toggleCompose,
  setSidebarOpen,
}) => {
  // ** States
  const [mails, setMails] = useState([]);
  const [selectedMails, setSelectedMails] = useState([]);
  const [currentMail, setCurrentMail] = useState(null);

  // ** Variables
  const labelColors = {
    personal: "success",
    company: "primary",
    important: "warning",
    private: "danger",
  };

  useEffect(() => {
    // Mock data fetching
    const fetchMails = () => {
      const fakeMails = [
        {
          id: 1,
          subject: "Welcome!",
          content: "Welcome to our service.",
          folder: "inbox",
          isRead: false,
        },
        {
          id: 2,
          subject: "Reminder",
          content: "Don't forget your appointment.",
          folder: "inbox",
          isRead: false,
        },
        // Add more fake mails as needed
      ];
      setMails(fakeMails);
    };
    fetchMails();
  }, []);

  // ** Handles Mail Click
  const handleMailClick = (mail) => {
    setCurrentMail(mail);
    setOpenMail(true);
  };

  // ** Handles Select All
  const handleSelectAll = (e) => {
    setSelectedMails(e.target.checked ? mails.map((mail) => mail.id) : []);
  };

  // ** Handles Folder Update
  const handleFolderUpdate = (e, folder) => {
    e.preventDefault();
    const updatedMails = mails.map((mail) =>
      selectedMails.includes(mail.id) ? { ...mail, folder } : mail
    );
    setMails(updatedMails);
    setSelectedMails([]);
  };

  // ** Handles Label Update
  const handleLabelsUpdate = (e, label) => {
    e.preventDefault();
    const updatedMails = mails.map((mail) =>
      selectedMails.includes(mail.id) ? { ...mail, label } : mail
    );
    setMails(updatedMails);
    setSelectedMails([]);
  };

  // ** Handles Mail Read Update
  const handleMailReadUpdate = (isRead) => {
    const updatedMails = mails.map((mail) =>
      selectedMails.includes(mail.id) ? { ...mail, isRead } : mail
    );
    setMails(updatedMails);
    setSelectedMails([]);
  };

  // ** Handles Move to Trash
  const handleMailToTrash = () => {
    handleFolderUpdate(null, "trash");
  };

  // ** Renders Mail
  const renderMails = () => {
    if (mails.length) {
      return mails.map((mail, index) => {
        return (
          <MailCard
            mail={mail}
            key={index}
            labelColors={labelColors}
            selectedMails={selectedMails}
            handleMailClick={handleMailClick}
            handleMailReadUpdate={handleMailReadUpdate}
            formatDateToMonthShort={formatDateToMonthShort}
            setSelectedMails={setSelectedMails}
          />
        );
      });
    }
  };

  return (
    <Fragment>
      <div className="email-app-list">
        <div className="app-fixed-search d-flex align-items-center">
          <div
            className="sidebar-toggle d-block d-lg-none ms-1"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size="21" />
          </div>
          <div className="d-flex align-content-center justify-content-between w-100">
            <InputGroup className="input-group-merge">
              <InputGroupText>
                <Search className="text-muted" size={14} />
              </InputGroupText>
              <Input
                id="email-search"
                placeholder="Search email"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </InputGroup>
          </div>
        </div>
        <div className="app-action">
          <div className="action-left form-check">
            <Input
              type="checkbox"
              id="select-all"
              onChange={handleSelectAll}
              checked={
                selectedMails.length && selectedMails.length === mails.length
              }
            />
            <Label
              className="form-check-label fw-bolder ps-25 mb-0"
              for="select-all"
            >
              Select All
            </Label>
          </div>
          {selectedMails.length ? (
            <div className="action-right">
              <ul className="list-inline m-0">
                <li className="list-inline-item me-1">
                  <UncontrolledDropdown>
                    <DropdownToggle tag="span">
                      <Folder size={18} />
                    </DropdownToggle>
                    <DropdownMenu end>
                      <DropdownItem
                        tag="a"
                        href="/"
                        onClick={(e) => handleFolderUpdate(e, "draft")}
                        className="d-flex align-items-center"
                      >
                        <Edit2 className="me-50" size={18} />
                        <span>Draft</span>
                      </DropdownItem>
                      <DropdownItem
                        tag="a"
                        href="/"
                        onClick={(e) => handleFolderUpdate(e, "spam")}
                        className="d-flex align-items-center"
                      >
                        <Info className="me-50" size={18} />
                        <span>Spam</span>
                      </DropdownItem>
                      <DropdownItem
                        tag="a"
                        href="/"
                        onClick={(e) => handleFolderUpdate(e, "trash")}
                        className="d-flex align-items-center"
                      >
                        <Trash className="me-50" size={18} />
                        <span>Trash</span>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </li>
                <li className="list-inline-item me-1">
                  <UncontrolledDropdown>
                    <DropdownToggle tag="span">
                      <Tag size={18} />
                    </DropdownToggle>
                    <DropdownMenu end>
                      <DropdownItem
                        tag="a"
                        href="/"
                        onClick={(e) => handleLabelsUpdate(e, "company")}
                        className="d-flex align-items-center"
                      >
                        <span className="bullet bullet-primary bullet-sm me-50" />
                        <span>Company</span>
                      </DropdownItem>
                      <DropdownItem
                        tag="a"
                        href="/"
                        onClick={(e) => handleLabelsUpdate(e, "important")}
                        className="d-flex align-items-center"
                      >
                        <span className="bullet bullet-warning bullet-sm me-50" />
                        <span>Important</span>
                      </DropdownItem>
                      <DropdownItem
                        tag="a"
                        href="/"
                        onClick={(e) => handleLabelsUpdate(e, "private")}
                        className="d-flex align-items-center"
                      >
                        <span className="bullet bullet-danger bullet-sm me-50" />
                        <span>Private</span>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </li>
                <li className="list-inline-item me-1">
                  <span
                    className="action-icon"
                    onClick={() => handleMailReadUpdate(false)}
                  >
                    <Mail size={18} />
                  </span>
                </li>
                <li className="list-inline-item">
                  <span
                    className="action-icon"
                    onClick={() => handleMailToTrash()}
                  >
                    <Trash size={18} />
                  </span>
                </li>
              </ul>
            </div>
          ) : null}
        </div>

        <PerfectScrollbar
          className="email-user-list"
          options={{ wheelPropagation: false }}
        >
          {mails.length ? (
            <ul className="email-media-list">{renderMails()}</ul>
          ) : (
            <div className="no-results d-block">
              <h5>No Items Found</h5>
            </div>
          )}
        </PerfectScrollbar>
      </div>
      <MailDetails
        openMail={openMail}
        mail={currentMail}
        labelColors={labelColors}
        setOpenMail={setOpenMail}
      />
      <ComposePopup composeOpen={composeOpen} toggleCompose={toggleCompose} />
    </Fragment>
  );
};

export default Mails;
