import { useEffect } from "react";
import NoEventsAlert from "./NoEventsAlert";
import replayer from "../utils/replayer";

const Player = ({ eventData }) => {
  useEffect(() => replayer.init(eventData), [eventData]);

  //should never happen, but have this as a failsafe
  if (eventData.length === 0) {
    return <NoEventsAlert />;
  }

  //this is where the replayer is mounted in replayer.init
  return <div className="player"></div>;
};

export default Player;
