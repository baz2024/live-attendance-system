const router = require("express").Router();
const { z } = require("zod");
const { validate } = require("../middleware/validate");
const { requireAuth, requireRole } = require("../middleware/auth");
const { checkInByCode, liveList } = require("../controllers/attendance.controller");

const checkInSchema = z.object({
  sessionCode: z.string().min(4),
  studentId: z.number().int().positive(),
});

router.use(requireAuth);

// Students can check in (STUDENT role) - keep open for simplicity
router.post("/checkin", validate(checkInSchema), checkInByCode);

// Lecturer/Admin can view live list
router.get("/live/:sessionId", requireRole("ADMIN","LECTURER"), liveList);

module.exports = router;