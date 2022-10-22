import { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "./components/Layout";
import SessionList from "./components/SessionList";
import Player from "./components/Player";
// import { DEFAULT_FILTER } from "./utils/const";
// import { getFilterQuery } from "./utils/sessionFilter";
// import { getNewSessions } from "./utils/urlUtils";

/*
  Initial thoughts on implementing filtering and pagination
    have page, pagination and sort settings implemented as state objects
    DO pass those state objects down to the sidebar. When the user filters by 
      something new, it seems like any sorting + pagination they had going should
      be reset to a default. But we can only do that if we change the pagination and
      sort state values to those defaults each time the filter is changed.

    We also need to make changes such that we only display the proper sessions. Each time the
      filter, sort or pagination settings change, we need to re-fetch the sessions.
      Well, that's easy enough: have the code that sets the sessions to be displayed locked 
      behind a use effect that runs each time the filter / page / sort params change. 

    So the flow goes something like this
      have state for filter, pagination and sorting.
      pass state setter functions to the sidebar. set the state to defaults each time the user clicks
        a filter. use those defaults to build the query string and navigate to that url
      when we navigate, the new useEffect within the session list will re-run to fetch sessions 
        because we changed some state values that it depends on.
      Only other piece will be implementing changes to those state values as appropriate in the 
        session list. ie, when the user changes the rows per page, update the state value for 
        rows per page accordingly. 
*/

function App() {
  const [eventData, setEventData] = useState([]);
  const navigate = useNavigate();

  //when we click a session table, fetch all the events for it and store them in state
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
            element={
              <SessionList
                // sessions={sessions}
                // setSessions={setSessions}
                onSessionClick={handleSessionClick}
              />
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
