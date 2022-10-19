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

export default function SessionList({ sessions, onClick }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchParams] = useSearchParams();
  const filterTag = searchParams.get("filter");
  const filteredSessions = filterSessions(sessions, filterTag);

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

  const sliceData = (data) => {
    let startIdx = page * rowsPerPage;
    const endIdx = startIdx + rowsPerPage;
    return rowsPerPage > 0 ? data.slice(startIdx, endIdx) : data;
  };

  return (
    <TableContainer
      sx={{ ml: "280px", mt: "60px", mr: "60px", width: "auto", boxShadow: 1 }}
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
  );
}
