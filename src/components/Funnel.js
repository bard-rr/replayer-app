import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import FunnelStep from "./FunnelStep";
import FunnelTimeFilter from "./FunnelTimeFilter";
import getDates from "../utils/dateFilter";
import { getFunnelData } from "../utils/urlUtils";

const Funnel = () => {
  const { id } = useParams();
  const [selectedFilter, setSelectedFilter] = useState("last 7");
  const [funnelData, setFunnelData] = useState(null);

  useEffect(() => {
    const updateFunnelData = async () => {
      const dates = getDates(selectedFilter);
      const newFunnelData = await getFunnelData(id, dates);
      setFunnelData(newFunnelData);
    }
    updateFunnelData();
  }, [id, selectedFilter]);

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
        />
      );
    });
  };

  if (funnelData === null) return null;

  return (
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
      <Box sx={{ fontSize: "18px" }}>{funnelData.funnel.name}</Box>
      <Box sx={{ fontSize: "16px" }}>
        <em>{funnelData.results.totalFilteredSessions} sessions</em>
      </Box>
      <List sx={{ width: "100%", mr: "30px", bgcolor: "background.paper" }}>
        {listFunnelSteps()}
      </List>
    </Box>
  );
};

export default Funnel;
