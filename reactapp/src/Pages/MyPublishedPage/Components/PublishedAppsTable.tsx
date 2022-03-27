import React, { useMemo } from "react";
import AppData from "../../AppsPage/AppData";
import { useTable, useSortBy, usePagination } from "react-table";
import "./publishedTable.css";
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
        Header: "First PublishedPage",
        accessor: "publication_date",
        sortType: (a: any, b: any) => {
          let a1 = new Date(a.original.publication_date);
          let b1 = new Date(b.original.publication_date);
          if (a1 < b1) return 1;
          else if (a1 > b1) return -1;
          else return 0;
        },
      },
    ],
    []
  );
  const data = useMemo(() => publishedApps, [publishedApps]);

  const tableInstance = useTable(
    { columns: columns as any, data: data },
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
  } = tableInstance;

  const { pageIndex } = state;

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? "🔽" : "🔼") : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
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
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {" "}
          Previous{" "}
        </button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {" "}
          Next{" "}
        </button>
      </div>
    </>
  );
}
