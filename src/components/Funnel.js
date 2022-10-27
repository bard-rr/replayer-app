import { useState } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import FunnelStep from "./FunnelStep";
import FunnelTimeFilter from "./FunnelTimeFilter";
import getDates from "../utils/dateFilter";
import { getFunnelData } from "../utils/urlUtils";

const fakeFunnel = {
  funnel: {
    sessionFilters: [
      { filterType: "length", startLength: 5000, endLength: 25000 },
      { filterType: "originHost", textContent: "partyApp" },
    ],
    eventSequence: [
      { eventType: "click", textContent: "Sign In" },
      { eventType: "click", textContent: "Generate Link" },
      { eventType: "click", textContent: "Copy Link" },
    ],
  },
  results: {
    totalFilteredSessions: 4,
    eventSequenceResults: [
      {
        numberCompleted: 4,
        sessionsCompleted: [
          "fc5028a1-6e48-41a7-a5c8-49ab956f01a5",
          "1ea361a2-0003-4754-aefb-3a79a8f1d470",
          "60b682ee-d27e-4202-ada6-864ac3f6f320",
          "3ecd414e-3213-499b-9698-82fc660324b4",
        ],
        numberNotCompleted: 0,
        sessionsNotCompleted: [],
      },
      {
        numberCompleted: 3,
        sessionsCompleted: [
          "60b682ee-d27e-4202-ada6-864ac3f6f320",
          "fc5028a1-6e48-41a7-a5c8-49ab956f01a5",
          "1ea361a2-0003-4754-aefb-3a79a8f1d470",
        ],
        numberNotCompleted: 1,
        sessionsNotCompleted: ["3ecd414e-3213-499b-9698-82fc660324b4"],
      },
      {
        numberCompleted: 1,
        sessionsCompleted: ["60b682ee-d27e-4202-ada6-864ac3f6f320"],
        numberNotCompleted: 1,
        sessionsNotCompleted: ["1ea361a2-0003-4754-aefb-3a79a8f1d470"],
      },
    ],
  },
};

const Funnel = ({ funnelData, setFunnelData, funnelMetaData }) => {
  const { id, name } = funnelMetaData;
  const [selectedFilter, setSelectedFilter] = useState("last 7");
  console.log("funnel id: ", id);

  const handleChange = (e) => {
    setSelectedFilter(e.target.value);
    const dates = getDates(e.target.value);
    // const data = await getFunnelData(id, dates);
    getFunnelData(id, dates);
    // setFunnelData(data);
  };

  const listFunnelSteps = () => {
    return fakeFunnel.funnel.eventSequence.map((event, idx) => {
      const results = fakeFunnel.results.eventSequenceResults[idx];
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
      <Box sx={{ fontSize: "18px" }}>{name}</Box>
      <Box sx={{ fontSize: "16px" }}>
        <em>{fakeFunnel.results.totalFilteredSessions} sessions</em>
      </Box>
      <List sx={{ width: "100%", mr: "30px", bgcolor: "background.paper" }}>
        {listFunnelSteps()}
      </List>
    </Box>
  );
};

export default Funnel;
