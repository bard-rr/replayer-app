const handleFunnel = async (funnelId, pg, ch, queryObj) => {
  let { funnel } = await pg.getFunnelObj(funnelId);
  let filteredSessionArr = await ch.getSessionIdsFromFilters(
    funnel.sessionFilters,
    queryObj.startDate,
    queryObj.endDate
  );
  let eventSequenceResults = await ch.getEventSequenceResults(
    funnel.eventSequence,
    filteredSessionArr
  );
  return formatResults(funnel, filteredSessionArr, eventSequenceResults);
};

const formatResults = (funnel, filteredSessionArr, eventSequenceResults) => {
  let results = {};
  results["totalFilteredSessions"] = filteredSessionArr.length;
  results["eventSequenceResults"] = formatEventSequenceResults(
    eventSequenceResults,
    filteredSessionArr
  );

  return { funnel, results };
};

const formatEventSequenceResults = (
  eventSequenceResults,
  filteredSessionArr
) => {
  let prevResults = filteredSessionArr;
  let formattedResults = [];
  for (let i = 0; i < eventSequenceResults.length; i++) {
    let currentResult = eventSequenceResults[i];
    let formattedResult = newFormattedResult();
    formattedResult.numberCompleted = currentResult.length;
    formattedResult.sessionsCompleted = currentResult;
    formattedResult.numberNotCompleted =
      prevResults.length - currentResult.length;
    formattedResult.sessionsNotCompleted = prevResults.filter(
      (sessionId) => !currentResult.includes(sessionId)
    );
    formattedResults.push(formattedResult);
    prevResults = currentResult;
  }
  return formattedResults;
};

const newFormattedResult = () => {
  return {
    numberCompleted: 0,
    sessionsCompleted: [],
    numberNotCompleted: 0,
    sessionsNotCompleted: [],
  };
};

module.exports = handleFunnel;
