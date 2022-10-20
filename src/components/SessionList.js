import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import filterSessions from "../utils/sessionFilter";
import Filter from "./Filter";

export default function SessionList({ sessions, setSessions, onClick }) {
  //pagination part of code.
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  //assums that we have filter params in the url of the page we're on
  //route is /sessions?whatever params we want
  const [searchParams] = useSearchParams();

  //manually implement filtering?
  const filterTag = searchParams.get("filter");
  const filteredSessions = filterSessions(sessions, filterTag);

  //if we filter by something new (ie, click an option in the sidebar), go to
  //the first page by default
  useEffect(() => {
    setPage(0);
  }, [filterTag]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  //this assumes we've got ALL of the data we're interested in stored in 'data',
  //which is prefiltered: this is how pagination is impld
  const sliceData = (data) => {
    let startIdx = page * rowsPerPage;
    const endIdx = startIdx + rowsPerPage;
    return rowsPerPage > 0 ? data.slice(startIdx, endIdx) : data;
  };

  return (
    <div className="sessionList">
      <Filter setSessions={setSessions}></Filter>
      <TableContainer
        sx={{
          ml: "280px",
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
              <TableCell>Session Id</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Length</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sliceData(filteredSessions).map((session) => (
              <TableRow
                key={session.sessionId}
                data-id={session.sessionId}
                sx={{
                  "&:hover": {
                    backgroundColor: "#ECEFF4",
                    cursor: "pointer",
                  },
                }}
                //this gets events for the session the user clicks on + navigates to replay page,
                //which takes us to the Player component
                onClick={onClick}
              >
                <TableCell>{session.sessionId}</TableCell>
                <TableCell>{session.date}</TableCell>
                <TableCell>{session.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              {/* From MUI library: setup for pagination. Seems straightforward */}
              <TablePagination
                count={filteredSessions.length}
                page={page * rowsPerPage > filteredSessions.length ? 0 : page}
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
