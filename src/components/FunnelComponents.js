import { Box, Stack } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import FunnelSelection from "./FunnelSelection";
import ClickEventField from "./ClickEventField";

const FunnelComponents = ({ funnelData, setFunnelData }) => {
  const handleAddClick = (e) => {};
  console.log("funnelData: ", funnelData);
  return (
    <Stack
      direction="column"
      justifyContent="flex-start"
      alignItems="flex-start"
      spacing={2}>
      {funnelData.map((data, index) => {
        switch (data.eventType) {
          case "click":
            return (
              <Box key={index}>
                <FunnelSelection
                  data={data}
                  index={index}
                  funnelData={funnelData}
                  setFunnelData={setFunnelData}
                />
                <ClickEventField
                  index={index}
                  funnelData={funnelData}
                  setFunnelData={setFunnelData}
                />
              </Box>
            );
          default:
            return (
              <Box key={index}>
                <FunnelSelection
                  data={data}
                  index={index}
                  setFunnelData={setFunnelData}
                  funnelData={funnelData}
                />
              </Box>
            );
        }
      })}

      <AddCircleOutlineIcon
        onClick={handleAddClick}
        sx={{
          "&:hover": {
            cursor: "pointer",
          },
        }}
      />
    </Stack>
  );
};

export default FunnelComponents;
