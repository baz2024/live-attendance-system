function makeSessionCode() {
  // Simple readable code; good enough for student projects.
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const pick = () => chars[Math.floor(Math.random() * chars.length)];
  const block = (n) => Array.from({ length: n }, pick).join("");
  return `${block(4)}-${block(4)}`;
}

module.exports = { makeSessionCode };