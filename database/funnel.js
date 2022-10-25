const handleFunnel = async (funnelId, pg, ch) => {
  let funnelObj = await pg.getFunnelObj(funnelId);
};

module.exports = handleFunnel;
