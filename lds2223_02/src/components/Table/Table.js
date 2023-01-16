import { PencilSquare, InfoCircle, XSquare, Eye } from "react-bootstrap-icons";
import React, { useMemo } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import {
  useTable,
  useSortBy,
  usePagination,
  useGlobalFilter,
} from "react-table";
import "./TableStyle.css";
import "./styles.scss";

function Table(props) {

  let history = useNavigate();

  let user = localStorage.getItem("LoggedUser");

  useEffect(() => {
    if (user === null) {

      history('/login', { replace: true });
  
    }
  }, [])

  var columns = props.infoToShow.map((info) => {
    return {
      Header: info,
      accessor: info,
    };
  });

  const updateInput = (ish) => {
    gotoPage(ish);
    document.getElementById("pageNumber").value = ish + 1;
    return;
  };
  columns = useMemo(() => columns, []);

  const tableInstance = useTable(
    {
      columns,
      data: props.data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    setGlobalFilter,
    setPageSize,
    gotoPage,
    pageCount,
    pageOptions,
    state,
    canNextPage,
    canPreviousPage,
    headerGroups,
    page,
    prepareRow,
  } = tableInstance;
  const { globalFilter, pageIndex, pageSize } = state;
  return (
    <div className="table-complete">
      <div className="table-header ">
        <InputGroup className="table-header-element">
          <InputGroup.Text id="basic-addon1">Show</InputGroup.Text>
          <Form.Select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            {[10, 25, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </Form.Select>
        </InputGroup>
        <InputGroup className="table-header-element">
          <Form.Control
            aria-describedby="search-addon"
            placeholder="Search"
            value={globalFilter || ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
          <InputGroup.Text id="basic-addon1">
            {" "}
            <i className="fas fa-search"></i>
          </InputGroup.Text>
        </InputGroup>
      </div>
      <div className="table-responsive">
        <table
          className="table table-hover  table-striped  table-sm"
          {...getTableProps()}
        >
          <thead className="thead-dark">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? "↓"
                          : "↑"
                        : "↓↑"}
                    </span>
                  </th>
                ))}
                <th colSpan={1}>Actions</th>
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    if (
                      props.dataHeader &&
                      cell.column.Header === props.dataHeader
                    ) {
                      const establishment = props.findIdInData(cell.value);

                      return (
                        <td className="td-class" {...cell.getCellProps()}>
                          {establishment.Name}
                          {" "}<span>{" "}
                            <Eye
                              fontSize={"x-large"}
                              cursor="pointer"
                              color="orange"
                              onClick={() => (
                                props.setButtonSecondInfo(true),
                                props.setElementInfo(establishment)
                              )}
                            />{" "}
                          </span>
                        </td>
                      );
                    } else {
                      return (
                        <td className="td-class" {...cell.getCellProps()}>
                          {cell.render("Cell")}
                        </td>
                      );
                    }
                  })}
                  <td className="td-actions">
                    <div className="actions">
                      <span>
                        <InfoCircle
                         data-bs-toggle="modal"
                         data-bs-target="infoModal"
                          fontSize={"x-large"}
                          cursor="pointer"
                          color="green"
                          onClick={() => (
                            props.setButtonPopupInfo(true),
                            props.setElementInfo(row.original)
                          )}
                        />{" "}
                      </span>
                      <span>
                        <PencilSquare
                          fontSize={"x-large"}
                          cursor="pointer"
                          color="blue"
                          onClick={() => (
                            props.setButtonPopupEdit(true),
                            props.setElementEdit(row.original)
                          )}
                        />
                      </span>
                      <span>
                        <XSquare
                          fontSize={"x-large"}
                          cursor="pointer"
                          color="red"
                          onClick={() => props.remove(row.original)}
                        />
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="table-footer">
        <div className="move-buttons">
          <button
            className="btn-table round"
            onClick={() => updateInput(0)}
            disabled={!canPreviousPage}
          >
            {"<<"}
          </button>
          <button
            className="btn-table round"
            onClick={() => updateInput(pageIndex - 1)}
            disabled={!canPreviousPage}
          >
            {"<"}
          </button>
        </div>
        <span>
          {" "}
          Page{" "}
          <input
            id="pageNumber"
            type="number"
            defaultValue={pageIndex + 1}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const pageNumber = e.target.value
                  ? Number(e.target.value) - 1
                  : 0;
                alert(pageNumber);
                if (pageNumber > pageCount) {
                  alert("Não existe dados suficientes");
                  updateInput(0);
                } else if (pageNumber < 0) {
                  alert("Input Invalido");
                  updateInput(0);
                } else {
                  updateInput(pageNumber);
                }
              }
            }}
            // onChange={(e) => {
            //   const pageNumber = e.target.value
            //     ? Number(e.target.value) - 1
            //     : 0;
            //   if (pageNumber > pageCount) {
            //     alert("Não existe dados suficientes");
            //     updateInput(0);
            //   } else {
            //     updateInput(pageNumber);
            //   }
            // }}
          />{" "}
          of <strong>{pageOptions.length}</strong>{" "}
        </span>
        <div className="move-buttons">
          <button
            className="btn-table previous round"
            onClick={() => updateInput(pageIndex + 1)}
            disabled={!canNextPage}
          >
            {">"}
          </button>
          <button
            className="btn-table previous round"
            onClick={() => updateInput(pageCount - 1)}
            disabled={!canNextPage}
          >
            {">>"}
          </button>
        </div>
      </div>
    </div>
  );
}
export default Table;
