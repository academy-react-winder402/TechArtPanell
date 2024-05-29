import { Input, Label } from "reactstrap";
import { Star, Paperclip } from "react-feather";
import classnames from "classnames";

const MailCard = (props) => {
  // ** Props
  const {
    mail,
    selectMail,
    labelColors,
    selectedMails,
    handleMailClick,
    handleMailReadUpdate,
    formatDateToMonthShort,
    handleStarClick,
  } = props;

  // ** Function to render labels
  const renderLabels = (arr) => {
    if (arr && arr.length) {
      return arr.map((label) => (
        <span
          key={label}
          className={`bullet bullet-${labelColors[label]} bullet-sm mx-50`}
        ></span>
      ));
    }
  };

  // ** Function to handle mail click
  const onMailClick = () => {
    handleMailClick(mail.id);
    handleMailReadUpdate([mail.id], true);
  };

  // ** Formatting options for date
  const formatting = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  };

  return (
    <li onClick={() => onMailClick(mail.id)}>
      <div className="mail-left pe-50">
        <div className="user-action">
          <div className="form-check">
            <Input
              type="checkbox"
              id={`${mail.from?.name}-${mail.id}`}
              onChange={(e) => e.stopPropagation()}
              checked={selectedMails.includes(mail.id)}
              onClick={(e) => {
                selectMail(mail.id);
                e.stopPropagation();
              }}
            />
            <Label
              onClick={(e) => e.stopPropagation()}
              for={`${mail.from?.name}-${mail.id}`}
            ></Label>
          </div>
          <div
            className="email-favorite"
            onClick={(e) => {
              e.stopPropagation();
              handleStarClick(mail.id);
            }}
          >
            <Star
              size={14}
              className={classnames({
                favorite: mail.isStarred,
              })}
            />
          </div>
        </div>
      </div>
      <div className="mail-body">
        <div className="mail-details">
          <div className="mail-items">
            <h5 className="mb-25">{mail.from?.name}</h5>
            <span className="text-truncate">{mail.subject}</span>
          </div>
          {/* <div className="mail-meta-item">
            {mail.attachments && mail.attachments.length ? (
              <Paperclip size={14} />
            ) : null}
            {renderLabels(mail.labels)}
            <span className="mail-date">
              {new Intl.DateTimeFormat("en-US", formatting).format(
                new Date(mail.time)
              )}
            </span>
          </div> */}
        </div>
        <div className="mail-message">
          {/* <p className="text-truncate mb-0">{htmlToString(mail.message)}</p> */}
        </div>
      </div>
    </li>
  );
};

export default MailCard;
