import { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "./components/Layout";
import SessionList from "./components/SessionList";
import Player from "./components/Player";
import FunnelList from "./components/FunnelList";
import Funnel from "./components/Funnel";

function App() {
  const [eventData, setEventData] = useState([]);
  const navigate = useNavigate();

  const handleSessionClick = async (e) => {
    const id = e.target.parentElement.dataset.id;
    getEventData(id);
  };

  const getEventData = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3003/sessions/${id}`);
      navigate(`/sessions/${id}`);
      setEventData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFunnelClick = async (e) => {
    const id = e.target.parentElement.dataset.id;
    // console.log(id);
    getFunnelData(id);
  };

  const getFunnelData = async (id) => {
    try {
      // const response = await axios.get(`http://localhost:3003/funnels/${id}`);
      navigate(`/funnels/${id}`);
      // set some state maybe
    } catch (error) {
      console.error(error);
    }
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
            element={
              <Player eventData={eventData} getEventData={getEventData} />
            }
          />
          <Route
            path="/funnels"
            element={<FunnelList onFunnelClick={handleFunnelClick} />}
          />
          <Route path="/funnels/:id" element={<Funnel />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
