import rrwebPlayer from "rrweb-player";
import "rrweb-player/dist/style.css";

let player;

const removeOldPlayer = () => {
  if (player !== null) {
    player.pause();
    player.$destroy();
    player = null;
  }
};

const instantiatePlayer = (data) => {
  if (data.length <= 0) return null;

  return new rrwebPlayer({
    target: document.querySelector(".player"),
    props: {
      events: data,
      width: 1000,
      height: 500,
      autoPlay: false,
    },
  });
};

const init = (data) => {
  try {
    player = instantiatePlayer(data);
    return removeOldPlayer;
  } catch (error) {
    console.error(error);
  }
};

const replayer = { init };

export default replayer;
