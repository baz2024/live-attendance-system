const router = require("express").Router();
const { z } = require("zod");
const { validate } = require("../middleware/validate");
const { requireAuth, requireRole } = require("../middleware/auth");
const { create, list } = require("../controllers/students.controller");

const createStudentSchema = z.object({
  studentNumber: z.string().min(3),
  fullName: z.string().min(3),
  email: z.string().email().optional(),
});

router.use(requireAuth);
router.post("/", requireRole("ADMIN","LECTURER"), validate(createStudentSchema), create);
router.get("/", requireRole("ADMIN","LECTURER"), list);

module.exports = router;