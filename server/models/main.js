module.exports = {
    addSearchQuery: (req, res) => {        
        console.log(req.body);
        res.send({ success: true, error: false });        
    }
}