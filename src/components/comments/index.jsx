// ** React Imports
import { useParams } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";

// ** Email App Component Imports
import Mails from "./Mails";
import Sidebar from "./Sidebar";

// ** Third Party Components
import classnames from "classnames";

// ** Styles
import "@styles/react/apps/app-email.scss";

const EmailApp = () => {
  // ** States
  const [query, setQuery] = useState("");
  const [openMail, setOpenMail] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [composeOpen, setComposeOpen] = useState(false);
  const [mails, setMails] = useState([]);
  const [selectedMail, setSelectedMail] = useState(null);

  // ** Toggle Compose Function
  const toggleCompose = () => setComposeOpen(!composeOpen);

  // ** Vars
  const params = useParams();

  // ** UseEffect: GET initial data on Mount
  useEffect(() => {
    // Mock data fetching function
    const fetchMails = () => {
      // Example fake data
      const fakeMails = [
        {
          id: 1,
          subject: "Welcome!",
          content: "Welcome to our service.",
          folder: "inbox",
        },
        {
          id: 2,
          subject: "Reminder",
          content: "Don't forget your appointment.",
          folder: "inbox",
        },
        // Add more fake mails as needed
      ];
      setMails(fakeMails);
    };
    fetchMails();
  }, [query, params.folder, params.label]);

  return (
    <Fragment>
      <Sidebar
        mails={mails}
        setMails={setMails}
        setOpenMail={setOpenMail}
        sidebarOpen={sidebarOpen}
        toggleCompose={toggleCompose}
        setSidebarOpen={setSidebarOpen}
        setSelectedMail={setSelectedMail}
      />
      <div className="content-right">
        <div className="content-body">
          <div
            className={classnames("body-content-overlay", {
              show: sidebarOpen,
            })}
            onClick={() => setSidebarOpen(false)}
          ></div>
          {/* Replace Mails component with MailList */}
          <Mails
            mails={mails}
            query={query}
            setQuery={setQuery}
            openMail={openMail}
            setOpenMail={setOpenMail}
            composeOpen={composeOpen}
            toggleCompose={toggleCompose}
            setSidebarOpen={setSidebarOpen}
            setSelectedMail={setSelectedMail}
            selectedMail={selectedMail}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default EmailApp;
