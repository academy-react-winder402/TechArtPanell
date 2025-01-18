import React, { useState, useEffect } from "react";
import axios from "axios";
import AvatarGroup from "@components/avatar-group";
import { MoreVertical, Edit, Trash } from "react-feather";
import {
  Table,
  Badge,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from "reactstrap";
import CreateAppExample from "./addCourse/addCourse";

const TableBasic = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "https://classapi.sepehracademy.ir/api/Course/CourseList",
          {
            params: {
              PageNumber: 1,
              RowsOfPage: 10,
              SortingCol: "DESC",
              SortType: "Expire",
              Query: "",
            },
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjYjg2NjdkZS05MzRlLTQ4ZTItYWNiOC0wNDVjYWY2NTM1MzkiLCJqdGkiOiI1ZmM4ZmJkZi0zZWIzLTQwNDAtODI1ZC1iYWY1MDY3NjU3NTQiLCJlbWFpbCI6Im1hbGloZS5oYXNoZW1pMjAyMEBnbWFpbC5jb20iLCJVaWQiOiJQUTJyWStRMnM4S0lTa3Ewc0x1SXU1eUZLWDJWNkhEaWF6eDdrU041UEpVPUVzNzg4OTBjOTI4ZGMxYmEzMzAyYjdmODFmNjIwOGEwM2QyYjViZWI0YzkzMTQxMzc0YzlhZDQwNmFhYmY4YWFhN2I3YWQiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOlsiVGVhY2hlciIsIkFkbWluaXN0cmF0b3IiLCJTdHVkZW50IiwiU3VwcG9ydCJdLCJleHAiOjE3MTkyMTEzMjksImlzcyI6IlNlcGVockFjYWRlbXkiLCJhdWQiOiJTZXBlaHJBY2FkZW15In0.o-F6wm3TW5bZhuxOeThRyVOFpwhq409vtn_-7pqt6t0`,
            },
          }
        );
        setCourses(response.data.courseDtos); // تنظیم داده‌های دوره‌ها
      } catch (error) {
        console.error("خطا در دریافت دوره‌ها:", error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <>
      <CreateAppExample />
      <Table responsive>
        <thead>
          <tr>
            <th>نام درس</th>
            <th>نام استاد</th>
            <th>نوع</th>
            <th>وضعیت</th>
            <th>اقدامات</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course, index) => (
            <tr key={index}>
              <td>
                <img
                  className="me-75"
                  src={course.tumbImageAddress || "default_image_path"} // جایگزین با تصویر پیش‌فرض در صورت نبودن تصویر
                  alt={course.title}
                  height="20"
                  width="20"
                />
                <span className="align-middle fw-bold">{course.title}</span>
              </td>
              <td>{course.fullName}</td>
              <td>{course.typeName}</td>
              <td>
                <Badge pill color="light-primary" className="me-1">
                  {course.statusName}
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
                      <span className="align-middle">ویرایش</span>
                    </DropdownItem>
                    <DropdownItem href="/" onClick={(e) => e.preventDefault()}>
                      <Trash className="me-50" size={15} />{" "}
                      <span className="align-middle">حذف</span>
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

export default TableBasic;
