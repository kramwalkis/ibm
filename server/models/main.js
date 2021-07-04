const queryDb = require("../schemas/querySchema");
const articleDb = require("../schemas/articleSchema");

module.exports = {
  addSearchQuery: async (req, res) => {
    const queryFromFront = req.body.query;
    const query = new queryDb();
    query.query = queryFromFront; //
    const querySearch = await queryDb.find({ query: queryFromFront });
    if (querySearch.length !== 0) {
      let increasedValue = querySearch[0].count + 1;
      await queryDb.updateOne(
        { query: queryFromFront },
        { $set: { count: increasedValue } }
      );
    } else {
      await query.save();
    }
  },

  addNewArticle: async (req, res) => {
    const article = new articleDb();
    const { title, url, publishedAt } = req.body;
    article.title = title;
    article.url = url;
    article.publishedAt = publishedAt;
    const articleSearch = await articleDb.find({ url: url });
    if (articleSearch.length !== 0) {
      let increasedValue = articleSearch[0].count + 1;
      await articleDb.updateOne(
        { url: url },
        { $set: { count: increasedValue } }
      );
      res.send({
        success: true,
        message:
          "number of times this article was clicked has increased and updated in DB",
      });
    } else {
      await article.save();
      res.send({ success: true, message: "new article saved to DB" });
    }
  },
};
