// ** ایمپورت های React
import { Link } from "react-router-dom";
import { useState, useEffect, Fragment } from "react";

// ** کامپوننت‌های سفارشی
import Avatar from "@components/avatar";

// ** ایمپورت آیکون‌ها
import {
  Slack,
  User,
  Settings,
  Database,
  Edit2,
  MoreVertical,
  FileText,
  Trash2,
  Archive,
  ChevronDown,
  Share,
  Printer,
  File,
  Grid,
  Copy,
} from "react-feather";

// ** ایمپورت‌های Reactstrap
import {
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Row,
  Col,
  Card,
  Input,
  Label,
  Button,
  CardBody,
  CardTitle,
  CardHeader,
} from "reactstrap";

// ** ایمپورت‌های اضافی
import Select from "react-select";
import ReactPaginate from "react-paginate";
import DataTable from "react-data-table-component";
import { selectThemeColors } from "@utils";

// ** داده‌های ساختگی
const initialUsers = [
  {
    id: 1,
    fullName: "جان دو",
    username: "johndoe",
    email: "john.doe@example.com",
    role: "admin",
    avatar: "",
    avatarColor: "light-primary",
    currentPlan: "enterprise",
    billing: "auto debit",
    status: "active",
    country: "United States",
    contact: "(123) 456-7890",
    company: "Company Pvt Ltd",
  },
  {
    id: 1,
    fullName: "جان دو",
    username: "johndoe",
    email: "john.doe@example.com",
    role: "admin",
    avatar: "",
    avatarColor: "light-primary",
    currentPlan: "enterprise",
    billing: "auto debit",
    status: "active",
    country: "United States",
    contact: "(123) 456-7890",
    company: "Company Pvt Ltd",
  },
  {
    id: 1,
    fullName: "جان دو",
    username: "johndoe",
    email: "john.doe@example.com",
    role: "admin",
    avatar: "",
    avatarColor: "light-primary",
    currentPlan: "enterprise",
    billing: "auto debit",
    status: "active",
    country: "United States",
    contact: "(123) 456-7890",
    company: "Company Pvt Ltd",
  },
  {
    id: 1,
    fullName: "جان دو",
    username: "johndoe",
    email: "john.doe@example.com",
    role: "admin",
    avatar: "",
    avatarColor: "light-primary",
    currentPlan: "enterprise",
    billing: "auto debit",
    status: "active",
    country: "United States",
    contact: "(123) 456-7890",
    company: "Company Pvt Ltd",
  },
  // داده‌های ساختگی بیشتری می‌توانید اضافه کنید
];

// ** رندر ستون کاربر
const renderClient = (row) => {
  if (row.avatar.length) {
    return <Avatar className="me-1" img={row.avatar} width="32" height="32" />;
  } else {
    return (
      <Avatar
        initials
        className="me-1"
        color={row.avatarColor || "light-primary"}
        content={row.fullName || "جان دو"}
      />
    );
  }
};

// ** رندر ستون نقش
const renderRole = (row) => {
  const roleObj = {
    subscriber: {
      class: "text-primary",
      icon: User,
    },
    maintainer: {
      class: "text-success",
      icon: Database,
    },
    editor: {
      class: "text-info",
      icon: Edit2,
    },
    author: {
      class: "text-warning",
      icon: Settings,
    },
    admin: {
      class: "text-danger",
      icon: Slack,
    },
  };

  const Icon = roleObj[row.role] ? roleObj[row.role].icon : Edit2;

  return (
    <span className="text-truncate text-capitalize align-middle">
      <Icon
        size={18}
        className={`${roleObj[row.role] ? roleObj[row.role].class : ""} me-50`}
      />
      {row.role}
    </span>
  );
};

// ** اشیای وضعیت
const statusObj = {
  pending: "light-warning",
  active: "light-success",
  inactive: "light-secondary",
};

