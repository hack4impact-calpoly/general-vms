module.exports = {
  "*.{ts,tsx}": ["npm run lint-fix", () => "tsc --noEmit"],
};
