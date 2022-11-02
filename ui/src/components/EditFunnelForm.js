import { Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DEFAULT_FUNNEL, DEFAULT_FUNNEL_FILTER } from "../utils/const";
import FunnelComponents from "./FunnelComponents";
import SessionFilterForFunnel from "./SessionFilterForFunnel";
import { getOneFunnel, updateOneFunnel } from "../utils/urlUtils";
import BardButton from "./BardButton";
import { getMemory } from "../utils/statePersistence";

const EditFunnelForm = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [eventSequence, seteventSequence] = useState([DEFAULT_FUNNEL]);
  const [sessionFilters, setSessionFilters] = useState([DEFAULT_FUNNEL_FILTER]);
  const [funnelName, setFunnelName] = useState("");
  const [nameMissing, setNameMissing] = useState(false);
  const [eventTypeMissing, setEventTypeMissing] = useState(false);
  const [textMissing, setTextMissing] = useState(false);

  useEffect(() => {
    const getFunnel = async () => {
      const response = await getOneFunnel(id);
      setFunnelName(response.funnelName);
      seteventSequence(response.eventSequence);
      setSessionFilters(response.sessionFilters);
    };
    getFunnel();
  }, [id]);

  const handleNameChange = (e) => {
    setNameMissing(false);
    setFunnelName(e.target.value);
  };

  const handleUpdateClick = async (e) => {
    if (!hasName()) {
      setNameMissing(true);
      setFunnelName(funnelName.trim());
    } else if (!hasCompleteEvents()) {
      setEventTypeMissing(true);
      setTextMissing(true);
    } else {
      await updateOneFunnel({
        funnelName,
        sessionFilters,
        eventSequence,
      });
      navigate("/funnels");
    }
  };

  const hasName = () => funnelName.trim().length > 0;

  const hasCompleteEvents = () => {
    return eventSequence.every(
      ({ eventType, textContent, customEventType }) => {
        const hasEventType = eventType !== "";
        const hasTextContentProp = !!textContent || !!customEventType;
        const hasTextContent = textContent !== "" && customEventType !== "";
        return hasEventType && hasTextContentProp && hasTextContent;
      }
    );
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
        Update Funnel
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
        filterData={sessionFilters}
        setFilterData={setSessionFilters}
      />
      <FunnelComponents
        funnelData={eventSequence}
        setFunnelData={seteventSequence}
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
        <BardButton
          text={"Cancel"}
          onClick={() => {
            let path = getMemory("lastPage", `/funnels/${id}`);
            navigate(path);
          }}
        />
        <BardButton text={"Update Funnel"} onClick={handleUpdateClick} />
      </Stack>
    </Stack>
  );
};

export default EditFunnelForm;
