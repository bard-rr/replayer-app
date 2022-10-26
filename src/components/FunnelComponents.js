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
              <Stack
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
                spacing={4}
                key={index}>
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
                {index === funnelData.length - 1 ? (
                  <AddCircleOutlineIcon
                    onClick={handleAddClick}
                    sx={{
                      "&:hover": {
                        cursor: "pointer",
                      },
                    }}
                  />
                ) : null}
              </Stack>
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
    </Stack>
  );
};

export default FunnelComponents;
