const express = require("express");
const router = express.Router();

router.get('/testdata', (req,res) => {
    const str = [{
        'name': 'Julius',
        'age': '30'
    }]
    res.end(JSON.stringify(str))
})

module.exports = router