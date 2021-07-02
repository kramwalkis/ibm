const queryDb = require("../schemas/querySchema");

module.exports = {

  addSearchQuery: async (req, res) => {
    const queryFromFront = req.body.query;
    const query = new queryDb();
    query.query = queryFromFront; //
    const test = await queryDb.find({ query: queryFromFront });
    if (test.length !== 0) {
      let increasedValue = test[0].count + 1;
      await queryDb.updateOne(
        { query: queryFromFront },
        { $set: { count: increasedValue } }
      );
    } else {
      await query.save();
    }
  },
};
