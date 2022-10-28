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
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  DEFAULT_LIMIT,
  DEFAULT_PAGE,
  DEFAULT_SORT_FUNNELS,
} from "../utils/const";
import { getNewFunnels } from "../utils/urlUtils";
import BardButton from "./BardButton";
import { Stack } from "@mui/material";
import { Link } from "react-router-dom";

const FunnelList = () => {
  const [funnels, setFunnels] = useState([]);
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_LIMIT);
  const [sortState, setSortState] = useState(DEFAULT_SORT_FUNNELS);
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const getFunnels = async () => {
      try {
        const response = await getNewFunnels(page, rowsPerPage, sortState);
        setCount(Number(response.data.count));
        setFunnels(response.data.funnels);
        // setCount(fakeFunnels.length);
        // setFunnels(fakeFunnels);
      } catch (error) {
        console.error(error);
      }
    };
    getFunnels();
  }, [page, rowsPerPage, sortState]);

  const headers = [
    { id: "funnelName", label: "Funnel Name" },
    { id: "lastModified", label: "Last Modified" },
    { id: "created", label: "Created" },
  ];

  const handleChangePage = async (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = async (event) => {
    let newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(DEFAULT_PAGE);
  };

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

  const handleFunnelClick = (e) => {
    const funnelId = e.target.parentElement.dataset.id;
    navigate(`/funnels/${funnelId}`);
  };

  return (
    <div>
      <Stack
        direction="row-reverse"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={0.5}
        sx={{ mr: "60px", mt: "30px" }}
      >
        <BardButton
          text={"Add Funnel"}
          sx={{ mr: "60px" }}
          onClick={() => navigate("/funnels/create")}
        />
      </Stack>
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
            {funnels.map((funnel) => (
              <TableRow
                key={funnel.id}
                data-id={funnel.id}
                sx={{
                  "&:hover": {
                    backgroundColor: "#ECEFF4",
                    cursor: "pointer",
                  },
                }}
                onClick={handleFunnelClick}
              >
                <TableCell>{funnel.name}</TableCell>
                <TableCell>{funnel.created}</TableCell>
                <TableCell>{funnel.lastModified}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                count={count}
                page={funnels.length > 0 ? page : 0}
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
};

export default FunnelList;
