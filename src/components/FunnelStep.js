import { Stack, Divider } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import PercentCompleteBar from "./PercentCompleteBar";
import StepTitle from "./StepTitle";
import StepCompletionDetails from "./StepCompletionDetails";

const FunnelStep = ({ event, stepNum, results, totalSessions }) => {
  return (
    <ListItem sx={{ pl: "8px" }}>
      <Stack direction="column" sx={{ width: "100%" }}>
        <StepTitle event={event} stepNum={stepNum} />
        <PercentCompleteBar
          numComplete={results.numberCompleted}
          totalSessions={totalSessions}
        />
        <StepCompletionDetails
          results={results}
          event={event}
          stepNum={stepNum}
        />
        <Divider sx={{ mb: "15px", mt: "10px" }} />
      </Stack>
    </ListItem>
  );
};

export default FunnelStep;
