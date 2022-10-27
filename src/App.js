import { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { getEventData, getFunnelData } from "./utils/urlUtils";
import { DEFAULT_FUNNEL_FILTER } from "./utils/const";
import Layout from "./components/Layout";
import SessionList from "./components/SessionList";
import Player from "./components/Player";
import FunnelList from "./components/FunnelList";
import Funnel from "./components/Funnel";

function App() {
  const [eventData, setEventData] = useState([]);
  const [funnelData, setFunnelData] = useState({});
  const navigate = useNavigate();

  const handleSessionClick = async (e) => {
    const id = e.target.parentElement.dataset.id;
    const data = await getEventData(id);
    navigate(`/sessions/${id}`);
    setEventData(data);
  };

  const handleFunnelClick = async (id) => {
    getFunnelData(id, DEFAULT_FUNNEL_FILTER);
    // const data = await getFunnelData(id, DEFAULT_FUNNEL_FILTER);
    navigate(`/funnels/${id}`);
    // setFunnelData(data);
  };

  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path={"/"} element={<Navigate to="/sessions" />} />
          <Route
            path="/sessions"
            element={<SessionList onSessionClick={handleSessionClick} />}
          />
          <Route
            path="/sessions/:id"
            element={<Player eventData={eventData} />}
          />
          <Route
            path="/funnels"
            element={<FunnelList onFunnelClick={handleFunnelClick} />}
          />
          <Route
            path="/funnels/:id"
            element={
              <Funnel funnelData={funnelData} setFunnelData={setFunnelData} />
            }
          />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
