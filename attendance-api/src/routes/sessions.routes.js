const router = require("express").Router();
const { z } = require("zod");
const { validate } = require("../middleware/validate");
const { requireAuth, requireRole } = require("../middleware/auth");
const { create, list, getById, close } = require("../controllers/sessions.controller");

const createSessionSchema = z.object({
  moduleCode: z.string().min(2),
  title: z.string().min(3),
  startsAt: z.string().min(10), // React can send ISO string
});

router.use(requireAuth);
router.get("/", requireRole("ADMIN","LECTURER"), list);
router.get("/:id", requireRole("ADMIN","LECTURER"), getById);
router.post("/", requireRole("ADMIN","LECTURER"), validate(createSessionSchema), create);
router.put("/:id/close", requireRole("ADMIN","LECTURER"), close);

module.exports = router;