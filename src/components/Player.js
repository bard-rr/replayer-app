import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import replayer from "../utils/replayer";

const Player = ({ eventData, getEventData }) => {
  const location = useLocation();
  useEffect(() => {
    if (eventData.length > 0) {
      replayer.init(eventData);
    }
  }, [eventData]);

  if (eventData.length === 0) {
    const id = location.pathname.match(/[a-z0-9-]+$/i)[0];
    getEventData(id);
  }

  return <div className="player"></div>;
};

export default Player;
