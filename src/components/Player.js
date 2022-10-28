import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import replayer from "../utils/replayer";
import { getEventData } from "../utils/urlUtils";
import BardButton from "./BardButton";

const Player = (props) => {
  let { sessionId } = useParams();
  const navigate = useNavigate();
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

  return (
    <>
      <BardButton
        text={"Sessions"}
        onClick={() => navigate("/sessions")}
        isBackButton={true}
        sx={{
          mt: "15px",
          ml: "15px",
          border: "0px",
          height: "auto",
          display: props.hide ? "none" : "inline-flex",
          "&:hover": {
            border: "0px",
          },
        }}
      />
      <div className="player"></div>
    </>
  );
};

export default Player;
