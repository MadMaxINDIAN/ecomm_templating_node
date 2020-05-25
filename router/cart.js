const express = require("express");
router = express.Router();

// @url     Get /api/cart/
// @desc    test
// @access  Public
router.get("/",(req,res) => {
    res.send("Cart")
})

module.exports = router;