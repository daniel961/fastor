const router = require("express").Router();
const { ping } = require("../controllers/monitoring");

router.get("/ping", ping);
module.exports = router;
