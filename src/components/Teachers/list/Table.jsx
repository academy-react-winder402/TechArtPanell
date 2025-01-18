import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import Avatar from "@components/avatar";
import {
  MoreVertical,
  FileText,
  Trash2,
  Archive,
  ChevronDown,
} from "react-feather";
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
import Select from "react-select";
import ReactPaginate from "react-paginate";
import DataTable from "react-data-table-component";
import { selectThemeColors } from "@utils";
import axios from "axios";

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    axios
      .get("https://classapi.sepehracademy.ir/api/Home/GetTeachers", {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjYjg2NjdkZS05MzRlLTQ4ZTItYWNiOC0wNDVjYWY2NTM1MzkiLCJqdGkiOiI1ZmM4ZmJkZi0zZWIzLTQwNDAtODI1ZC1iYWY1MDY3NjU3NTQiLCJlbWFpbCI6Im1hbGloZS5oYXNoZW1pMjAyMEBnbWFpbC5jb20iLCJVaWQiOiJQUTJyWStRMnM4S0lTa3Ewc0x1SXU1eUZLWDJWNkhEaWF6eDdrU041UEpVPUVzNzg4OTBjOTI4ZGMxYmEzMzAyYjdmODFmNjIwOGEwM2QyYjViZWI0YzkzMTQxMzc0YzlhZDQwNmFhYmY4YWFhN2I3YWQiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOlsiVGVhY2hlciIsIkFkbWluaXN0cmF0b3IiLCJTdHVkZW50IiwiU3VwcG9ydCJdLCJleHAiOjE3MTkyMTEzMjksImlzcyI6IlNlcGVockFjYWRlbXkiLCJhdWQiOiJTZXBlaHJBY2FkZW15In0.o-F6wm3TW5bZhuxOeThRyVOFpwhq409vtn_-7pqt6t0",
        },
      })
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleDeleteUser = (id) => {
    setUsers(users.filter((user) => user.teacherId !== id));
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
      (user.fullName &&
        user.fullName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (user.linkdinProfileLink &&
        user.linkdinProfileLink
          .toLowerCase()
          .includes(searchTerm.toLowerCase()))
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
              to={`/apps/user/view/${row.teacherId}`}
              className="user_name text-truncate text-body"
              onClick={() => handleGetUser(row.teacherId)}
            >
              <span className="fw-bolder">{row.fullName}</span>
            </Link>
          </div>
        </div>
      ),
    },
    {
      name: "پروفایل لینکدین",
      sortable: true,
      minWidth: "320px",
      sortField: "linkdinProfileLink",
      selector: (row) => row.linkdinProfileLink,
      cell: (row) => (
        <a href={row.linkdinProfileLink}>{row.linkdinProfileLink}</a>
      ),
    },
    {
      name: "عکس پروفایل",
      sortable: true,
      minWidth: "150px",
      sortField: "pictureAddress",
      selector: (row) => row.pictureAddress,
      cell: (row) =>
        row.pictureAddress && row.pictureAddress !== "Not-set" ? (
          <img
            src={row.pictureAddress.replace(/\\/g, "/")}
            alt={row.fullName}
            width="50"
            height="50"
          />
        ) : (
          "Not-set"
        ),
    },
    {
      name: "تعداد دوره‌ها",
      sortable: true,
      minWidth: "150px",
      sortField: "courseCounts",
      selector: (row) => row.courseCounts,
      cell: (row) => <span>{row.courseCounts}</span>,
    },
    {
      name: "تعداد اخبار",
      sortable: true,
      minWidth: "150px",
      sortField: "newsCount",
      selector: (row) => row.newsCount,
      cell: (row) => <span>{row.newsCount}</span>,
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
              to={`/apps/user/view/${row.teacherId}`}
              className="w-100"
              onClick={() => handleGetUser(row.teacherId)}
            >
              <FileText size={14} className="me-50" />
              <span className="align-middle">جزئیات</span>
            </DropdownItem>
            <DropdownItem
              tag={Link}
              to={`/apps/user/edit/${row.teacherId}`}
              className="w-100"
            >
              <Archive size={14} className="me-50" />
              <span className="align-middle">ویرایش</span>
            </DropdownItem>
            <DropdownItem
              className="w-100"
              onClick={() => handleDeleteUser(row.teacherId)}
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
                  { value: "maintainer", label: "Maintainer" },
                  { value: "subscriber", label: "Subscriber" },
                ]}
              />
            </Col>
            <Col md="4">
              <Label for="plan-select">نوع عضویت</Label>
              <Select
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                theme={selectThemeColors}
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
                  { value: "pending", label: "Pending" },
                  { value: "active", label: "Active" },
                  { value: "inactive", label: "Inactive" },
                ]}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>
      <DataTable
        noHeader
        pagination
        subHeader
        responsive
        paginationServer
        columns={columns}
        sortIcon={<ChevronDown size={10} />}
        className="react-dataTable"
        data={filteredData}
        paginationComponent={CustomPagination}
        subHeaderComponent={
          <CustomHeader
            handlePerPage={handlePerPage}
            rowsPerPage={rowsPerPage}
            searchTerm={searchTerm}
            handleFilter={handleFilter}
            toggleSidebar={toggleSidebar}
          />
        }
      />
    </Fragment>
  );
};

const renderClient = (row) => {
  const color = row.avatarColor;
  if (row.pictureAddress && row.pictureAddress !== "Not-set") {
    return (
      <Avatar
        className="me-1"
        img={row.pictureAddress.replace(/\\/g, "/")}
        width="32"
        height="32"
      />
    );
  } else {
    return (
      <Avatar
        color={color || "primary"}
        className="me-1"
        content={row.fullName || "Unknown"}
        initials
      />
    );
  }
};

const CustomHeader = ({
  handlePerPage,
  rowsPerPage,
  searchTerm,
  handleFilter,
  toggleSidebar,
}) => {
  return (
    <div className="invoice-list-table-header w-100 me-1 ms-50 mt-2 mb-75">
      <Row>
        <Col xl="6" className="d-flex align-items-center p-0">
          <div className="d-flex align-items-center w-100">
            <label htmlFor="rows-per-page">نمایش</label>
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
          </div>
        </Col>
        <Col
          xl="6"
          className="d-flex align-items-sm-center justify-content-xl-end justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column p-0 mt-xl-0 mt-1"
        >
          <div className="d-flex align-items-center mb-sm-0 mb-1 me-1">
            <label className="mb-0" htmlFor="search-invoice">
              جستجو:
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
            <Button
              className="add-new-user"
              color="primary"
              onClick={toggleSidebar}
            >
              افزودن کاربر جدید
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default UsersTable;
