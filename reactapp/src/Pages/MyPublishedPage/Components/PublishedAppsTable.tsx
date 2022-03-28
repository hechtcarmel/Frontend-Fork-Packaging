import React, { useMemo } from "react";
import AppData from "../../AppsPage/AppData";
import {
  useTable,
  useSortBy,
  usePagination,
  useGlobalFilter,
} from "react-table";

//import "./publishedTable.css";
import "./tablecss2.css";
import { GlobalFilter } from "./GlobalFilter";
import Button from "react";
interface PublishedAppsTableProps {
  publishedApps: AppData[];
}

export function PublishedAppsTable({ publishedApps }: PublishedAppsTableProps) {
  const columns = useMemo(
    () => [
      {
        Header: "App",
        accessor: "name",
      },
      {
        Header: "Rating",
        accessor: "rating",
      },
      {
        Header: "Price",
        accessor: "price",
      },
      {
        Header: "Publication Date",
        accessor: "publication_date",
        sortType: (a: any, b: any) => {
          let a1 = new Date(a.original.publication_date);
          let b1 = new Date(b.original.publication_date);
          if (a1 < b1) return 1;
          else if (a1 > b1) return -1;
          else return 0;
        },
      },
      {
        Header: "",
        accessor: "action",
        Cell: (value: any) => (
          <div>
            <button onClick={() => updateBtnHandler(value.cell.row.original)}>
              Update
            </button>
          </div>
        ),
      },
    ],
    []
  );
  const data = useMemo(() => publishedApps, [publishedApps]);

  const tableInstance = useTable(
    { columns: columns as any, data: data },
    useGlobalFilter,
    useSortBy,
    usePagination
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    setGlobalFilter,
  } = tableInstance;

  const { pageIndex, globalFilter } = state;

  const updateBtnHandler = (rowData: AppData) => {
    console.log("Row data to update: ", rowData);
  };

  return (
    <>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <table {...getTableProps()} className="published-table">
        <thead>
          {headerGroups.map((headerGroup) => {
            const { key } = headerGroup.getHeaderGroupProps();
            return (
              <tr key={key} {...headerGroup.getHeaderGroupProps}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? "🔽"
                          : "🔼"
                        : ""}
                    </span>
                  </th>
                ))}
              </tr>
            );
          })}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <span>
          Page{" "}
          <strong>
            {" "}
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <button
          onClick={() => previousPage()}
          className="table-nav-btn"
          disabled={!canPreviousPage}
        >
          {" < "}
        </button>
        <button
          onClick={() => nextPage()}
          className="table-nav-btn"
          disabled={!canNextPage}
        >
          {" > "}
        </button>
      </div>
    </>
  );
}
