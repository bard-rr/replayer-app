import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "./components/Layout";
import SessionList from "./components/SessionList";
import Player from "./components/Player";

function App() {
  const [sessions, setSessions] = useState([]);
  const [eventData, setEventData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getSessionIds = async () => {
      try {
        const response = await axios.get("http://localhost:3003/sessions");
        setSessions(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    getSessionIds();
  }, []);

  const handleIdClick = async (e) => {
    const id = e.target.parentElement.dataset.id;
    getEventData(id);
  };

  const getEventData = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3003/replay/${id}`);
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
            element={
              <SessionList sessions={sessions} onClick={handleIdClick} />
            }
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
