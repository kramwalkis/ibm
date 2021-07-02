module.exports = {
    searchQueryValidation: (req, res, next) => {
        console.log(req.body)
        next()
    }
}