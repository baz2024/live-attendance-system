const router = require("express").Router();
const { requireAuth, requireRole } = require("../middleware/auth");
const { moduleReport } = require("../controllers/reports.controller");

router.use(requireAuth);
router.get("/module", requireRole("ADMIN","LECTURER"), moduleReport);

module.exports = router;