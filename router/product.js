const express = require("express");
router = express.Router();

// @url     POST /api/product/details
// @desc    Add or update product
// @access  Private / Product Manager access only (access)
router.get("/",(req,res) => {
    res.send("Product")
})

module.exports = router;