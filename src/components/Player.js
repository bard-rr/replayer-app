import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import replayer from "../utils/replayer";
import { getEventData } from "../utils/urlUtils";

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
  return <div className="player"></div>;
};

export default Player;
