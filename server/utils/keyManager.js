// utils/keyManager.js
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const keyPath = path.join(__dirname, "secret.key");

function generateKey() {
  const key = crypto.randomBytes(32);
  fs.writeFileSync(keyPath, key);
  return key;
}

function getKey() {
  if (!fs.existsSync(keyPath)) {
    return generateKey();
  }
  return fs.readFileSync(keyPath);
}

module.exports = { getKey };