const express = require("express");
router = express.Router();

// @url     Get /api/product/
// @desc    test
// @access  Public
router.get("/",(req,res) => {
    res.send("Product")
})

module.exports = router;