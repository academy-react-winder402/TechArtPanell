// ** ایمپورت های React
import { Link } from "react-router-dom";
import { useState } from "react";

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
} from "react-feather";

// ** ایمپورت‌های Reactstrap
import {
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

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

const UsersTable = () => {
  const [users, setUsers] = useState(initialUsers);

  const handleDeleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleGetUser = (id) => {
    // اینجا می‌توانید منطق گرفتن جزئیات کاربر را پیاده‌سازی کنید
    console.log("جزئیات کاربر با آی‌دی:", id);
  };

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
            <small className="text-truncate text-muted mb-0">{row.email}</small>
          </div>
        </div>
      ),
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
      name: "طرح",
      minWidth: "138px",
      sortable: true,
      sortField: "currentPlan",
      selector: (row) => row.currentPlan,
      cell: (row) => <span className="text-capitalize">{row.currentPlan}</span>,
    },
    {
      name: "پرداخت",
      minWidth: "230px",
      sortable: true,
      sortField: "billing",
      selector: (row) => row.billing,
      cell: (row) => <span className="text-capitalize">{row.billing}</span>,
    },
    {
      name: "وضعیت",
      minWidth: "138px",
      sortable: true,
      sortField: "status",
      selector: (row) => row.status,
      cell: (row) => (
        <Badge className="text-capitalize" color={statusObj[row.status]} pill>
          {row.status}
        </Badge>
      ),
    },
    {
      name: "عملیات",
      minWidth: "100px",
      cell: (row) => (
        <div className="column-action">
          <UncontrolledDropdown>
            <DropdownToggle tag="div" className="btn btn-sm">
              <MoreVertical size={14} className="cursor-pointer" />
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem
                tag={Link}
                className="w-100"
                to={`/apps/user/view/${row.id}`}
                onClick={() => handleGetUser(row.id)}
              >
                <FileText size={14} className="me-50" />
                <span className="align-middle">جزئیات</span>
              </DropdownItem>
              <DropdownItem
                tag="a"
                href="/"
                className="w-100"
                onClick={(e) => e.preventDefault()}
              >
                <Archive size={14} className="me-50" />
                <span className="align-middle">ویرایش</span>
              </DropdownItem>
              <DropdownItem
                tag="a"
                href="/"
                className="w-100"
                onClick={(e) => {
                  e.preventDefault();
                  handleDeleteUser(row.id);
                }}
              >
                <Trash2 size={14} className="me-50" />
                <span className="align-middle">حذف</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      ),
    },
  ];

  return (
    <div>{/* در اینجا جدول را با ستون‌ها و داده‌های کاربران رندر کنید */}</div>
  );
};

export default UsersTable;
