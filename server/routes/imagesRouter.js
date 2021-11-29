var express = require("express");
var router = express.Router();

router.get("/:imgid", async (req, res) => {
  try {
    res.sendFile(`/${req.params.imgid}.jpg`, { root: "public/images" });
  } catch (err) {
    console.error("error", err);
    return res.status(404).send("Something went Wrong sorry!");
  }
});

module.exports = router;
