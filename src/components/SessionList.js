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
import filterSessions, { getFilterUrl } from "../utils/sessionFilter";
import { Autocomplete, Button, TextField } from "@mui/material";
import { DEFAULT_FILTER, FILTER_OPTIONS } from "../utils/const";
import axios from "axios";
import { getFullUrl } from "../utils/urlUtils";

export default function SessionList({ sessions, setSessions, onClick }) {
  //TODO: merge these page state variables into a single object?
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filter, setFilter] = useState(DEFAULT_FILTER);

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

  const handleChangePage = async (event, newPage) => {
    setPage(newPage);
    let newSessions = await getNewSessions(page, rowsPerPage, "date", filter);
    setSessions(newSessions);
  };

  const handleChangeRowsPerPage = async (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    let newSessions = await getNewSessions(page, rowsPerPage, "date", filter);
    setSessions(newSessions);
  };

  //this assumes we've got ALL of the data we're interested in stored in 'data',
  //which is prefiltered: this is how pagination is impld
  const sliceData = (data) => {
    let startIdx = page * rowsPerPage;
    const endIdx = startIdx + rowsPerPage;
    return rowsPerPage > 0 ? data.slice(startIdx, endIdx) : data;
  };

  const handleFilterSelection = (event, newFilter) => {
    event.preventDefault();
    if (!newFilter) {
      newFilter = DEFAULT_FILTER;
    }
    if (isValidOption(newFilter)) {
      setFilter(newFilter);
    }
  };

  const isValidOption = (newValue) => {
    return FILTER_OPTIONS.includes(newValue);
  };

  const handleFilter = async (event) => {
    event.preventDefault();
    if (isValidOption(filter)) {
      let newSessions = await getNewSessions(page, rowsPerPage, "date", filter);
      setSessions(newSessions);
    } else {
      //TODO: handle invalid option
    }
  };

  const getNewSessions = async (page, rowsPerPage, filterTag, filterStr) => {
    let url = getFullUrl(
      { pageNum: page, perPage: rowsPerPage },
      {},
      { filterTag, filterStr }
    );
    let response = await axios.get(url);
    return response.data;
  };

  return (
    <div className="sessionList">
      <div className="filter">
        <form>
          <Autocomplete
            id="filter-dropdown"
            options={FILTER_OPTIONS}
            defaultValue={DEFAULT_FILTER}
            renderInput={(params) => (
              <TextField {...params} label="Filter By:" />
            )}
            sx={{
              ml: "280px",
              mt: "30px",
              mr: "30px",
              width: "500px",
              height: "75px",
              display: "inline-flex",
            }}
            onChange={handleFilterSelection}
          />
          <Button variant="outlined" onClick={handleFilter}>
            Filter
          </Button>
        </form>
      </div>
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
