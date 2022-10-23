import { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "./components/Layout";
import SessionList from "./components/SessionList";
import Player from "./components/Player";

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
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
