import { Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { DEFAULT_FUNNEL, DEFAULT_FUNNEL_FILTER } from "../utils/const";
import FunnelComponents from "./FunnelComponents";
import SessionFilterForFunnel from "./SessionFilterForFunnel";
import { getOneFunnel, updateOneFunnel } from "../utils/urlUtils";
import BardButton from "./BardButton";

const EditFunnelForm = () => {
  let { id } = useParams();
  const [eventSequence, seteventSequence] = useState([DEFAULT_FUNNEL]);
  const [sessionFilters, setSessionFilters] = useState([DEFAULT_FUNNEL_FILTER]);
  const [funnelName, setFunnelName] = useState("");

  useEffect(() => {
    const getFunnel = async () => {
      //should work with no filter portion
      const response = await getOneFunnel(id);
      console.log("funnel response from axios", response);
      setFunnelName(response.funnelName);
      seteventSequence(response.eventSequence);
      setSessionFilters(response.sessionFilters);
    };
    getFunnel();
  }, [id]);

  const handleNameChange = (e) => {
    setFunnelName(e.target.value);
  };

  const handleUpdateClick = async (e) => {
    await updateOneFunnel(id, { funnelName, eventSequence, sessionFilters });
  };
  return (
    <Stack
      direction="column"
      justifyContent="flex-start"
      alignItems="flex-start"
      spacing={2}
      sx={{ ml: "60px", mt: "30px" }}
    >
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
        }}
      >
        Update a Funnel
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
        filterData={sessionFilters}
        setFilterData={setSessionFilters}
      />
      <FunnelComponents
        funnelData={eventSequence}
        setFunnelData={seteventSequence}
      />
      <Stack
        direction="row"
        justifyContent="flex-end"
        alignItems="flex-start"
        spacing={2}
        sx={{ mt: "10px", mr: "60px", ml: "60px", width: "85%" }}
      >
        <Link to="/funnels">
          <BardButton text={"Cancel"} />
        </Link>
        <Link to="/funnels">
          <BardButton text={"Update Funnel"} onClick={handleUpdateClick} />
        </Link>
      </Stack>
    </Stack>
  );
};

export default EditFunnelForm;
