const handleFunnel = async (funnelId, pg, ch) => {
  let { funnel } = await pg.getFunnelObj(funnelId);
  let filteredSessionArr = await ch.getSessionIdsFromFilters(
    funnel.sessionFilters
  );
  let eventSequenceResults = await ch.getEventSequenceResults(
    funnel.eventSequence,
    filteredSessionArr
  );
  return eventSequenceResults;
};

const getEventSequenceResults = async (ch, eventSequence) => {};

module.exports = handleFunnel;
