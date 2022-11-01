import SessionFilterForFunnel from "./SessionFilterForFunnel";
import FunnelComponents from "./FunnelComponents";
import { Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { DEFAULT_FUNNEL, DEFAULT_FUNNEL_FILTER } from "../utils/const";
import BardButton from "./BardButton";
import { useNavigate } from "react-router-dom";
import { createOneFunnel } from "../utils/urlUtils";

const NewFunnelForm = () => {
  const navigate = useNavigate();
  const [funnelData, setFunnelData] = useState([DEFAULT_FUNNEL]);
  const [filterData, setFilterData] = useState([DEFAULT_FUNNEL_FILTER]);
  const [funnelName, setFunnelName] = useState("");

  const handleSubmitClick = async (e) => {
    await createOneFunnel({
      funnelName,
      sessionFilters: filterData,
      eventSequence: funnelData,
    });
    navigate("/funnels");
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
      sx={{
        m: "60px",
        p: "30px",
        borderRadius: "4px",
        bgcolor: "white",
        boxShadow: 3,
      }}
    >
      <Typography variant="h6" sx={{ fontSize: "22px" }}>
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
        alignItems="flex-start"
        spacing={2}
        sx={{ mt: "10px", mr: "60px", ml: "60px", width: "85%" }}
      >
        <BardButton text={"Cancel"} onClick={() => navigate("/funnels")} />
        <BardButton text={"Create Funnel"} onClick={handleSubmitClick} />
      </Stack>
    </Stack>
  );
};

export default NewFunnelForm;
