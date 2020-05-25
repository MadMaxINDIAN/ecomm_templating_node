const express = require("express");
router = express.Router();

// @url     Get /api/users/
// @desc    test
// @access  Public
router.get("/",(req,res) => {
    res.send("Users")
})

module.exports = router;