const ping = async (req, res) => {
  res.reply("alive");
};

module.exports = {
  ping,
};
