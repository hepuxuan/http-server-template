const express = require("express");
const router = express.Router();
const { getChunkHash, getStyleChunkHash, getVendorHash } = require("../utils");

const API_HOST = process.env.API_HOST;

/* GET users listing. */
router.get("/", async function(req, res, next) {
  const response = await fetch(`http://${API_HOST}:8080/api/user`);
  const user = await response.json();
  res.render("user", {
    title: "User",
    user,
    js: getChunkHash("user"),
    css: getStyleChunkHash("user"),
    vendor: getVendorHash("user")
  });
});

module.exports = router;
