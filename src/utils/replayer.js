// import axios from "axios";
import rrwebPlayer from "rrweb-player";
import "rrweb-player/dist/style.css";

const removeOldPlayers = () => {
  document.querySelectorAll(".rr-player").forEach((player) => player.remove());
};

// const getEvents = () => {
//   const url = "http://localhost:3001/replayer";
//   return axios.get(url);
// };

const instantiatePlayer = (data) => {
  new rrwebPlayer({
    target: document.querySelector(".player"),
    props: {
      events: data,
      width: 800,
      height: 400,
      autoPlay: false,
    },
  });
};

const init = async (data) => {
  removeOldPlayers();
  try {
    // const { data } = await getEvents();
    instantiatePlayer(data);
  } catch (error) {
    console.error(error);
  }
};

const replayer = { init };

export default replayer;
