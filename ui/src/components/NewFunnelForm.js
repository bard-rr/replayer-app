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
  const [nameMissing, setNameMissing] = useState(false);
  const [eventTypeMissing, setEventTypeMissing] = useState(false);
  const [textMissing, setTextMissing] = useState(false);

  const handleSubmitClick = async (e) => {
    if (!hasName()) {
      setNameMissing(true);
      setFunnelName(funnelName.trim());
    } else if (!hasCompleteEvents()) {
      setEventTypeMissing(true);
      setTextMissing(true);
    } else {
      await createOneFunnel({
        funnelName,
        sessionFilters: filterData,
        eventSequence: funnelData,
      });
      navigate("/funnels");
    }
  };

  const hasName = () => funnelName.trim().length > 0;

  const hasCompleteEvents = () => {
    return funnelData.every(({ eventType, textContent, customEventType }) => {
      const hasEventType = eventType !== "";
      const hasTextContentProp = !!textContent || !!customEventType;
      const hasTextContent = textContent !== "" && customEventType !== "";
      return hasEventType && hasTextContentProp && hasTextContent;
    });
  };

  const handleNameChange = (e) => {
    setNameMissing(false);
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
        required
        error={nameMissing}
        helperText={nameMissing && "Funnel name is required"}
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
      <FunnelComponents
        funnelData={funnelData}
        setFunnelData={setFunnelData}
        eventTypeMissing={eventTypeMissing}
        setEventTypeMissing={setEventTypeMissing}
        textMissing={textMissing}
        setTextMissing={setTextMissing}
      />
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
