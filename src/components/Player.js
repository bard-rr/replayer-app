import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import replayer from "../utils/replayer";
import { getEventData } from "../utils/urlUtils";

const Player = () => {
  const { id } = useParams();
  const [eventData, setEventData] = useState([]);

  useEffect(() => {
    const getAndSetEventData = async () => {
      const data = await getEventData(id);
      setEventData(data);
    };
    getAndSetEventData();
  }, [id]);

  useEffect(() => {
    replayer.init(eventData);
  }, [eventData]);

  //this is where the replayer is mounted in replayer.init
  return <div className="player"></div>;
};

export default Player;
