import React, { useState, useEffect } from "react";
import axios from "axios";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [value, setValue] = useState("");
  const [statusValue, setStatusValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://classapi.sepehracademy.ir/api/User/UserMannage",
        {
          params: {
            PageNumber: currentPage - 1,
            RowsOfPage: rowsPerPage,
            SortingCol: "DESC",
            SortType: "InsertDate",
            Query: value,
            IsActiveUser: true,
            IsDeletedUser: true,
            roleId: 1,
          },
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjYjg2NjdkZS05MzRlLTQ4ZTItYWNiOC0wNDVjYWY2NTM1MzkiLCJqdGkiOiI1ZmM4ZmJkZi0zZWIzLTQwNDAtODI1ZC1iYWY1MDY3NjU3NTQiLCJlbWFpbCI6Im1hbGloZS5oYXNoZW1pMjAyMEBnbWFpbC5jb20iLCJVaWQiOiJQUTJyWStRMnM4S0lTa3Ewc0x1SXU1eUZLWDJWNkhEaWF6eDdrU041UEpVPUVzNzg4OTBjOTI4ZGMxYmEzMzAyYjdmODFmNjIwOGEwM2QyYjViZWI0YzkzMTQxMzc0YzlhZDQwNmFhYmY4YWFhN2I3YWQiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOlsiVGVhY2hlciIsIkFkbWluaXN0cmF0b3IiLCJTdHVkZW50IiwiU3VwcG9ydCJdLCJleHAiOjE3MTkyMTEzMjksImlzcyI6IlNlcGVockFjYWRlbXkiLCJhdWQiOiJTZXBlaHJBY2FkZW15In0.o-F6wm3TW5bZhuxOeThRyVOFpwhq409vtn_-7pqt6t0",
          },
        }
      );
      setUsers(response.data.listUser);
      setFilteredUsers(response.data.listUser);
      setRoles(response.data.roles);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleFilter = (value) => {
    setValue(value);
    filterUsers(value, statusValue);
  };

  const handleStatusValue = (value) => {
    setStatusValue(value);
    filterUsers(value, value);
  };

  const filterUsers = (query, status) => {
    let filtered = users.filter((user) => {
      return (
        user.gmail.toLowerCase().includes(query.toLowerCase()) &&
        (status === "" || user.userRoles === status)
      );
    });
    setFilteredUsers(filtered);
  };

  const handlePagination = (page) => {
    setCurrentPage(page.selected + 1);
  };

  const CustomPagination = () => {
    const pageCount = Math.ceil(filteredUsers.length / rowsPerPage);

    return (
      <div className="pagination mt-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() =>
            setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
          }
        >
          Previous
        </button>
        {Array.from({ length: pageCount }, (_, index) => (
          <button
            key={index}
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
              currentPage === index + 1 ? "bg-blue-700" : ""
            }`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() =>
            setCurrentPage((prevPage) => Math.min(prevPage + 1, pageCount))
          }
        >
          Next
        </button>
      </div>
    );
  };

  return (
    <div className="user-list container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">لیست کاربران</h1>
      <input
        type="text"
        className="border border-gray-400 rounded py-2 px-4 mb-4"
        placeholder="جستجو بر اساس Gmail"
        value={value}
        onChange={(e) => handleFilter(e.target.value)}
      />
      <select
        className="border border-gray-400 rounded py-2 px-4 mb-4"
        value={statusValue}
        onChange={(e) => handleStatusValue(e.target.value)}
      >
        <option value="">انتخاب نقش</option>
        {roles.map((role) => (
          <option key={role.id} value={role.roleName}>
            {role.roleName}
          </option>
        ))}
      </select>
      <table className="w-full border-collapse border border-gray-400">
        <thead className="bg-gray-200">
          <tr>
            <th className="border border-gray-400 py-2 px-4">شناسه</th>
            <th className="border border-gray-400 py-2 px-4">ایمیل</th>
            <th className="border border-gray-400 py-2 px-4">شماره تلفن</th>
            <th className="border border-gray-400 py-2 px-4">تاریخ ثبت</th>
            <th className="border border-gray-400 py-2 px-4">
              درصد تکمیل پروفایل
            </th>
            <th className="border border-gray-400 py-2 px-4">جنسیت</th>
            <th className="border border-gray-400 py-2 px-4">نقش کاربری</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id} className="bg-white">
              <td className="border border-gray-400 py-2 px-4">{user.id}</td>
              <td className="border border-gray-400 py-2 px-4">{user.gmail}</td>
              <td className="border border-gray-400 py-2 px-4">
                {user.phoneNumber}
              </td>
              <td className="border border-gray-400 py-2 px-4">
                {new Date(user.insertDate).toLocaleString()}
              </td>
              <td className="border border-gray-400 py-2 px-4">
                {user.profileCompletionPercentage}
              </td>
              <td className="border border-gray-400 py-2 px-4">
                {user.gender ? "مرد" : "زن"}
              </td>
              <td className="border border-gray-400 py-2 px-4">
                {user.userRoles}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <CustomPagination />
    </div>
  );
};

export default UserList;
