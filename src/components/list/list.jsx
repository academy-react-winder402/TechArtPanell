// ** React Imports
import React, { useState } from "react";
import { Link } from "react-router-dom";

// ** Table Columns
import { columns } from "./columns";

// ** Third Party Components
import ReactPaginate from "react-paginate";
import { ChevronDown } from "react-feather";
import DataTable from "react-data-table-component";

// ** Reactstrap Imports
import { Button, Input, Row, Col, Card } from "reactstrap";

// ** Styles
import "@styles/react/apps/app-invoice.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";

// ** نمونه داده‌های محلی
const sampleData = [
  {
    id: 1,
    invoiceId: "INV001",
    client: "a ملیحه  ",
    status: "Paid",
  },
  {
    id: 2,
    invoiceId: "INV002",
    client: "ملیحه b",
    status: "Draft",
  },
  {
    id: 3,
    invoiceId: "INV003",
    client: "فاطمه قدمی C",
    status: "Sent",
  },
  {
    id: 4,
    invoiceId: "INV004",
    client: "مهدی D",
    status: "Partial Payment",
  },
  // داده‌های بیشتر در صورت نیاز...
];

const CustomHeader = ({
  handleFilter,
  value,
  handleStatusValue,
  statusValue,
  handlePerPage,
  rowsPerPage,
}) => {
  return (
    <div className="invoice-list-table-header w-100 py-2">
      <Row>
        <Col lg="6" className="d-flex align-items-center px-0 px-lg-1">
          <div className="d-flex align-items-center me-2">
            <label htmlFor="rows-per-page">Show</label>
            <Input
              type="select"
              id="rows-per-page"
              value={rowsPerPage}
              onChange={handlePerPage}
              className="form-control ms-50 pe-3"
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </Input>
          </div>
          <Button tag={Link} to="/add" color="primary">
            Add Record
          </Button>
        </Col>
        <Col
          lg="6"
          className="actions-right d-flex align-items-center justify-content-lg-end flex-lg-nowrap flex-wrap mt-lg-0 mt-1 pe-lg-1 p-0"
        >
          <div className="d-flex align-items-center">
            <label htmlFor="search-invoice">Search</label>
            <Input
              id="search-invoice"
              className="ms-50 me-2 w-100"
              type="text"
              value={value}
              onChange={(e) => handleFilter(e.target.value)}
              placeholder="Search Invoice"
            />
          </div>
          <Input
            className="w-auto "
            type="select"
            value={statusValue}
            onChange={handleStatusValue}
          >
            <option value="">Select Status</option>
            <option value="downloaded">Downloaded</option>
            <option value="draft">Draft</option>
            <option value="paid">Paid</option>
            <option value="partial payment">Partial Payment</option>
            <option value="past due">Past Due</option>
            <option value="sent">Sent</option>
          </Input>
        </Col>
      </Row>
    </div>
  );
};

const InvoiceList = () => {
  const [value, setValue] = useState("");
  const [sort, setSort] = useState("desc");
  const [sortColumn, setSortColumn] = useState("id");
  const [currentPage, setCurrentPage] = useState(1);
  const [statusValue, setStatusValue] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleFilter = (val) => {
    setValue(val);
  };

  const handlePerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value));
  };

  const handleStatusValue = (e) => {
    setStatusValue(e.target.value);
  };

  const handlePagination = (page) => {
    setCurrentPage(page.selected + 1);
  };

  const CustomPagination = () => {
    const count = Math.ceil(sampleData.length / rowsPerPage);

    return (
      <ReactPaginate
        nextLabel=""
        breakLabel="..."
        previousLabel=""
        pageCount={count || 1}
        activeClassName="active"
        breakClassName="page-item"
        pageClassName="page-item"
        breakLinkClassName="page-link"
        nextLinkClassName="page-link"
        pageLinkClassName="page-link"
        nextClassName="page-item next"
        previousLinkClassName="page-link"
        previousClassName="page-item prev"
        onPageChange={handlePagination}
        forcePage={currentPage - 1}
        containerClassName="pagination react-paginate justify-content-end p-1"
      />
    );
  };

  const dataToRender = () => {
    const filters = {
      q: value,
      status: statusValue,
    };

    const isFiltered = Object.keys(filters).some((k) => filters[k]);

    let data = sampleData;

    if (filters.q) {
      data = data.filter((item) =>
        item.invoiceId.toLowerCase().includes(filters.q.toLowerCase())
      );
    }

    if (filters.status) {
      data = data.filter(
        (item) => item.status.toLowerCase() === filters.status.toLowerCase()
      );
    }

    return data.slice(
      (currentPage - 1) * rowsPerPage,
      currentPage * rowsPerPage
    );
  };

  const handleSort = (column, sortDirection) => {
    setSort(sortDirection);
    setSortColumn(column.sortField);
  };

  return (
    <div className="invoice-list-wrapper">
      <Card>
        <div className="invoice-list-dataTable react-dataTable">
          <DataTable
            noHeader
            pagination
            sortServer
            paginationServer
            subHeader
            columns={columns}
            responsive
            onSort={handleSort}
            data={dataToRender()}
            sortIcon={<ChevronDown />}
            className="react-dataTable"
            defaultSortField="invoiceId"
            paginationDefaultPage={currentPage}
            paginationComponent={CustomPagination}
            subHeaderComponent={
              <CustomHeader
                value={value}
                statusValue={statusValue}
                rowsPerPage={rowsPerPage}
                handleFilter={handleFilter}
                handlePerPage={handlePerPage}
                handleStatusValue={handleStatusValue}
              />
            }
          />
        </div>
      </Card>
    </div>
  );
};

export default InvoiceList;
