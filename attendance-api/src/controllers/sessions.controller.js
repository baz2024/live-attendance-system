const { asyncHandler } = require("../utils/asyncHandler");
const { makeSessionCode } = require("../utils/tokens");
const { createSession, listSessions, getSessionById, closeSession } = require("../models/sessions.model");

const create = asyncHandler(async (req, res) => {
  const { moduleCode, title, startsAt } = req.body;

  const sessionCode = makeSessionCode();
  const id = await createSession({
    moduleCode,
    title,
    startsAt,
    sessionCode,
    createdByUserId: req.user.sub,
  });

  res.status(201).json({ ok: true, id, sessionCode });
});

const list = asyncHandler(async (req, res) => {
  const moduleCode = req.query.moduleCode || null;
  const sessions = await listSessions({ moduleCode });
  res.json({ ok: true, sessions });
});

const getById = asyncHandler(async (req, res) => {
  const sessionId = Number(req.params.id);
  const session = await getSessionById(sessionId);
  if (!session) {
    const err = new Error("Session not found");
    err.statusCode = 404;
    throw err;
  }
  res.json({ ok: true, session });
});

const close = asyncHandler(async (req, res) => {
  const sessionId = Number(req.params.id);
  const affected = await closeSession(sessionId);
  if (!affected) {
    const err = new Error("Session not found");
    err.statusCode = 404;
    throw err;
  }
  res.json({ ok: true, closed: true });
});

module.exports = { create, list, getById, close };