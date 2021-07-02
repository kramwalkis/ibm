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
};

module.exports = middleWare;
