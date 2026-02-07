const router = require("express").Router();
const { z } = require("zod");
const { validate } = require("../middleware/validate");

// ✅ import registerStudent too
const { signup, login, registerStudent } = require("../controllers/auth.controller");

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(["ADMIN", "LECTURER", "STUDENT"]).optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const studentRegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  studentNumber: z.string().min(3),
  fullName: z.string().min(3),
});

// existing
router.post("/signup", validate(signupSchema), signup);
router.post("/login", validate(loginSchema), login);

// ✅ NEW
router.post("/register-student", validate(studentRegisterSchema), registerStudent);

module.exports = router;