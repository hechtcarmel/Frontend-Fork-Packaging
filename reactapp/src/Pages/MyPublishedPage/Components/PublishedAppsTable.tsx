import React, { useMemo } from "react";
import AppData from "../../AppsPage/AppData";
import { useTable, useSortBy } from "react-table";
import "./table.css";
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
        Header: "First Published",
        accessor: "publication_date",
      },
    ],
    []
  );
  const data = useMemo(() => publishedApps, [publishedApps]);

  const tableInstance = useTable(
    { columns: columns as any, data: data },
    useSortBy
  );
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
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
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
