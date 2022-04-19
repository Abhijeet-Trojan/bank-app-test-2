import React, { useState, useEffect, useMemo, useContext } from "react";
import axios from "axios";
import {
  useGlobalFilter,
  useTable,
  usePagination,
  useRowSelect,
} from "react-table";
import tw from "twin.macro";
import BankFilter from "./BankFilter";
import { GlobalContext } from "./context/GlobalState";
import CityDropdown from "./CityDropdown";

const Table = tw.table`
  table-fixed
  text-base
  text-gray-900
  border-2
  border-solid
`;

const TableHead = tw.thead`
  p-2
`;

const TableRow = tw.tr`
border
border-green-500
`;

const TableHeader = tw.th`
border
border-green-500
p-2
`;

const TableBody = tw.tbody`
`;

const TableData = tw.td`
border-2
border-green-500
p-5

`;

const Button = tw.button`
  pl-4
  pr-4
  pt-2
  pb-2
  text-black
  rounded-md
  bg-green-400
`;

export const BankSearch = () => {
  const { addBankToFavourites, favourites } = useContext(GlobalContext);

  const [banks, setBanks] = useState([]);

  let storeBank = favourites.find((o) => o.id === banks.id);

  const favouritesDisabled = storeBank ? true : false;

  const fetchBanks = async () => {
    const response = await axios
      .get("https://vast-shore-74260.herokuapp.com/banks?city=MUMBAI")
      .catch((err) => console.log(err));

    if (response) {
      const banks = response.data;

      console.log("Banks: ", banks);
      setBanks(banks);
    }
  };

  const banksData = useMemo(() => [...banks], [banks]);

  const banksColumns = useMemo(
    () =>
      banks[0]
        ? Object.keys(banks[0])
            .filter((key) => key !== "rating")
            .map((key) => {
              return { Header: key, accessor: key };
            })
        : [],
    [banks]
  );

  const tableHooks = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        id: "Fav",
        Header: "Mark Favourite Bank",
        Cell: ({ row }) => (
          <div className="controls">
            <button
              className="btn"
              disabled={favouritesDisabled}
              onClick={() => addBankToFavourites(row.original)}
            >
              Add To Favourites
            </button>
          </div>
        ),
      },
    ]);
  };

  const tableInstance = useTable(
    {
      columns: banksColumns,
      data: banksData,
    },
    useGlobalFilter,
    usePagination,
    tableHooks,
    useRowSelect
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    setPageSize,
    prepareRow,
    preGlobalFilteredRows,
    setGlobalFilter,
    state,
  } = tableInstance;

  useEffect(() => {
    fetchBanks();
  }, []);

  const { pageIndex, pageSize } = state;

  return (
    <>
    <CityDropdown />
      <BankFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        setGlobalFilter={setGlobalFilter}
        globalFilter={state.globalFilter}
      />
      <Table {...getTableProps()}>
        <TableHead>
          {headerGroups.map((headerGroups) => (
            <TableRow {...headerGroups.getHeaderGroupProps()}>
              {headerGroups.headers.map((columns) => (
                <TableHeader {...columns.getHeaderProps()}>
                  {columns.render("Header")}
                </TableHeader>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {page.map((row, idx) => {
            prepareRow(row);
            return (
              <TableRow
                {...row.getRowProps()}
                onClick={() => console.log(row.original)}
              >
                {row.cells.map((cell, idx) => {
                  return (
                    <TableData {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </TableData>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <div className="pagination-style">
        <span className="pageOf">
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <select
          className="pageSelect"
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[5, 10, 15, 20, 25].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
        <Button className="prev-btn" onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </Button>
        <Button className="next-btn" onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </Button>
      </div>
    </>
  );
};
