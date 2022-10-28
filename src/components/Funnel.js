import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import FunnelStep from "./FunnelStep";
import FunnelTimeFilter from "./FunnelTimeFilter";
import getDates from "../utils/dateFilter";
import { getFunnelData } from "../utils/urlUtils";
import BardButton from "./BardButton";

const Funnel = () => {
  const { funnelId } = useParams();
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState("last 7");
  const [funnelData, setFunnelData] = useState(null);

  useEffect(() => {
    const updateFunnelData = async () => {
      const dates = getDates(selectedFilter);
      const newFunnelData = await getFunnelData(funnelId, dates);
      setFunnelData(newFunnelData);
    };
    updateFunnelData();
  }, [funnelId, selectedFilter]);

  const handleChange = (e) => {
    setSelectedFilter(e.target.value);
  };

  const listFunnelSteps = () => {
    return funnelData.funnel.eventSequence.map((event, idx) => {
      const results = funnelData.results.eventSequenceResults[idx];
      return (
        <FunnelStep
          key={idx}
          stepNum={idx + 1}
          event={event}
          results={results}
          totalSessions={funnelData.results.totalFilteredSessions}
        />
      );
    });
  };

  if (funnelData === null) return null;

  return (
    <>
      <BardButton
        text={"Funnels"}
        onClick={() => navigate("/funnels")}
        isBackButton={true}
        sx={{
          mt: "15px",
          ml: "15px",
          border: "0px",
          height: "auto",
          position: "absolute",
          "&:hover": {
            border: "0px",
          },
        }}
      />
      <Box
        sx={{
          m: "60px",
          p: "30px",
          backgroundColor: "#fff",
          borderRadius: "4px",
          position: "relative",
        }}
      >
        <FunnelTimeFilter
          selectedFilter={selectedFilter}
          onChange={handleChange}
        />
        <BardButton
          text="Edit"
          onClick={() => navigate(`/funnels/update/${funnelId}`)}
          sx={{
            position: "absolute",
            top: "30px",
            right: "30px",
            zIndex: 1,
          }}
        />
        <Box sx={{ fontSize: "18px" }}>{funnelData.funnel.funnelName}</Box>
        <Box sx={{ fontSize: "16px" }}>
          <em>{funnelData.results.totalFilteredSessions} sessions</em>
        </Box>
        <List sx={{ width: "100%", mr: "30px", bgcolor: "background.paper" }}>
          {listFunnelSteps()}
        </List>
      </Box>
    </>
  );
};

export default Funnel;
