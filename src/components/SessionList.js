import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import {
  DEFAULT_FILTER,
  DEFAULT_PAGE,
  DEFAULT_SORT_STATE,
} from "../utils/const";
import { getNewSessions } from "../utils/urlUtils";
import FilterComponents from "./FilterComponents";

export default function SessionList({ onSessionClick }) {
  //TODO: merge these page state variables into a single object?
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortState, setSortState] = useState(DEFAULT_SORT_STATE);
  const [filterType, setFilterType] = useState();
  const [filter, setFilter] = useState(DEFAULT_FILTER);
  const [sessions, setSessions] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    //starts by getting all sessions and displaying them.
    const getSessionIds = async () => {
      try {
        const sessionData = await getNewSessions(
          page,
          rowsPerPage,
          filterType,
          filter,
          sortState
        );

        const count = Number(sessionData.count);
        const sessionInfo = sessionData.sessions;

        setCount(count);
        setSessions(sessionInfo);
      } catch (error) {
        console.log(error.message);
      }
    };

    getSessionIds();
  }, [page, rowsPerPage, sortState, filter, filterType]);

  //assums that we have filter params in the url of the page we're on
  //route is /sessions?whatever params we want
  // const [searchParams] = useSearchParams();

  //manually implement filtering?
  // const filterTag = searchParams.get("filter");

  //if we filter by something new (ie, click an option in the sidebar), go to
  //the first page by default
  // useEffect(() => {
  //   setPage(DEFAULT_PAGE);
  // }, [filterTag]);

  const handleChangePage = async (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = async (event) => {
    let newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(DEFAULT_PAGE);
  };

  const headers = [
    { id: "sessionId", label: "Session Id" },
    { id: "date", label: "Date" },
    { id: "length", label: "Length" },
  ];

  const makeHandleSort = (id) => {
    return () => {
      let newSortOrder;
      if (sortState.sortBy === id) {
        newSortOrder =
          sortState.sortOrder === "ascending" ? "descending" : "ascending";
      } else {
        newSortOrder = "descending";
      }
      const sortObj = {
        sortBy: id,
        sortOrder: newSortOrder,
      };
      setSortState(sortObj);
      setPage(0);
    };
  };

  const getDirection = (id) => {
    if (sortState.sortBy === id) {
      return sortState.sortOrder === "descending" ? "desc" : "asc";
    } else {
      return "desc";
    }
  };

  return (
    <div className="sessionList">
      <FilterComponents
        filter={filter}
        setFilter={setFilter}
        setSessions={setSessions}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setSortState={setSortState}
        filterType={filterType}
        setFilterType={setFilterType}
      />

      <TableContainer
        sx={{
          ml: "60px",
          mt: "10px",
          mr: "60px",
          width: "auto",
          boxShadow: 1,
        }}
        component={Paper}>
        <Table sx={{ minWidth: 350 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {headers.map(({ label, id }) => {
                return (
                  <TableCell key={id}>
                    <TableSortLabel
                      active={id === sortState.sortBy}
                      direction={getDirection(id)}
                      onClick={makeHandleSort(id)}>
                      {label}
                    </TableSortLabel>
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {sessions.map((session) => (
              <TableRow
                key={session.sessionId}
                data-id={session.sessionId}
                sx={{
                  "&:hover": {
                    backgroundColor: "#ECEFF4",
                    cursor: "pointer",
                  },
                }}
                onClick={onSessionClick}>
                <TableCell>{session.sessionId}</TableCell>
                <TableCell>{session.date}</TableCell>
                <TableCell>{session.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                count={count}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10]}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
}
