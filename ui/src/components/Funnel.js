import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import FunnelStep from "./FunnelStep";
import FunnelTimeFilter from "./FunnelTimeFilter";
import getDates from "../utils/dateFilter";
import { deleteOneFunnel, getFunnelData } from "../utils/urlUtils";
import FunnelFilterDisplay from "./FunnelFilterDisplay";
import BardButton from "./BardButton";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";

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

  const handleClickDelete = async (e, funnelId) => {
    e.stopPropagation();
    if (
      window.confirm(
        "This will delete the funnel.\nAre you sure you want to do this?"
      )
    ) {
      await deleteOneFunnel(funnelId);
      navigate("/funnels");
    }
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
        <EditButton
          handleClick={() => navigate(`/funnels/update/${funnelId}`)}
          sx={{
            position: "absolute",
            top: "30px",
            right: "100px",
            height: "56px",
            zIndex: 1,
          }}
        />
        <DeleteButton
          handleClick={(e) => handleClickDelete(e, funnelId)}
          sx={{
            position: "absolute",
            top: "30px",
            right: "30px",
            height: "56px",
          }}
        />
        <Box sx={{ fontSize: "18px" }}>{funnelData.funnel.funnelName}</Box>
        <Box sx={{ fontSize: "16px" }}>
          <em>{funnelData.results.totalFilteredSessions} sessions</em>
        </Box>
        <FunnelFilterDisplay filters={funnelData.funnel.sessionFilters} />
        <List sx={{ width: "100%", mr: "30px", bgcolor: "background.paper" }}>
          {listFunnelSteps()}
        </List>
      </Box>
    </>
  );
};

export default Funnel;
