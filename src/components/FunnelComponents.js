import { Box, Stack, Typography } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import FunnelSelection from "./FunnelSelection";
import ClickEventField from "./ClickEventField";
import { DEFAULT_FUNNEL } from "../utils/const";

const FunnelComponents = ({ funnelData, setFunnelData }) => {
  const handleAddClick = (e) => {
    e.preventDefault();
    let newFunnelData = [...funnelData].concat(DEFAULT_FUNNEL);
    setFunnelData(newFunnelData);
  };
  const handleRemoveClick = (e, index) => {
    e.preventDefault();
    let newFunnelData = funnelData
      .slice(0, index)
      .concat(funnelData.slice(index + 1, funnelData.length));
    console.log("new funnel data", newFunnelData);
    setFunnelData(newFunnelData);
  };
  return (
    <Box
      sx={{
        border: "1px solid black",
        mt: "10px",
        mr: "60px",
        ml: "60px",
        width: "85%",
      }}
    >
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={2}
        sx={{ mt: "10px", mb: "10px" }}
      >
        <Typography
          variant="h9"
          sx={{
            ml: "10px",
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
          Event Sequence Definition
        </Typography>
        {funnelData.map((data, index) => {
          switch (data.eventType) {
            case "click":
              return (
                <Stack
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                  spacing={4}
                  key={index}
                >
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
                  ) : (
                    <RemoveCircleOutlineIcon
                      onClick={(e) => handleRemoveClick(e, index)}
                      sx={{
                        "&:hover": {
                          cursor: "pointer",
                        },
                      }}
                    />
                  )}
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
    </Box>
  );
};

export default FunnelComponents;
