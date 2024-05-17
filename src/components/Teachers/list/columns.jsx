// ** React Imports
import React, { useState } from "react";
import { Link } from "react-router-dom";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Icons Imports
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

// ** Reactstrap Imports
import {
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

// ** Mock data
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
  // Add more mock users as needed
];

// ** Renders Client Columns
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

// ** Renders Role Columns
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

  return (
    <div className="table-responsive">
      <table className="table table-hover mb-0">
        <thead>
          <tr>
            <th>کاربر</th>
            <th>نقش</th>
            <th>طرح</th>
            <th>پرداخت</th>
            <th>وضعیت</th>
            <th>عملیات</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <div className="d-flex justify-content-left align-items-center">
                  {renderClient(user)}
                  <div className="d-flex flex-column">
                    <Link
                      to={`/apps/user/view/${user.id}`}
                      className="user_name text-truncate text-body"
                    >
                      <span className="fw-bolder">{user.fullName}</span>
                    </Link>
                    <small className="text-truncate text-muted mb-0">
                      {user.email}
                    </small>
                  </div>
                </div>
              </td>
              <td>{renderRole(user)}</td>
              <td>
                <span className="text-capitalize">{user.currentPlan}</span>
              </td>
              <td>
                <span className="text-capitalize">{user.billing}</span>
              </td>
              <td>
                <Badge
                  className="text-capitalize"
                  color={statusObj[user.status]}
                  pill
                >
                  {user.status}
                </Badge>
              </td>
              <td>
                <div className="column-action">
                  <UncontrolledDropdown>
                    <DropdownToggle tag="div" className="btn btn-sm">
                      <MoreVertical size={14} className="cursor-pointer" />
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem
                        tag={Link}
                        to={`/apps/user/view/${user.id}`}
                      >
                        <FileText size={14} className="me-50" />
                        <span className="align-middle">جزئیات</span>
                      </DropdownItem>
                      <DropdownItem
                        href="/"
                        onClick={(e) => e.preventDefault()}
                      >
                        <Archive size={14} className="me-50" />
                        <span className="align-middle">ویرایش</span>
                      </DropdownItem>
                      <DropdownItem
                        href="/"
                        onClick={(e) => {
                          e.preventDefault();
                          handleDeleteUser(user.id);
                        }}
                      >
                        <Trash2 size={14} className="me-50" />
                        <span className="align-middle">حذف</span>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
