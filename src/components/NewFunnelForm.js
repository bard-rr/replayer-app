import SessionFilterForFunnel from "./SessionFilterForFunnel";
import FunnelComponents from "./FunnelComponents";
import { Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { DEFAULT_FUNNEL, DEFAULT_FUNNEL_FILTER } from "../utils/const";
import BardButton from "./BardButton";
import { Link } from "react-router-dom";
import axios from "axios";

const NewFunnelForm = () => {
  const [funnelData, setFunnelData] = useState([DEFAULT_FUNNEL]);
  const [filterData, setFilterData] = useState([DEFAULT_FUNNEL_FILTER]);
  const [funnelName, setFunnelName] = useState("");

  const handleSubmitClick = async (e) => {
    try {
      await axios.post("http://localhost:3003/funnels", {
        funnelName: funnelName,
        sessionFilters: filterData,
        eventSequence: funnelData,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleNameChange = (e) => {
    setFunnelName(e.target.value);
  };

  return (
    <Stack
      direction="column"
      justifyContent="flex-start"
      alignItems="flex-start"
      spacing={2}
      sx={{ ml: "60px", mt: "30px" }}>
      <Typography
        variant="h6"
        sx={{
          mr: 2,
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
          "&:hover": {
            cursor: "pointer",
          },
        }}>
        Create New Funnel
      </Typography>
      <TextField
        variant="outlined"
        sx={{
          ml: "60px",
          width: "300px",
          "& .MuiInputLabel-root": { color: "#8A8692" },
          "& .MuiOutlinedInput-root": {
            "& > fieldset": { borderColor: "#A3A2AF" },
          },
        }}
        value={funnelName}
        label="Funnel Name"
        onChange={handleNameChange}
      />
      <SessionFilterForFunnel
        filterData={filterData}
        setFilterData={setFilterData}
      />
      <FunnelComponents funnelData={funnelData} setFunnelData={setFunnelData} />
      <Stack
        direction="row"
        justifyContent="flex-end"
        alignItems="flex-start"
        spacing={2}
        sx={{ mt: "10px", mr: "60px", ml: "60px", width: "85%" }}>
        <Link to="/funnels">
          <BardButton text={"Cancel"} />
        </Link>
        <Link to="/funnels">
          <BardButton text={"Create Funnel"} onClick={handleSubmitClick} />
        </Link>
      </Stack>
    </Stack>
  );
};

export default NewFunnelForm;
