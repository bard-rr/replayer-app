import { useEffect } from "react";
import NoEventsAlert from "./NoEventsAlert";
import replayer from "../utils/replayer";

const Player = ({ eventData, getEventData }) => {
  useEffect(() => replayer.init(eventData), [eventData]);

  if (eventData.length === 0) {
    return <NoEventsAlert />;
  }

  return <div className="player"></div>;
};

export default Player;
