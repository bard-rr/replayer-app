import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import SessionList from "./components/SessionList";
import Player from "./components/Player";
import FunnelList from "./components/FunnelList";
import Funnel from "./components/Funnel";
import NewFunnelForm from "./components/NewFunnelForm";
import EditFunnelForm from "./components/EditFunnelForm";
import { createTheme, ThemeProvider } from "@mui/material";

/*
Our Colors:
- "#34384C" (Dark Blue)
- "#7398FF" || rgba(115, 152, 255, 1) (Light Blue)
- "#FFFFFF" (White)
*/

const theme = createTheme({
  typography: {
    fontFamily: "Neometric",
  },
  pallete: {
    primary: {
      main: "#7398FF",
    },
    delete: {
      main: "#ff4639",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        outlined: {
          color: "#7398FF",
          border: "1px solid rgba(115, 152, 255, 1)",
        },
      },
      variants: [
        {
          props: { variant: "delete" },
          style: {
            color: "#ff4639",
            border: "1px solid rgba(255, 70, 57, 1)",
          },
        },
      ],
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate to="/sessions" />} />
            <Route path="/sessions" element={<SessionList />} />
            <Route path="/sessions/:sessionId" element={<Player />} />
            <Route path="/funnels" element={<FunnelList />} />
            <Route path="/funnels/create" element={<NewFunnelForm />} />
            <Route path="/funnels/update/:id" element={<EditFunnelForm />} />
            <Route path="/funnels/:funnelId" element={<Funnel />} />
          </Routes>
        </Layout>
      </div>
    </ThemeProvider>
  );
}

export default App;
