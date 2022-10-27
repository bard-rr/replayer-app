import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import replayer from "../utils/replayer";
import { getEventData } from "../utils/urlUtils";
import { Stack } from "@mui/material";
import BardButtion from "./BardButton";
import { Link } from "react-router-dom";

const Player = (props) => {
  let { sessionId } = useParams();
  const [eventData, setEventData] = useState([]);

  if (sessionId === undefined) sessionId = props.sessionId;

  useEffect(() => {
    const getAndSetEventData = async () => {
      const data = await getEventData(sessionId);
      setEventData(data);
    };
    getAndSetEventData();
  }, [sessionId]);

  useEffect(() => {
    return replayer.init(eventData);
  }, [eventData]);

  if (eventData.length === 0) return null;

  //this is where the replayer is mounted in replayer.init
  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="flex-start"
      spacing={2}
      sx={{ mt: "20px", width: "100%", pl: "25%" }}>
      <Link to="/sessions">
        <BardButtion text={"Go Back"} sx={{ width: "100px" }} />
      </Link>
      <div className="player"></div>
    </Stack>
  );
};

export default Player;
