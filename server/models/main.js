const queryDb = require("../schemas/querySchema");

module.exports = {
  addSearchQuery: async (req, res) => {
    const queryFromFront = req.body.query;
    const query = new queryDb();
    query.query = queryFromFront;
    await query.save();
    const test = await queryDb.find({ query: queryFromFront });
    test.length > 0
      ? res.send({ success: true, error: false })
      : res.send({ success: true, error: "something went wrong" });
  },
};
