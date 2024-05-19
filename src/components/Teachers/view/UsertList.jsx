import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import {
  ChevronDown,
  ExternalLink,
  Printer,
  FileText,
  File,
  Clipboard,
  Copy,
} from "react-feather";
import {
  Card,
  CardTitle,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledButtonDropdown,
} from "reactstrap";
import "@styles/react/apps/app-invoice.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";

const fakeData = [
  {
    id: 1,
    invoiceId: 1,
    client: "John Doe",
    total: "$1000",
    status: "Paid",
  },
  {
    id: 2,
    invoiceId: 2,
    client: "Jane Smith",
    total: "$2000",
    status: "Pending",
  },
  // داده‌های فیک بیشتر
];

const columns = [
  { name: "Invoice ID", selector: (row) => row.invoiceId, sortable: true },
  { name: "Client", selector: (row) => row.client, sortable: true },
  { name: "Total", selector: (row) => row.total, sortable: true },
  { name: "Status", selector: (row) => row.status, sortable: true },
];

const InvoiceList = () => {
  const [data, setData] = useState([]);
  const [sort, setSort] = useState("desc");
  const [sortColumn, setSortColumn] = useState("id");

  useEffect(() => {
    // جایگزین کردن با فراخوانی API واقعی
    setData(fakeData);
  }, []);

  const handleSort = (column, sortDirection) => {
    setSort(sortDirection);
    setSortColumn(column.sortField);
    const sortedData = [...data].sort((a, b) => {
      if (sortDirection === "asc") {
        return a[column.selector] > b[column.selector] ? 1 : -1;
      }
      return a[column.selector] < b[column.selector] ? 1 : -1;
    });
    setData(sortedData);
  };

  return (
    <div className="invoice-list-wrapper">
      <Card>
        <CardHeader className="py-1">
          <CardTitle tag="h4">فاکتورها</CardTitle>
          <UncontrolledButtonDropdown>
            <DropdownToggle color="secondary" outline caret>
              <ExternalLink className="font-small-4 me-50" />
              <span>خروجی</span>
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem className="w-100">
                <Printer className="font-small-4 me-50" />
                <span>چاپ</span>
              </DropdownItem>
              <DropdownItem className="w-100">
                <FileText className="font-small-4 me-50" />
                <span>CSV</span>
              </DropdownItem>
              <DropdownItem className="w-100">
                <File className="font-small-4 me-50" />
                <span>Excel</span>
              </DropdownItem>
              <DropdownItem className="w-100">
                <Clipboard className="font-small-4 me-50" />
                <span>PDF</span>
              </DropdownItem>
              <DropdownItem className="w-100">
                <Copy className="font-small-4 me-50" />
                <span>کپی</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledButtonDropdown>
        </CardHeader>
        <div className="invoice-list-dataTable react-dataTable">
          <DataTable
            noHeader
            sortServer
            columns={columns}
            responsive={true}
            onSort={handleSort}
            data={data}
            sortIcon={<ChevronDown />}
            className="react-dataTable"
            defaultSortField="invoiceId"
          />
        </div>
      </Card>
    </div>
  );
};

export default InvoiceList;
