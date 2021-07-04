const middleWare = {
  searchQueryValidation: (req, res, next) => {
    middleWare.checkInputValidity(req.body.query)
      ? next()
      : res.send({ success: false, error: "Query string is not valid" });
  },
  checkInputValidity: (input) => {
    const pattern = /^[\w\d\s]+$/;
    return pattern.test(input.trim()) && input.length < 40 ? true : false;
  },
  checkArticleValidity: (req, res, next) => {
    req.body.title &&
    req.body.description &&
    req.body.content &&
    req.body.url &&
    req.body.image &&
    req.body.publishedAt &&
    req.body.source
      ? next()
      : res.send({
          error: true,
          message: "Data from front is not structured the way expected",
        });
  },
};

module.exports = middleWare;
