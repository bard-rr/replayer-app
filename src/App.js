import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import SessionList from "./components/SessionList";
import Player from "./components/Player";
import FunnelList from "./components/FunnelList";
import Funnel from "./components/Funnel";
import NewFunnelForm from "./components/NewFunnelForm";
import EditFunnelForm from "./components/EditFunnelForm";

function App() {
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
            path="/sessions/:sessionId"
            element={<Player />}
          />
          <Route path="/funnels" element={<FunnelList />} />
          <Route path="/funnels/create" element={<NewFunnelForm />} />
          <Route path="/funnels/update/:id" element={<EditFunnelForm />} />
          <Route
            path="/funnels/:funnelId"
            element={<Funnel />}
          />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