// ** Table Header
const CustomHeader = ({
  toggleSidebar,
  handlePerPage,
  rowsPerPage,
  handleFilter,
  searchTerm,
}) => {
  // ** Converts table to CSV
  function convertArrayOfObjectsToCSV(array) {
    let result;

    const columnDelimiter = ",";
    const lineDelimiter = "\n";
    const keys = Object.keys(array[0]);

    result = "";
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    array.forEach((item) => {
      let ctr = 0;
      keys.forEach((key) => {
        if (ctr > 0) result += columnDelimiter;

        result += item[key];

        ctr++;
      });
      result += lineDelimiter;
    });

    return result;
  }

  // ** Downloads CSV
  function downloadCSV(array) {
    const link = document.createElement("a");
    let csv = convertArrayOfObjectsToCSV(array);
    if (csv === null) return;

    const filename = "export.csv";

    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`;
    }

    link.setAttribute("href", encodeURI(csv));
    link.setAttribute("download", filename);
    link.click();
  }

  return (
    <div className="invoice-list-table-header w-100 me-1 ms-50 mt-2 mb-75">
      <Row>
        <Col xl="6" className="d-flex align-items-center p-0">
          <div className="d-flex align-items-center w-100">
            <label htmlFor="rows-per-page">Show</label>
            <Input
              className="mx-50"
              type="select"
              id="rows-per-page"
              value={rowsPerPage}
              onChange={handlePerPage}
              style={{ width: "5rem" }}
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </Input>
            <label htmlFor="rows-per-page">Entries</label>
          </div>
        </Col>
        <Col
          xl="6"
          className="d-flex align-items-sm-center justify-content-xl-end justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 mt-xl-0 mt-1"
        >
          <div className="d-flex align-items-center mb-sm-0 mb-1 me-1">
            <label className="mb-0" htmlFor="search-invoice">
              Search:
            </label>
            <Input
              id="search-invoice"
              className="ms-50 w-100"
              type="text"
              value={searchTerm}
              onChange={(e) => handleFilter(e.target.value)}
            />
          </div>

          <div className="d-flex align-items-center table-header-actions">
            <UncontrolledDropdown className="me-1">
              <DropdownToggle color="secondary" caret outline>
                <Share className="font-small-4 me-50" />
                <span className="align-middle">Export</span>
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem className="w-100">
                  <Printer className="font-small-4 me-50" />
                  <span className="align-middle">Print</span>
                </DropdownItem>
                <DropdownItem
                  className="w-100"
                  onClick={() => downloadCSV(initialUsers)}
                >
                  <FileText className="font-small-4 me-50" />
                  <span className="align-middle">CSV</span>
                </DropdownItem>
                <DropdownItem className="w-100">
                  <Grid className="font-small-4 me-50" />
                  <span className="align-middle">Excel</span>
                </DropdownItem>
                <DropdownItem className="w-100">
                  <File className="font-small-4 me-50" />
                  <span className="align-middle">PDF</span>
                </DropdownItem>
                <DropdownItem className="w-100">
                  <Copy className="font-small-4 me-50" />
                  <span className="align-middle">Copy</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>

            <Button
              className="add-new-user"
              color="primary"
              onClick={toggleSidebar}
            >
              Add New User
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

const UsersTable = () => {
  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleDeleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleGetUser = (id) => {
    console.log("جزئیات کاربر با آی‌دی:", id);
  };

  const handlePerPage = (e) => {
    setRowsPerPage(parseInt(e.currentTarget.value));
  };

  const handleFilter = (val) => {
    setSearchTerm(val);
  };

  const filteredData = users.filter(
    (user) =>
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      name: "کاربر",
      sortable: true,
      minWidth: "300px",
      sortField: "fullName",
      selector: (row) => row.fullName,
      cell: (row) => (
        <div className="d-flex justify-content-left align-items-center">
          {renderClient(row)}
          <div className="d-flex flex-column">
            <Link
              to={`/apps/user/view/${row.id}`}
              className="user_name text-truncate text-body"
              onClick={() => handleGetUser(row.id)}
            >
              <span className="fw-bolder">{row.fullName}</span>
            </Link>
            <small className="text-truncate text-muted mb-0">
              @{row.username}
            </small>
          </div>
        </div>
      ),
    },
    {
      name: "ایمیل",
      sortable: true,
      minWidth: "320px",
      sortField: "email",
      selector: (row) => row.email,
      cell: (row) => <span className="text-capitalize">{row.email}</span>,
    },
    {
      name: "نقش",
      sortable: true,
      minWidth: "172px",
      sortField: "role",
      selector: (row) => row.role,
      cell: (row) => renderRole(row),
    },
    {
      name: "وضعیت",
      sortable: true,
      minWidth: "150px",
      sortField: "status",
      selector: (row) => row.status,
      cell: (row) => (
        <Badge className="text-capitalize" color={statusObj[row.status]} pill>
          {row.status}
        </Badge>
      ),
    },
    {
      name: "اقدامات",
      minWidth: "100px",
      cell: (row) => (
        <UncontrolledDropdown>
          <DropdownToggle tag="div" className="btn btn-sm">
            <MoreVertical size={14} className="cursor-pointer" />
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem
              tag={Link}
              to={`/apps/user/view/${row.id}`}
              className="w-100"
              onClick={() => handleGetUser(row.id)}
            >
              <FileText size={14} className="me-50" />
              <span className="align-middle">جزئیات</span>
            </DropdownItem>
            <DropdownItem
              tag={Link}
              to={`/apps/user/edit/${row.id}`}
              className="w-100"
            >
              <Archive size={14} className="me-50" />
              <span className="align-middle">ویرایش</span>
            </DropdownItem>
            <DropdownItem
              className="w-100"
              onClick={() => handleDeleteUser(row.id)}
            >
              <Trash2 size={14} className="me-50" />
              <span className="align-middle">حذف</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      ),
    },
  ];

  const CustomPagination = () => {
    const count = Number(Math.ceil(filteredData.length / rowsPerPage));

    return (
      <ReactPaginate
        previousLabel={""}
        nextLabel={""}
        pageCount={count || 1}
        activeClassName="active"
        forcePage={0}
        onPageChange={() => {}}
        pageClassName={"page-item"}
        nextLinkClassName={"page-link"}
        nextClassName={"page-item next"}
        previousClassName={"page-item prev"}
        previousLinkClassName={"page-link"}
        pageLinkClassName={"page-link"}
        containerClassName={
          "pagination react-paginate justify-content-end my-2 pe-1"
        }
      />
    );
  };

  return (
    <Fragment>
      <Card>
        <CardHeader>
          <CardTitle tag="h4">فیلتر‌ها</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md="4">
              <Label for="role-select">نقش</Label>
              <Select
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                theme={selectThemeColors}
                options={[
                  { value: "admin", label: "Admin" },
                  { value: "editor", label: "Editor" },
                  { value: "author", label: "Author" },
                  { value: "subscriber", label: "Subscriber" },
                ]}
              />
            </Col>
            <Col className="my-md-0 my-1" md="4">
              <Label for="plan-select">طرح</Label>
              <Select
                theme={selectThemeColors}
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                options={[
                  { value: "basic", label: "Basic" },
                  { value: "company", label: "Company" },
                  { value: "enterprise", label: "Enterprise" },
                  { value: "team", label: "Team" },
                ]}
              />
            </Col>
            <Col md="4">
              <Label for="status-select">وضعیت</Label>
              <Select
                theme={selectThemeColors}
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                options={[
                  { value: "active", label: "Active" },
                  { value: "pending", label: "Pending" },
                  { value: "inactive", label: "Inactive" },
                ]}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>

      <Card className="overflow-hidden">
        <div className="react-dataTable">
          <DataTable
            noHeader
            subHeader
            pagination
            responsive
            paginationServer
            columns={columns}
            sortIcon={<ChevronDown />}
            className="react-dataTable"
            paginationComponent={CustomPagination}
            data={filteredData}
            subHeaderComponent={
              <CustomHeader
                searchTerm={searchTerm}
                rowsPerPage={rowsPerPage}
                handleFilter={handleFilter}
                handlePerPage={handlePerPage}
                toggleSidebar={toggleSidebar}
              />
            }
          />
        </div>
      </Card>
    </Fragment>
  );
};

export default UsersTable;
