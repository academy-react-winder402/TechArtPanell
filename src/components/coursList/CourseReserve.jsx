import React, { useEffect, useState } from "react";
import axios from "axios";

// ** Custom Components
import AvatarGroup from "@components/avatar-group";

// ** Images
import react from "@src/assets/images/icons/react.svg";
import vuejs from "@src/assets/images/icons/vuejs.svg";
import angular from "@src/assets/images/icons/angular.svg";
import bootstrap from "@src/assets/images/icons/bootstrap.svg";
import avatar1 from "@src/assets/images/portrait/small/avatar-s-5.jpg";
import avatar2 from "@src/assets/images/portrait/small/avatar-s-6.jpg";
import avatar3 from "@src/assets/images/portrait/small/avatar-s-7.jpg";

// ** Icons Imports
import { MoreVertical, Edit, Trash } from "react-feather";

// ** Reactstrap Imports
import {
  Table,
  Badge,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from "reactstrap";
import CreateAppExample from "./addCourse/addCourse";

const CourseReserve = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios
      .get("https://classapi.sepehracademy.ir/api/CourseReserve", {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjYjg2NjdkZS05MzRlLTQ4ZTItYWNiOC0wNDVjYWY2NTM1MzkiLCJqdGkiOiI1ZmM4ZmJkZi0zZWIzLTQwNDAtODI1ZC1iYWY1MDY3NjU3NTQiLCJlbWFpbCI6Im1hbGloZS5oYXNoZW1pMjAyMEBnbWFpbC5jb20iLCJVaWQiOiJQUTJyWStRMnM4S0lTa3Ewc0x1SXU1eUZLWDJWNkhEaWF6eDdrU041UEpVPUVzNzg4OTBjOTI4ZGMxYmEzMzAyYjdmODFmNjIwOGEwM2QyYjViZWI0YzkzMTQxMzc0YzlhZDQwNmFhYmY4YWFhN2I3YWQiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOlsiVGVhY2hlciIsIkFkbWluaXN0cmF0b3IiLCJTdHVkZW50IiwiU3VwcG9ydCJdLCJleHAiOjE3MTkyMTEzMjksImlzcyI6IlNlcGVockFjYWRlbXkiLCJhdWQiOiJTZXBlaHJBY2FkZW15In0.o-F6wm3TW5bZhuxOeThRyVOFpwhq409vtn_-7pqt6t0`,
        },
      })
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  }, []);

  const iconMapper = {
    angular: angular,
    react: react,
    vuejs: vuejs,
    bootstrap: bootstrap,
  };

  return (
    <>
      <Table responsive>
        <thead>
          <tr>
            <th>نام درس</th>
            <th>نام استاد</th>
            <th>دانش آموزان</th>
            <th>وضعیت</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course, index) => (
            <tr key={index}>
              <td>
                <img
                  className="me-75"
                  src={iconMapper[course.icon]}
                  alt={course.icon}
                  height="20"
                  width="20"
                />
                <span className="align-middle fw-bold">
                  {course.studentName}
                </span>
              </td>
              <td>{course.instructor}</td>
              <td></td>
              <td>
                <Badge
                  pill
                  color={
                    course.status === "Active"
                      ? "light-primary"
                      : course.status === "Completed"
                      ? "light-success"
                      : course.status === "Scheduled"
                      ? "light-info"
                      : "light-warning"
                  }
                  className="me-1"
                >
                  {course.status}
                </Badge>
              </td>
              <td>
                <UncontrolledDropdown>
                  <DropdownToggle
                    className="icon-btn hide-arrow"
                    color="transparent"
                    size="sm"
                    caret
                  >
                    <MoreVertical size={15} />
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem href="/" onClick={(e) => e.preventDefault()}>
                      <Edit className="me-50" size={15} />{" "}
                      <span className="align-middle">Edit</span>
                    </DropdownItem>
                    <DropdownItem href="/" onClick={(e) => e.preventDefault()}>
                      <Trash className="me-50" size={15} />{" "}
                      <span className="align-middle">Delete</span>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default CourseReserve;
