import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import SessionList from "./components/SessionList";
import Player from "./components/Player";
import FunnelList from "./components/FunnelList";
import Funnel from "./components/Funnel";
import NewFunnelForm from "./components/NewFunnelForm";

function App() {
  // todelete

  // import { getEventData } from "./utils/urlUtils";

  // const handleSessionClick = async (e) => {
  //   const id = e.target.parentElement.dataset.id;
  //   const data = await getEventData(id);
  //   navigate(`/sessions/${id}`);
  //   setEventData(data);
  // };

  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route
            path="/"
            element={<Navigate to="/sessions" />}
          />
          <Route
            path="/sessions"
            element={<SessionList />}
          />
          <Route
            path="/sessions/:id"
            element={<Player />}
          />
          <Route
            path="/funnels"
            element={<FunnelList />}
          />
          <Route
            path="/funnels/:id"
            element={<Funnel />}
          />
          <Route
            path="/funnels/create"
            element={<NewFunnelForm />}
          />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
