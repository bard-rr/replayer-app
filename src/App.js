import { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { getEventData } from "./utils/urlUtils";
import Layout from "./components/Layout";
import SessionList from "./components/SessionList";
import Player from "./components/Player";
import FunnelList from "./components/FunnelList";
import Funnel from "./components/Funnel";
import NewFunnelForm from "./components/NewFunnelForm";
import EditFunnelForm from "./components/EditFunnelForm";

function App() {
  const [eventData, setEventData] = useState([]);
  const navigate = useNavigate();

  const handleSessionClick = async (e) => {
    const id = e.target.parentElement.dataset.id;
    const data = await getEventData(id);
    navigate(`/sessions/${id}`);
    setEventData(data);
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
          <Route path="/funnels" element={<FunnelList />} />
          <Route path="/funnels/create" element={<NewFunnelForm />} />
          <Route path="/funnels/update/:id" element={<EditFunnelForm />} />
          <Route path="/funnels/:id" element={<Funnel />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
