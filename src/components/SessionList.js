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
import { useNavigate } from "react-router-dom";
import SessionFilter from "./SessionFilter";
import {
  DEFAULT_FILTER,
  DEFAULT_LIMIT,
  DEFAULT_PAGE,
  DEFAULT_SORT_STATE,
} from "../utils/const";
import { getNewSessions } from "../utils/urlUtils";
import { msToTime } from "../utils/formatLength";
import { rememberState, getMemory } from "../utils/statePersistence";
import { Box } from "@mui/material";

export default function SessionList() {
  const [page, setPage] = useState(getMemory("page", DEFAULT_PAGE));
  const [rowsPerPage, setRowsPerPage] = useState(
    getMemory("rowsPerPage", DEFAULT_LIMIT)
  );
  const [sortState, setSortState] = useState(
    getMemory("sortState", DEFAULT_SORT_STATE)
  );
  const [filterData, setFilterData] = useState(
    getMemory("filterData", [DEFAULT_FILTER])
  );
  const [sessions, setSessions] = useState([]);
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const getSessionIds = async () => {
      try {
        const sessionData = await getNewSessions(
          page,
          rowsPerPage,
          filterData,
          sortState
        );

        setCount(Number(sessionData.count));
        setSessions(sessionData.sessions);
      } catch (error) {
        console.log(error.message);
      }
    };

    getSessionIds();
  }, [page, rowsPerPage, sortState, filterData, count]);

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
    { id: "originHost", label: "Origin Host" },
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

  const handleSessionClick = (e) => {
    const stateObj = {
      page,
      rowsPerPage,
      sortState,
      filterData,
    };
    rememberState(stateObj);

    const sessionId = e.target.parentElement.dataset.id;
    navigate(`/sessions/${sessionId}`);
  };

  return (
    <div className="sessionList">
      <Box sx={{ ml: "60px" }}>
        <SessionFilter
          filterData={filterData}
          setFilterData={setFilterData}
          setPage={setPage}
        />
      </Box>

      <TableContainer
        sx={{
          ml: "60px",
          mt: "10px",
          mr: "60px",
          width: "auto",
          boxShadow: 1,
        }}
        component={Paper}
      >
        <Table sx={{ minWidth: 350 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {headers.map(({ label, id }) => {
                return (
                  <TableCell key={id}>
                    <TableSortLabel
                      active={id === sortState.sortBy}
                      direction={getDirection(id)}
                      onClick={makeHandleSort(id)}
                    >
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
                onClick={handleSessionClick}
              >
                <TableCell>{session.sessionId}</TableCell>
                <TableCell>
                  {session.originHost ? session.originHost : "invalid source"}
                </TableCell>
                <TableCell>{session.date}</TableCell>
                <TableCell>{msToTime(session.length)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                count={count}
                page={sessions.length > 0 ? page : 0}
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
