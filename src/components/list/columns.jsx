// ** React Imports
import { Fragment } from "react";
import { Link } from "react-router-dom";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Store & Actions
import { store } from "@store/store";
import { deleteInvoice } from "../store";

// ** Reactstrap Imports
import {
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledTooltip,
  UncontrolledDropdown,
} from "reactstrap";

// ** Third Party Components
import {
  Eye,
  Send,
  Edit,
  Copy,
  Save,
  Info,
  Trash,
  PieChart,
  Download,
  TrendingUp,
  CheckCircle,
  MoreVertical,
  ArrowDownCircle,
} from "react-feather";

// ** Vars
const invoiceStatusObj = {
  Sent: { color: "light-secondary", icon: Send },
  Paid: { color: "light-success", icon: CheckCircle },
  Draft: { color: "light-primary", icon: Save },
  Downloaded: { color: "light-info", icon: ArrowDownCircle },
  "Past Due": { color: "light-danger", icon: Info },
  "Partial Payment": { color: "light-warning", icon: PieChart },
};

// ** renders client column
const renderClient = (row) => {
  const stateNum = Math.floor(Math.random() * 6),
    states = [
      "light-success",
      "light-danger",
      "light-warning",
      "light-info",
      "light-primary",
      "light-secondary",
    ],
    color = states[stateNum];
};

// ** Table columns
export const columns = [
  {
    name: "نام ",
    sortable: true,
    sortField: "client",
    minWidth: "107px",
    // selector: row => row.id,
    cell: (row) => (
      <Link to={`/apps/invoice/preview/${row.client}`}>{`#${row.client}`}</Link>
    ),
  },
  {
    sortable: "اطلاعات پروفایل",
    minWidth: "102px",
    sortField: "invoiceStatus",
    name: "اطلاعات پروفایل",
    // selector: row => row.invoiceStatus,
    cell: (row) => {
      const color = invoiceStatusObj[row.invoiceStatus]
          ? invoiceStatusObj[row.invoiceStatus].color
          : "primary",
        Icon = invoiceStatusObj[row.invoiceStatus]
          ? invoiceStatusObj[row.invoiceStatus].icon
          : Edit;
      return (
        <Fragment>
          <Avatar
            color={color}
            icon={<Icon size={14} />}
            id={`av-tooltip-${row.id}`}
          />
          <UncontrolledTooltip placement="top" target={`av-tooltip-${row.id}`}>
            <span className="fw-bold">{row.invoiceStatus}</span>
            <br />
            <span className="fw-bold">Balance:</span> {row.balance}
            <br />
            <span className="fw-bold">Due Date:</span> {row.dueDate}
          </UncontrolledTooltip>
        </Fragment>
      );
    },
  },

  {
    sortable: true,
    minWidth: "200px",
    name: "Issued Date",
    sortField: "dueDate",
    cell: (row) => row.dueDate,
    // selector: row => row.dueDate
  },
  {
    sortable: true,
    name: "Balance",
    minWidth: "164px",
    sortField: "balance",
    // selector: row => row.balance,
    cell: (row) => {
      return row.balance !== 0 ? (
        <span>{row.balance}</span>
      ) : (
        <Badge color="light-success" pill>
          Paid
        </Badge>
      );
    },
  },
  {
    name: "Action",
    minWidth: "110px",
    cell: (row) => (
      <div className="column-action d-flex align-items-center">
        <Send
          className="cursor-pointer"
          size={17}
          id={`send-tooltip-${row.id}`}
        />
        <UncontrolledTooltip placement="top" target={`send-tooltip-${row.id}`}>
          Send Mail
        </UncontrolledTooltip>
        <Link
          to={`/apps/invoice/preview/${row.id}`}
          id={`pw-tooltip-${row.id}`}
        >
          <Eye size={17} className="mx-1" />
        </Link>
        <UncontrolledTooltip placement="top" target={`pw-tooltip-${row.id}`}>
          Preview Invoice
        </UncontrolledTooltip>
        <UncontrolledDropdown>
          <DropdownToggle tag="span">
            <MoreVertical size={17} className="cursor-pointer" />
          </DropdownToggle>
          <DropdownMenu end>
            <DropdownItem
              tag="a"
              href="/"
              className="w-100"
              onClick={(e) => e.preventDefault()}
            >
              <Download size={14} className="me-50" />
              <span className="align-middle">Download</span>
            </DropdownItem>
            <DropdownItem
              tag={Link}
              to={`/apps/invoice/edit/${row.id}`}
              className="w-100"
            >
              <Edit size={14} className="me-50" />
              <span className="align-middle">Edit</span>
            </DropdownItem>
            <DropdownItem
              tag="a"
              href="/"
              className="w-100"
              onClick={(e) => {
                e.preventDefault();
                store.dispatch(deleteInvoice(row.id));
              }}
            >
              <Trash size={14} className="me-50" />
              <span className="align-middle">Delete</span>
            </DropdownItem>
            <DropdownItem
              tag="a"
              href="/"
              className="w-100"
              onClick={(e) => e.preventDefault()}
            >
              <Copy size={14} className="me-50" />
              <span className="align-middle">Duplicate</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    ),
  },
];
